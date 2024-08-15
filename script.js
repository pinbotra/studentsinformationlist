let students = [];
let isEditing = false;
let editingIndex = null;
let originalStudent = null;

function showForm() {
    document.getElementById('form-fields').style.display = 'block';
    document.getElementById('btnAdd').style.display = 'none';
}

function hideForm() {
    document.getElementById('form-fields').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'block';
    clearForm();
}

function validateInput(input) {
    const invalidCharacters = /[^a-zA-Z@ ]/g;
    input.value = input.value.replace(invalidCharacters, '');
    input.value = input.value.replace(/^\s+/, '');
}   

function validateAge(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value > 100) {
        input.value = 100;
    }
}

function addStudent() {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const province = document.getElementById('province').value;

        const student = {
            name,
            gender,
            age,
            email,
            province
        };
        students.push(student);
        displayStudents();
        clearForm(); 
    }
}

function validateForm() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const province = document.getElementById('province').value;
    let errorMessage = '';

    if (!name) {
        errorMessage += 'Please Enter Your Name!!!<br>';
    }
    if (!gender) {
        errorMessage += 'Please Select Your Gender!!<br>';
    }
    if (!age) {
        errorMessage += 'Please Enter Your Age!!<br>';
    }
    if (!email) {
        errorMessage += 'Please Enter Your Email!!<br>';
    }
    if (!province) {
        errorMessage += 'Please Select Your Province!!<br>';
    }

    if (errorMessage) {
        Swal.fire({
            title: 'Requirement',
            html: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return false;
    }

    return true;
}

function displayStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.province}</td>
            <td>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
    document.getElementById('province').value = '';
    isEditing = false;
    editingIndex = null;
    originalStudent = null;
}

function editStudent(index) {
    const student = students[index];
    originalStudent = { ...student };
    document.getElementById('name').value = student.name;
    document.getElementById('gender').value = student.gender;
    document.getElementById('age').value = student.age;
    document.getElementById('email').value = student.email;
    document.getElementById('province').value = student.province;
    showForm();
    isEditing = true;
    editingIndex = index;
    document.getElementById('btnAddForm').innerText = 'Update';
    document.getElementById('btnAddForm').onclick = function() {
        confirmUpdate(index);
    };
}

function confirmUpdate(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update this student?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor:"#FEBE10",
        cancelButtonColor: "#00308F",
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            updateStudent(index);
            Swal.fire('Updated!', 'The student has been updated.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'The update was cancelled.', 'error');
        }
    });
}

function updateStudent(index) {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const province = document.getElementById('province').value;

        students[index] = {
            name,
            gender,
            age,
            email,
            province
        };

        displayStudents();
        clearForm();
        resetAddButton();
    }
}

function resetAddButton() {
    document.getElementById('btnAddForm').innerText = 'Add';
    document.getElementById('btnAddForm').onclick = addStudent;
}

function confirmCancelEdit() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to cancel the edit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, continue editing!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            cancelEdit();
            Swal.fire('Cancelled', 'The edit was cancelled.', 'success');
        }
    });
}

function cancelEdit() {
    if (isEditing) {
        clearForm();
        hideForm();
        resetAddButton();
    }
}

function deleteStudent(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            students.splice(index, 1);
            displayStudents();
            Swal.fire({
                title: "Deleted!",
                text: "The student has been deleted.",
                icon: "success"
            });
        }
    });
}
