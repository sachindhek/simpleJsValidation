
const login = () => {

    let loginArray = JSON.parse(localStorage.getItem('registrationList'));
    console.log(loginArray)
    // for (let i = 0; i < loginArray.length; i++) 
    loginArray.forEach((login) => {
        let localEmailValue = login.email;
        let localPasswordValue = login.password;

        let loginEmailValue = document.getElementById('emailid').value;
        let loginPasswordValue = document.getElementById('password').value;

        if (localEmailValue === loginEmailValue && localPasswordValue === loginPasswordValue) {
            location.href = 'userList.html'
            localStorage.setItem('loggedIn', true);
            return;
        } else {
            return false;
        }
    })

}
