let loading = '';
let element = document.getElementById('value');
let place = document.getElementById('place');
let invokedPlace = '';

let callApi = () => {
  if (!place.value || place.value === invokedPlace) return;
  element.innerText = 'loading...';
  (async () => {
    invokedPlace = place.value;
    let resp = await fetch(`/address?address=${place.value}`);
    let data = await resp.json();
    if (data.error) {
      return (element.innerText = data.error);
    }
    element.innerText = data.address;
  })();
};

document.getElementById('buttonId').addEventListener('click', e => {
  callApi();
});

document.getElementById('submit').onkeypress = function(event) {
  if (event.keyCode == 13 || event.which == 13) {
    callApi();
  }
};
