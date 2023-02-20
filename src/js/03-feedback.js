
import throttle from "lodash.throttle";

const KEY_LOCAL_STORAGE = "feedback-form-state";
let data = {};

const refs = {
    form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle((e) => {
    localStorage.setItem( KEY_LOCAL_STORAGE, JSON.stringify(creatElement(e)) )
}, 500));

refs.form.addEventListener('submit', (e) =>{
    e.preventDefault();

    console.log(creatElement(e));

    refs.form.reset();
    localStorage.removeItem(KEY_LOCAL_STORAGE);
    data = {};
});

window.addEventListener('load', () => {
    getDataLocalStorage()

    if(data.email) {refs.form.elements.email.value = data.email};
    if(data.message) {refs.form.elements.message.value = data.message};
})

function getDataLocalStorage() {
    if(localStorage.getItem(KEY_LOCAL_STORAGE)) {
        const { email, message } = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
        if(email) {data.email = email};
        if(message) {data.message = message};
    }
}

function creatElement(e) {
    if(e.target.name === "email"){
        data.email = e.target.value;
    }
    if(e.target.name === "message"){
        data.message = e.target.value;
    }

    return data;
}