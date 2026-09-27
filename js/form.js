

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  if (editId) {
    document.getElementById("formTitle").textContent = "Edit Student";
    loadStudentIntoForm(Number(editId));
  }

  document.getElementById("studentForm").addEventListener("submit", handleSubmit);
});

// Fills the form inputs with an existing student's data
function loadStudentIntoForm(id) {
  const students = getStudents();
  const student = students.find(function (s) {
    return s.id === id;
  });

  if (!student) return;

  document.getElementById("studentId").value = student.id;
  document.getElementById("studentId").disabled = true; // ID cannot change while editing
  document.getElementById("name").value = student.name;
  document.getElementById("gender").value = student.gender;
  document.getElementById("email").value = student.email;
  document.getElementById("phone").value = student.phone;
  document.getElementById("course").value = student.course;
  document.getElementById("year").value = student.year;
  document.getElementById("attendance").value = student.attendance;
  document.getElementById("marks").value = student.marks;
}

function handleSubmit(e) {
  // Stops the browser from refreshing the page on submit,
  // so our JavaScript can handle saving the data instead.
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");

  const id = Number(document.getElementById("studentId").value);
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const year = document.getElementById("year").value;
  const attendance = Number(document.getElementById("attendance").value);
  const marks = Number(document.getElementById("marks").value);

  if (!validateForm(name, email, phone, attendance, marks)) {
    return; // Stop here if validation failed
  }

  const students = getStudents();
  const newStudentData = { id, name, gender, email, phone, course, year, attendance, marks };

  if (editId) {
    // Find the position of the student being edited and replace it
    const index = students.findIndex(function (s) {
      return s.id === Number(editId);
    });
    students[index] = newStudentData;
  } else {
    // Adding a new student - make sure the ID is not already used
    const idAlreadyExists = students.some(function (s) {
      return s.id === id;
    });

    if (idAlreadyExists) {
      document.getElementById("formError").textContent = "This Student ID already exists.";
      return;
    }

    students.push(newStudentData);
  }

  saveStudents(students);
  window.location.href = "students.html";
}

// Simple, beginner-friendly validation checks
function validateForm(name, email, phone, attendance, marks) {
  const errorBox = document.getElementById("formError");
  errorBox.textContent = "";

  if (name === "") {
    errorBox.textContent = "Name cannot be empty.";
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorBox.textContent = "Please enter a valid email address.";
    return false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    errorBox.textContent = "Phone number must be exactly 10 digits.";
    return false;
  }

  if (attendance < 0 || attendance > 100) {
    errorBox.textContent = "Attendance must be between 0 and 100.";
    return false;
  }

  if (marks < 0 || marks > 100) {
    errorBox.textContent = "Marks must be between 0 and 100.";
    return false;
  }

  return true;
}
