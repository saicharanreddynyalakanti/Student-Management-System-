/* ==========================================================
   MAIN.JS
   Handles the Dashboard page (index.html).
   Job: read the student data and calculate simple statistics.
========================================================== */

// Run this code only after the HTML page has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const students = getStudents();
  displayStats(students);
});

function displayStats(students) {
  const totalStudents = students.length;

  // filter() returns a new array containing only the items
  // that pass the condition. We just need the COUNT, so we
  // read .length of the filtered array.
  const maleCount = students.filter(function (s) {
    return s.gender === "Male";
  }).length;

  const femaleCount = students.filter(function (s) {
    return s.gender === "Female";
  }).length;

  // We add up marks and attendance using a simple loop,
  // then divide by the number of students to get the average.
  let totalMarks = 0;
  let totalAttendance = 0;
  let lowAttendanceCount = 0;

  students.forEach(function (s) {
    totalMarks += s.marks;
    totalAttendance += s.attendance;

    if (s.attendance < 75) {
      lowAttendanceCount++;
    }
  });

  const avgMarks = totalStudents > 0 ? (totalMarks / totalStudents).toFixed(1) : 0;
  const avgAttendance = totalStudents > 0 ? (totalAttendance / totalStudents).toFixed(1) : 0;

  // Push the calculated numbers into the HTML elements
  document.getElementById("totalStudents").textContent = totalStudents;
  document.getElementById("maleStudents").textContent = maleCount;
  document.getElementById("femaleStudents").textContent = femaleCount;
  document.getElementById("avgMarks").textContent = avgMarks + "%";
  document.getElementById("avgAttendance").textContent = avgAttendance + "%";
  document.getElementById("lowAttendance").textContent = lowAttendanceCount;
}
