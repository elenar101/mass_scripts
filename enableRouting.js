const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let count = 0;

const token = "your_token";

const url = "https://payop.com/v1/instrument-settings/user-payment-settings/update-meta";


//projects IDs

const projectList = [

  '3549ae32-1d6e-4c49-a16e-23ed45c2e67a',
  '6193d4e0-98cd-4540-9a3d-ee16b867dc25',
  
];

projectList.forEach((project) => {
  function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("token", token);
      xhr.send(
        JSON.stringify({
          applicationIdentifier: project,
          metaInformation: {"isRoutingEnabled": true}
        })
      );
      xhr.onload = () => {
        count++;
        console.log(
          xhr.responseText + " project: " + project + ", count: " + count
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
