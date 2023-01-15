const userDetails = () => {

    let loggedIn = localStorage.getItem('loggedIn');
    console.log('loggedIn', loggedIn);
    if (loggedIn == null || loggedIn == 'false') {
        location.href = 'login.html';
        return;
    }

    let table = '';
    let userArray = JSON.parse(localStorage.getItem('registrationList'));
    if (!Array.isArray(userArray)) {
        return userArray = []
    }
    userArray.forEach((element, i) => {
        table += `<tr>
        <td>${1 + i}</td>
        <td hidden><input id='uniqueIndex' class='hiddenInput' type='hidden' value= ${element.id}></td>
        <td ><input id='username${i}' class='hiddenInput' value = '${element.name}'></td>
        <td ><input id='usernumber${i}' class='hiddenInput' value= '${element.number}'></td>
        <td ><input id='useremail${i}' class='hiddenInput' value = '${element.email}'></td>
        <td><img src="edit.svg" alt="edit" id='edit'  onclick="editClickHandler(${element.id})" /><img src="save.png" id='save'  style='display:none' />
        <img src="delete.svg" alt="delete" id='delete' onclick="deleteClickHandler(${i})" />
        <td hidden><input type='hidden' id='userpassword${i}' class='hiddenInput' value = ${element.password}></td></td>
        </tr>`
    });
    setTableFieldValueById('user-details', table);
}

const setTableFieldValueById = (id, tableShow) => {
    let element = document.getElementById(id);
    if (element) {
        return element.innerHTML = tableShow;
    } else {
        return '';
    }
}

const editClickHandler = (i) => {
    let editTable = '';
    let editArray = JSON.parse(localStorage.getItem('registrationList'));
    let editItem = editArray.find((data) => data.id === i);

    if (!Array.isArray(editArray)) {
        return editArray = []
    }

    editTable += `<tr>
        <td>${1 + i}</td>
        <td hidden><input id='uniqueIndex'  type='hidden' value= ${editItem.id}></td>
        <td><input id='username${i}'  value = '${editItem.name}'></td>
        <td><input id='usernumber${i}'  value= '${editItem.number}'></td>
        <td><input id='useremail${i}'  value = '${editItem.email}'></td>
        <td><img src="save.png" id='save' style='width:15%; margin:4px;' alt="save" onclick="saveEditData(${i})"/><img src="edit.svg" id='edit' style='display:none'/><img src="edit.svg" id='delete' style='display:none'/></td>
        <td hidden><input type='hidden' id='userpassword${i}'  value = ${editItem.password}></td></tr>`

    setTableFieldValueById('user-details', editTable);
    displaySaveButton();

}

const setTableInputField = (id, setData) => {
    let elem = document.getElementById(id);

    if (elem) {
        return elem.innerText = setData;
    } else {
        return '';
    }
}

const deleteClickHandler = (i) => {
    if (!confirm("Are you sure?")) return;

    let deleteArray = JSON.parse(localStorage.getItem('registrationList'));
    deleteArray.splice(i, 1);
    localStorage.setItem("registrationList", JSON.stringify(deleteArray));
    userDetails();
}

const saveEditData = (i) => {
    let id = Number(getFieldValueById('uniqueIndex'))
    console.log(id);
    let userName = getFieldValueById(`username${id}`);
    let userNumber = getFieldValueById(`usernumber${id}`);
    let userEmail = getFieldValueById(`useremail${id}`);
    let userPassword = getFieldValueById(`userpassword${id}`);
    if (userName !== '' && userNumber !== '' && userEmail !== '') {
        let regeisterObject = {
            id: id,
            name: userName,
            number: userNumber,
            email: userEmail,
            password: userPassword
        }
        let storeEditTableData = JSON.parse(localStorage.getItem('registrationList'));
        let index = storeEditTableData.findIndex((item) => {
            return item.id === regeisterObject.id;
        })
        storeEditTableData.splice(index, 1, regeisterObject);
        localStorage.setItem("registrationList", JSON.stringify(storeEditTableData));
        displayEditButton();
        userDetails();
    }
}

const getFieldValueById = (id) => {
    let element = document.getElementById(id);
    if (id && element) {
        return element.value;
    } else {
        return '';
    }
}

const logout = () => {
    localStorage.setItem('loggedIn', false);
    location.href = 'login.html';
}
const displayEditButton = () => {
    document.getElementById('edit').style.display = 'block';
    document.getElementById('delete').style.display = 'block';
    document.getElementById('save').style.display = 'none';
}

const displaySaveButton = () => {
    document.getElementById('save').style.display = 'block';
    document.getElementById('edit').style.display = 'none';
    document.getElementById('delete').style.display = 'none';
}

userDetails();