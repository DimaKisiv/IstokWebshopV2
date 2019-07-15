const STORAGE_ORDER = 'orders_in_storage';
const EMAIL_VALIDATION_URL = 'https://api.trumail.io/v2/lookups/json?email=';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#butMakeOrder')
        .addEventListener('click', makeOrderClick);
});

function makeOrderClick() {
    localStorage.setItem(STORAGE_ORDER, JSON.stringify(orderFormDOM));
    showAlert("Замовлення відправлено");
}





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


