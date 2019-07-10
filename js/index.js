const STORAGE_ORDER = 'orders_in_storage';
const EMAIL_VALIDATION_URL = 'https://api.trumail.io/v2/lookups/json?email=';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#butSaveToStorage')
        .addEventListener('click', saveToStorageClick);
    document.querySelector('#butLoadFromStorage')
        .addEventListener('click', loadFromStorageClick);
    document.querySelector('#butValidateYourEmail')
        .addEventListener('click', validateEmailClick);
});

function saveToStorageClick() {
    localStorage.setItem(STORAGE_ORDER, JSON.stringify(orderFormDOM));
    displayResult(orderFormDOM);
}

function loadFromStorageClick() {
    let retrievedObject = JSON.parse(localStorage.getItem(STORAGE_ORDER));
    if (retrievedObject) {
        fillInputs(retrievedObject);
    }
}

function validateEmailClick() {
    fetch(EMAIL_VALIDATION_URL + orderFormDOM.email)
        .then(response => response.json())
        .then(jsonStr => displayResult(jsonStr));
}

function displayResult(trumailResult) {
    document.querySelector('#divResult').innerHTML = '';
    for (let key in trumailResult) {
        document.querySelector('#divResult').innerHTML +=
            '<p><strong>' + key + '</strong>: ' + trumailResult[key] + '</p>';
    };
}

function fillInputs(order) {
    orderFormDOM.name = order.name;
    orderFormDOM.surname = order.surname;
    orderFormDOM.mobile = order.mobile;
    orderFormDOM.email = order.email;
};

const orderFormDOM = {
    get name() { return document.querySelector('#inpName').value; },
    set name(val) { document.querySelector('#inpName').value = val; },

    get surname() { return document.querySelector('#inpSurname').value; },
    set surname(val) { document.querySelector('#inpSurname').value = val; },

    get mobile() { return document.querySelector('#inpMobile').value; },
    set mobile(val) { document.querySelector('#inpMobile').value = val; },

    get email() { return document.querySelector('#inpEmail').value; },
    set email(val) { document.querySelector('#inpEmail').value = val; },
}


