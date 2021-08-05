const { signature, transactionState, reversal } = require("../index");
const path = require("path");

const reqData = {
  MerchantID: 77777799004,
  TerminalID: `E9977774`,
  PurchaseTime: new Date().getTime(),
  OrderID: 1,
  Currency: "980",
  TotalAmount: 100,
};

signature.paymentSign(reqData, path.join(__dirname, "../keys/private.pem"))
  .then((signature) => {
    console.log({ signature });
  })
  .catch((e) => {
    console.log({ e });
  });

transactionState(
  reqData,
  path.join(__dirname, "../keys/private.pem"),
  "ecg.test.upc.ua"
)
  .then((data) => {
    console.log({ data });
  })
  .catch((e) => {
    console.log({
      reject: e,
    });
  });


reversal({
    MerchantID: 77777799004,
    TerminalID: `E9977774`,
    PurchaseTime: new Date().getTime(),
    OrderID: 1,
    Currency: "980",
    TotalAmount: 100,
    RRN: "AX1122121212",
    ApprovalCode: 121212,
    RefundAmount: 100
  }, path.join(__dirname, '../keys/private.pem')).then(d=>{
    console.log({d})
  })
