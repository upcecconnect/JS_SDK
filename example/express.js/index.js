const express = require("express");
const path = require("path");
const { signature } = require("../../index");

const app = express();

var PORT = process.env.port || 3000;

// View Engine Setup
app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

app.get("/", async function (req, res) {
  // Sample date to be filled in form
  const form = {
    MerchantID: 77777799004,
    TerminalID: `E9977774`,
    PurchaseTime: new Date().getTime(),
    OrderID: 1,
    Currency: "980",
    TotalAmount: 100,
  };

  const Signature = await signature.paymentSign(
    form,
    path.join(__dirname, "../../keys/private.pem")
  );

  form["Signature"] = Signature;

  res.render("SampleForm", {
    form: form,
  });
});

app.listen(PORT, function (error) {
  if (error) throw error;
  console.log("Server created Successfully on PORT", PORT);
});
