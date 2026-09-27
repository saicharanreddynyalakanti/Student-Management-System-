/* ==========================================================
   STUDENTS.JS
   Handles the Student List page (students.html).
   Job: render the table, search, filter, and delete students.
========================================================== */

// Keep the full list in memory so search/filter can work
// on it without reloading LocalStorage every time.
let allStudents = [];

document.addEventListener("DOMContentLoaded", function () {
  allStudents = getStudents();
  renderStudents(allStudents);

  // "input" event fires every time the user types a character
  document.getElementById("searchInput").addEventListener("input", applyFilters);

  // "change" event fires when a dropdown selection changes
  document.getElementById("courseFilter").addEventListener("change", applyFilters);
  document.getElementById("yearFilter").addEventListener("change", applyFilters);
  document.getElementById("genderFilter").addEventListener("change", applyFilters);
});

// Builds the table rows from a given array of students
function renderStudents(students) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  if (students.length === 0) {
    tbody.innerHTML = "<tr><td colspan='8' class='no-data'>No students found</td></tr>";
    return;
  }

  students.forEach(function (s) {
    const grade = getGrade(s.marks);
    const isLow = s.attendance < 75;

    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + s.id + "</td>" +
      "<td>" + s.name + "</td>" +
      "<td>" + s.gender + "</td>" +
      "<td>" + s.course + "</td>" +
      "<td>" + s.year + "</td>" +
      "<td>" + s.attendance + "% " +
        "<span class='badge " + (isLow ? "badge-red" : "badge-green") + "'>" +
        (isLow ? "Low" : "Good") + "</span></td>" +
      "<td>" + s.marks + " (" + grade + ")</td>" +
      "<td>" +
        "<a class='btn btn-small btn-view' href='student-details.html?id=" + s.id + "'>View</a>" +
        "<a class='btn btn-small btn-edit' href='add-student.html?id=" + s.id + "'>Edit</a>" +
        "<button class='btn btn-small btn-delete' onclick='deleteStudent(" + s.id + ")'>Delete</button>" +
      "</td>";

    tbody.appendChild(row);
  });
}

// Converts numeric marks into a letter grade
function getGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 80) return "B";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  return "F";
}

// Reads the search box + all 3 dropdowns, then filters the
// full student list down to only the matching students.
function applyFilters() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const course = document.getElementById("courseFilter").value;
  const year = document.getElementById("yearFilter").value;
  const gender = document.getElementById("genderFilter").value;

  const filtered = allStudents.filter(function (s) {
    // includes() checks if a smaller string exists inside a
    // bigger string. We lowercase everything first so the
    // search is not case-sensitive.
    const matchesSearch =
      s.name.toLowerCase().includes(searchText) ||
      s.id.toString().includes(searchText) ||
      s.course.toLowerCase().includes(searchText);

    const matchesCourse = course === "all" || s.course === course;
    const matchesYear = year === "all" || s.year === year;
    const matchesGender = gender === "all" || s.gender === gender;

    return matchesSearch && matchesCourse && matchesYear && matchesGender;
  });

  renderStudents(filtered);
}

// Removes a student after asking for confirmation
function deleteStudent(id) {
  const confirmDelete = confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  // filter() keeps every student EXCEPT the one matching this id
  allStudents = allStudents.filter(function (s) {
    return s.id !== id;
  });

  saveStudents(allStudents);
  renderStudents(allStudents);
}
