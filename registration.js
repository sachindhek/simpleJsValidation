const signup = (event) => {
    event.preventDefault();
    let userName = getInputValueById('userName');
    let userNumber = getInputValueById('userNumber');
    let userEmail = getInputValueById('userEmail');
    let userPassword = getInputValueById('userPassword');
    let userConfirmpassword = getInputValueById('userConfirmpassword');

    if (userName.trim() === '') {
        setInputValueById('name-valid', 'Name field is empty, please check');
    } else if (userName.length <= 2) {
        setInputValueById('name-valid', 'Name must have atleast 3 character');
        return false;
    } else {
        setInputValueById('name-valid', '');
    }

    if (userNumber.trim() === '') {
        setInputValueById('number-valid', 'please fill number field');
    } else if (userNumber.length <= 6) {
        setInputValueById('number-valid', 'please fill atleast 7 digit number');
        return false;
    } else {
        setInputValueById('number-valid', '');
    }
    if (userEmail.trim() === '') {
        setInputValueById('email-valid', 'Email field is empty, please check');
    } else if (!emailValidation(userEmail)) {
        setInputValueById('email-valid', 'Invalid Email');
        return false;
    }
    else {
        setInputValueById('email-valid', '');
    }

    if (userPassword.trim() === '') {
        setInputValueById('password-valid', 'Password field is empty, please check');
    } else if (userPassword.length <= 6) {
        setInputValueById('password-valid', 'Please add atleast 7 character');
        return false;
    } else {
        setInputValueById('password-valid', '');
    }

    if (userConfirmpassword.trim() === '') {
        setInputValueById('confirmPassword-valid', 'Confirm password field is empty, please check');
    }
    else if (userPassword !== userConfirmpassword) {
        setInputValueById('confirmPassword-valid', 'password and confirm password are not match, please recheck');
        return false;
    }
    else {
        setInputValueById('confirmPassword-valid', '');
    }

    if (userName !== '' && userNumber !== '' && userEmail !== '' && userPassword !== '' && userConfirmpassword !== '') {
        let uniqueId = new Date().getTime();
        let regeisterObject = {
            id: uniqueId,
            name: userName,
            number: userNumber,
            email: userEmail,
            password: userPassword,
            confirmPasswod: userConfirmpassword
        }
        let registerArray = getLocalStorageData('registrationList');
        if (!Array.isArray(registerArray)) {
            registerArray = []
        }
        registerArray.push(regeisterObject);
        setLocalStoragData('registrationList', registerArray);

    }
    else {
        return false;
    }
    document.getElementById('registerIndex').value = "";
    document.getElementById('userName').value = "";
    document.getElementById('userNumber').value = "";
    document.getElementById('userEmail').value = "";
    document.getElementById('userPassword').value = "";
    document.getElementById('userConfirmpassword').value = "";
    clean();
    location.href = 'login.html';
}

const getInputValueById = (id) => {
    let element = document.getElementById(id);
    if (id && element) {
        return element.value;
    } else {
        return '';
    }
}

const setInputValueById = (id, message) => {
    document.getElementById(id).innerHTML = message;
}

const getLocalStorageData = (userName) => {
    return JSON.parse(localStorage.getItem(userName));
}

const setLocalStoragData = (userName, value) => {
    localStorage.setItem(userName, JSON.stringify(value));
}

const emailValidation = (email) => {
    let text = /^\S+@\S+\.\S+$/
    if (email.match(text)) {
        return true;
    } else {
        return false;
    }
}

const clean = () => {
    setInputValueById('name-valid', '');
    setInputValueById('number-valid', '');
    setInputValueById('email-valid', '');
    setInputValueById('password-valid', '');
    setInputValueById('confirmPassword-valid', '');
}

const changeText = () => {
    let emailValue = getInputValueById('userEmail');
    if (emailValue !== '') {
        setInputValueById('email-valid', 'Please add atleast one @ or .');
    }
    if (emailValidation(emailValue)) {
        setInputValueById('email-valid', '');
    }
}