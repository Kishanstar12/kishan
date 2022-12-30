const form = document.getElementById('form');
form.addEventListener('submit', showUserDetails);
const expanses = JSON.parse(localStorage.getItem('Details')) || [];

function showUserDetails(e) {
    e.preventDefault();

    const Expanse = document.getElementById('Expenditure').value;
    const Description = document.getElementById('Description').value;
    const Category = document.getElementById('Category').value;
    if (Expanse != '' && Description != '' && Category != '') {
        const obj = {
            expanse: Expanse,
            description: Description,
            category: Category,
            id: expanses.length > 0 ? expanses[expanses.length - 1].id + 1 : 1,
        }

        expanses.push(obj);
        localStorage.setItem('Details', JSON.stringify(expanses));
        form.reset();
        showDetails();
    }

    else {
        alert('please fill the details');
    }
}

function showDetails() {
    const users = document.getElementById('users');
    users.innerText = '';

    for (let i = 0; i < expanses.length; i++) {
        const li = document.createElement('li');
        const listText = document.createTextNode(`${expanses[i].expanse}-${expanses[i].description}-${expanses[i].category}`);
        li.appendChild(listText);

        const delBtn = document.createElement('button');
        const delBtnText = document.createTextNode('Delete');
        delBtn.appendChild(delBtnText);
        delBtn.onclick = function () {
            deleteInfo(expanses[i].id);
        }

        const editBtn = document.createElement('button');
        const editText = document.createTextNode('Edit');
        editBtn.appendChild(editText);
        editBtn.onclick = function () {
            editInfo(expanses[i].id);
        }

        users.appendChild(li);
        users.appendChild(delBtn);
        users.appendChild(editBtn);
    }
}

function deleteInfo(id) {

    for (let i = 0; i < expanses.length; i++) {
        if (expanses[i].id == id) {
            expanses.splice(i, 1);
        }
    }
    localStorage.setItem('Details', JSON.stringify(expanses));
    showDetails();
}

function editInfo(id) {
    for (let i = 0; i < expanses.length; i++) {
        if (expanses[i].id == id) {
            document.getElementById('Expenditure').value = expanses[i].expanse;
            document.getElementById('Description').value = expanses[i].description;
            document.getElementById('Category').value = expanses[i].category;
            expanses.splice(i, 1);
        }
    }
    localStorage.setItem('Details', JSON.stringify(expanses));
    showDetails();
}

showDetails();