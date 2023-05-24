class View {

    static form = document.querySelector('form');
    static formInputs = document.querySelectorAll('.form-input');
    static inputName = document.querySelector('#name');
    static inputEmail = document.querySelector('#email');
    static inputPhone = document.querySelector('#phone');
    static inputPrivacy = document.querySelector('#privacy-agreement');
    static submitBtn = document.querySelector('#submit-btn');
    static noLeadBtn = document.querySelector('#nolead-btn');

    static inputStates = {
        hasName: false,
        hasEmail: false,
        hasPhone: false,
        hasAgree: false,
    };

    constructor() {

    }

    checkInputs(event) {
        View.inputStates.hasName = View.inputName.value != '' ? true : false;
        View.inputStates.hasEmail = View.inputEmail.value != '' ? true : false;
        View.inputStates.hasPhone = View.inputPhone.value != '' ? true : false;
        View.inputStates.hasAgree = View.inputPrivacy.checked;

        let { hasName, hasEmail, hasPhone, hasAgree } = View.inputStates;

        if (hasName && hasEmail && hasPhone && hasAgree) {
            View.submitBtn.disabled = false;
        } else {
            View.submitBtn.disabled = true;
        }
        return event;
    }

    resetInputs() {
        View.formInputs.forEach(input => {
            input.value = '';
        })
        View.inputPrivacy.checked = false;
        View.submitBtn.disabled = true;
    }

    getCurrentDate() {
        const date = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayOfWeek = days[date.getDay()];
        const month = months[date.getMonth()];
        const dayOfMonth = date.getDate();
        const year = date.getFullYear();
        return `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
    }

    getCurrentHour() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getBrowserOS() {
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

    setInputs() {
        View.inputPrivacy.addEventListener('change', this.checkInputs);

        View.formInputs.forEach(input => {
            input.addEventListener('input', this.checkInputs);
        });
    }
    setLeadForm() {
        View.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let name = View.inputName.value;
            let email = View.inputEmail.value;
            let phone = View.inputPhone.value;
            let OS = this.getBrowserOS();
            let privacyAgreement = View.inputPrivacy.checked;
            let date = this.getCurrentDate();
            let timeStamp = this.getCurrentHour();

            let newLead = { name, email, phone, privacyAgreement, OS, date, timeStamp };
            this.onSubmitLead(newLead);
            this.resetInputs();
        });
    }

    setNoLeadButton() {
        View.noLeadBtn.addEventListener('click', (e) => {
            console.log('No Lead');
            let OS = this.getBrowserOS();
            let date = this.getCurrentDate();
            let timeStamp = this.getCurrentHour();

            let noLead = { OS, date, timeStamp };

            this.resetInputs();
            this.onNoLead(noLead);
        });
    }

    render() {
        this.setInputs();
        this.setLeadForm();
        this.setNoLeadButton();
    }

}