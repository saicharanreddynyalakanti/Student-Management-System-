/* ==========================================================
   STUDENT-DETAILS.JS
   Handles the Student Details page.
   Reads the "id" from the URL and shows that one student's
   full information.
========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const students = getStudents();
  const student = students.find(function (s) {
    return s.id === id;
  });

  const card = document.getElementById("detailsCard");

  if (!student) {
    card.innerHTML = "<p>Student not found.</p>";
    return;
  }

  const grade = getGrade(student.marks);
  const attendanceStatus = student.attendance < 75 ? "Low Attendance" : "Good Attendance";

  card.innerHTML =
    "<h2>" + student.name + "</h2>" +
    "<p><strong>Student ID:</strong> " + student.id + "</p>" +
    "<p><strong>Gender:</strong> " + student.gender + "</p>" +
    "<p><strong>Email:</strong> " + student.email + "</p>" +
    "<p><strong>Phone:</strong> " + student.phone + "</p>" +
    "<p><strong>Course:</strong> " + student.course + "</p>" +
    "<p><strong>Year:</strong> " + student.year + "</p>" +
    "<p><strong>Attendance:</strong> " + student.attendance + "% (" + attendanceStatus + ")</p>" +
    "<p><strong>Marks:</strong> " + student.marks + " (Grade " + grade + ")</p>";
});

function getGrade(marks) {
  if (marks >= 90) return "A";
  if (marks >= 80) return "B";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  return "F";
}
