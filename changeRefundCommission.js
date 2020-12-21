const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// user, mid

const projects_info = [
  [11111, 111],
  [22222, 222],
];


// payment method IDs

const paymentMethods = ["1", "2", "3"];

const token = "your_token";

const url = "https://payop.com/v1/instrument-settings/commissions";

projects_info.forEach((project_info) => {
  paymentMethods.forEach((pm) => {
    function sendRequest(method, url) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("token", token);
        xhr.send(
          JSON.stringify({
            midIdentifier: project_info[1],
            paymentMethodIdentifier: pm,
            source: 1,
            strategy: 1,
            transactionType: 2,
            userIdentifier: project_info[0],
            value: { ALL: [0, 4] },
          })
        );
        xhr.onload = () => {
          console.log(
            xhr.responseText +
              " project: " + project_info[0] + ", mid: " + project_info[1] + ", payment method: " + pm
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
});
