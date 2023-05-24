const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const privacyCheckbox = document.querySelector('.form-checkbox');
const submitBtn = document.querySelector('.form-btn');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
//const inputDOB = document.querySelector('#dob');
const inputPhone = document.querySelector('#phone');
const inputPrivacy = document.querySelector('#privacy-agreement');

console.log(formInputs)
let inputStates = {
    hasName: false,
    hasEmail: false,
    // hasDOB: false,
    hasPhone: false,
    hasAgree: false,
};
console.log(`inputStates:`);
console.log(inputStates)

const checkInputs = (event) => {
    //let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates;
    inputStates.hasName = inputName.value != '' ? true : false;
    inputStates.hasEmail = inputEmail.value != '' ? true : false;
    //inputStates.hasDOB = inputDOB.value != '' ? true : false;
    inputStates.hasPhone = inputPhone.value != '' ? true : false;
    inputStates.hasAgree = inputPrivacy.checked;

    console.log(`inputStates:`);
    console.table(inputStates);
    let { hasName, hasEmail, hasPhone, hasAgree } = inputStates

    if (hasName && hasEmail && hasPhone && hasAgree) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    return event;
}

inputPrivacy.addEventListener('change', checkInputs);
formInputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


function resetInputs() {
    formInputs.forEach(input => {
        input.value = '';
    })
    inputPrivacy.checked = false;
    submitBtn.disabled = true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    newUser = {
        name: inputName.value,
        email: inputEmail.value,
        //dob:inputDOB.value,
        phone: inputPhone.value,
        OS: getBrowserOS(),
        privacyAgreement: inputPrivacy.checked,
        date: getCurrentDate(),
        timeStamp: getCurrentHour(),
    };
    newInteraction = {
        OS: getBrowserOS(),
        date: getCurrentDate(),
        timeStamp: getCurrentHour(),
    }
    sendUserData({newUser, newInteraction});
    resetInputs();
    console.log(`submited:`);
    console.log(newUser);
});

async function sendUserData(userData) {
    console.log(':D POST');
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    return await fetch(`/user`, request);
}

function getCurrentDate() {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
}

function getCurrentHour() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getBrowserOS() {
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';

    if (/android/i.test(userAgent)) {
        os = 'Android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        os = 'iOS';
    } else if (/Mac/.test(userAgent)) {
        os = 'macOS';
    } else if (/Windows/.test(userAgent)) {
        os = 'Windows';
    } else if (/Linux/.test(userAgent)) {
        os = 'Linux';
    }

    return os;
}