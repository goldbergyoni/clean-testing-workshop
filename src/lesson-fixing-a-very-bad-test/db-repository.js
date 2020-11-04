const transfers = [];

module.exports = {
  save: (aTransferToSave) => {
    transfers.push(aTransferToSave);
    console.log("Not really a DB repository");
  },
  getTransfers: (userName) => {
    console.log(userName, transfers);
    return transfers.filter((aTransfer) => aTransfer.sender.name === userName);
  },

  getTransferById: (id) => {
    const queryMatch = transfers.filter((aTransfer) => aTransfer.id === id);
    if (queryMatch.length > 0) {
      return queryMatch[0];
    } else {
      return null;
    }
  },
  deleteTransfer: (id) => {
    const filteredTransfers = transfers.filter((aTransfer) => aTransfer.sender.name === userName);
    transfers = filteredTransfers;

    return;
  },
};
