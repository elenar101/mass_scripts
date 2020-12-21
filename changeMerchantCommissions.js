const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let count = 0;

const token = "your_token";

const url = "https://payop.com/v1/instrument-settings/commissions";


//user, mid, method, commission

const info = [

  [11111, 111, 111, {"EUR": [0.1, 3.3]}],
  [22222, 222, 222, {"EUR": [0.1, 2.4]}]
  
];

info.forEach((list) => {
  function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("token", token);
      xhr.send(
        JSON.stringify({
          midIdentifier: list[1],
          paymentMethodIdentifier: list[2],
          source: 1,
          strategy: 1,
          transactionType: 7,
          userIdentifier: list[0],
          value: list[3],
        })
      );
      xhr.onload = () => {
        count++;
        console.log(
          xhr.responseText + " payment method: " + list[2] + ", count: " + count + ", user: " + list[0]
        );
      };
      xhr.onerror = () => {
        reject(xhr.responce);
      };
    });
  }
  sendRequest("POST", url)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
