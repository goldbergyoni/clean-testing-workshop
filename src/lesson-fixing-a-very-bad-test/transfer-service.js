const uuid = require("uuid");
const defaultDBRepository = require("./db-repository");
const defaultBankingProvider = require("./banking-provider");

//I know to transfer money
module.exports = class TransferService {
  constructor(options, repository, bankProvider) {
    this.options = options || { creditPolicy: "allowDebt" };
    this.repository = repository || defaultDBRepository;
    this.bankProvider = bankProvider || defaultBankingProvider;
    this.numberOfDeclined = 0;
  }

  transfer({ id, sender, receiver, transferAmount, bankName }) {
    // Validation
    if (!sender || !receiver || !transferAmount || !bankName) {
      const invalidInputException = new Error("Some mandatory property was not provided");
      invalidInputException.code = "invalidInput";
      throw invalidInputException;
    }

    // Define defaults
    this.numberOfDeclined++;
    const date = new Date();
    id = uuid.v1();

    // Handle insufficient credit
    if (this.options.creditPolicy === "zero" && sender.credit < transferAmount) {
      return {
        id,
        status: "declined",
        date,
      };
    }

    // All good, let's save
    this.bankProvider.transfer(sender, receiver, transferAmount, bankName); //  ❌ Could we write better code?
    this.repository.save({
      id,
      sender,
      receiver,
      transferAmount,
      bankName,
    });

    return {
      id,
      status: "approved",
      date: new Date(),
    };
  }

  getTransfers(username, id) {
    return this.repository.getTransfers(username);
  }

  getTransfer(id) {
    return this.repository.getTransferById(id);
  }

  deleteTransfers(id) {
    return this.repository.deleteTransfers(username);
  }
};
