@Test
public void givenUpdateProductThenCheckHappyFlow() throws Exception {
    SOAPResponse soapResponse = new SOAPResponse(200, "OK");
    when(soapClient.soapRequest(any(), any(), (ChangeProductRequest) any())).thenReturn(soapResponse);
    when(soapClient.soapRequest(any(), any(), (ChangeInventoryRequest) any())).thenReturn(soapResponse);
    when(soapClient.soapRequest(any(), any(), (AddProductRequest) any())).thenReturn(soapResponse);
    when(soapClient.soapRequest(any(), any(), (DeleteProductRequest) any())).thenReturn(soapResponse);

    String SOAPresponse = "{ \"productId\": \"1234\", \"bgwRequests\": { \"addproductRequest\": null , \"changeproductRequest\": { \"opeartionID\": \"1122\", \"originatingSystem\": null, \"productID\": \"1234\", \"prodName\": null, \"masterAgreementNumber\": null, \"masterAgreementNumberInd\": null, \"creditCheckAuthorizationNumber\": null, \"creditCheckAuthorizationNumberInd\": null, \"accountType\": null, \"accountTypeInd\": null, \"paymentTerms\": null, \"paymentTermsInd\": null, \"productProfileClassName\": null, \"productProfileClassNameInd\": null, \"attUid\": null, \"attUidInd\": null, \"productAddressInd\": null, \"productAddressInfo\": null }, \"addInvoiceRequestList\": [ { \"opeartionID\": \"2468\", \"originatingSystem\": \"test\", \"addInvoiceInfo\": { \"productID\": \"5555\", \"socCountryCode\": null, \"service\": null, \"sourceBillerID\": null, \"productLegalName\": null, \"ratingCurrency\": null, \"productVATNumber\": null, \"vatExemptAuthorizationNumber\": null, \"exemptExpiryStartDate\": null, \"exemptExpiryEndDate\": null, \"specialBids\": null, \"docViewer\": null, \"rollUpOption\": null, \"rollUpDetail\": null, \"taxOffice\": null, \"contractEffDate\": null, \"productStateTaxID\": null, \"productCityTaxID\": null, \"icoReference\": null, \"taxCode\": null, \"specialVATReason\": null, \"foreignKey\": null, \"billingName\": \"prodBilling\", \"localCSS\": null, \"profession\": null, \"billingName2\": null, \"attentionName\": null, \"productContactFirstName\": null, \"productContactLastName\": null, \"phoneCountryCode\": null, \"telephoneAreaCode\": null, \"emailAddress\": null, \"invoiceCurrency\": null, \"invoiceLanguage\": null, \"creditMemoVAT\": null, \"poNumber\": null, \"invoiceReferenceText\": null, \"billingAddressInfo\": { \"addressInfo\": { \"line1\": \"1\", \"line2\": \"2\", \"line3\": \"3\", \"line4\": null, \"state\": null, \"city\": \"rehovot\", \"province\": null, \"country\": null, \"county\": null, \"postalCode\": null, \"zip\": null, \"zipCodeSuffix\": null } }, \"telephoneTypeInfoList\": [ { \"telephoneType\": null, \"telephone\": \"05050505\", \"telephoneExtension\": null } ], \"taxAddressInfo\": { \"addressInfo\": { \"line1\": \"1\", \"line2\": \"2\", \"line3\": \"3\", \"line4\": null, \"state\": null, \"city\": \"rehovot\", \"province\": null, \"country\": null, \"county\": null, \"postalCode\": null, \"zip\": null, \"zipCodeSuffix\": null } } } } ], \"changeAccountDataRequestList\": [ { \"opeartionID\": \"1123\", \"originatingSystem\": \"changeAccountData\", \"changeAccountInfo\": { \"productID\": \"1234\", \"foreignKey\": null, \"service\": null, \"sourceBillerID\": null, \"productVAT\": null, \"productVATIndicator\": null, \"docViewer\": null, \"docViewerIndicator\": null, \"rollUpOption\": null, \"rollUpDetail\": null, \"rollUpIndicator\": null, \"vatExemptAuthorizationNumber\": null, \"vatExemptAuthorizationNumberIndicator\": null, \"exemptExpiryStartDate\": null, \"exemptExpiryStartDateIndicator\": null, \"exemptExpiryEndDate\": null, \"exemptExpiryEndDateIndicator\": null, \"taxCode\": null, \"taxCodeIndicator\": null, \"specialVATReason\": null, \"specialVATReasonIndicator\": null, \"productStateTaxID\": null, \"productStateTaxIDIndicator\": null, \"productCityTaxID\": null, \"productCityTaxIDIndicator\": null, \"icoReference\": null, \"icoReferenceIndicator\": null, \"specialBids\": null, \"taxOffice\": null, \"taxofficeIND\": null, \"profession\": null, \"professionIND\": null, \"localOrCSS\": null, \"localOrCSSIND\": null, \"contractEffectiveDate\": null, \"contractEffectiveDateIND\": null, \"invoiceCurrency\": null, \"invoiceCurrencyIndicator\": null, \"invoiceLanguage\": null, \"invoiceLanguageIndicator\": null, \"creditMemoVAT\": null, \"creditMemoVATIndicator\": null, \"poNumber\": null, \"poNumberIndicator\": null, \"invoiceReferenceText\": null, \"invoiceReferenceTextIndicator\": null, \"attentionName\": null, \"attentionNameIndicator\": null, \"productContactFirstName\": null, \"productContactFirstNameIndicator\": null, \"productContactLastName\": null, \"productContactLastNameIndicator\": null, \"phoneCountryCode\": null, \"phoneCountryCodeIndicator\": null, \"telephoneAreaCode\": null, \"telephoneAreaCodeIndicator\": null, \"emailAddress\": null, \"emailAddressIND\": null, \"billingName\": null, \"billingAddressIndicator\": null, \"taxAddressIndicator\": null, \"billingName2\": null, \"billingAddressInfo\": null, \"taxAddressInfo\": null, \"telephoneTypeInfoList\": null } } ], \"deleteInvoiceRequestList\": [ { \"opeartionID\": \"8765\", \"originatingSystem\": \"originatingSystem\", \"productID\": \"1234\", \"service\": \"service\", \"sourceBillerID\": \"sourceBillerID\", \"foreignKey\": \"foreignKey\" } ], \"disconnectproductRequest\": null }, \"bgwResults\": null, \"atbsRequests\": null, \"atbsResults\": null }";
    listenerRecord<String, String> cr = new listenerRecord<String, String>(verificationSuccessfulTopicName, 1, 1, verificationSuccessfulTopicName, verificationSuccessfulMsg);
    Acknowledgment a = mock(Acknowledgment.class);
    verificationSuccessfulHandler.handleTopic(cr, a);

    productEntity product = productRepository.findByprodId("1234").get();
    List<opeartionEntity> opeartions = opeartionRepository.findAll();
    assertThat(product.getData()).isNotNull();
    assertThat(opeartions.size()).isEqualTo(3);
    assertThat(opeartions.stream().filter(x -> x.getRequestType().equals(RequestType.CHANGEproduct.name())).findFirst().get().getStatus()).isEqualTo(opeartionStatus.ACK.name());
    assertThat(opeartions.stream().filter(x -> x.getStatus().equals(opeartionStatus.CREATED.name())).count()).isEqualTo(2);
    changeproductStatus.handleChangeproductStatusRequest(createChangeproductStatusRequest("0", "1122", "Message"));

    Awaitility.await().pollDelay(Duration.TWO_SECONDS).until(() -> true);
    opeartions = opeartionRepository.findAll();
    assertThat(opeartions.stream().filter(x -> x.getRequestType().equals(RequestType.CHANGEproduct.name())).findFirst().get().getStatus()).isEqualTo(opeartionStatus.COMPLETED

describe("Transfer Service", () => {
  //Test
  test("Test", () => {
    console.log("1");
  });

  test("Should fail", () => {

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
    console.log("a");
  });

  function boo() {
    console.log("1");
    if (true === true) {
      console.log("2");
    }
  }
});
