
const initialStudents = [
  { id: 101, name: "Rahul Kumar",   gender: "Male",   email: "rahul@example.com",   phone: "9876543210", course: "CSE", year: "4th Year", attendance: 82, marks: 78 },
  { id: 102, name: "Sneha Reddy",   gender: "Female", email: "sneha@example.com",   phone: "9876500001", course: "ECE", year: "3rd Year", attendance: 91, marks: 88 },
  { id: 103, name: "Arjun Mehta",   gender: "Male",   email: "arjun@example.com",   phone: "9876500002", course: "CSE", year: "2nd Year", attendance: 68, marks: 55 },
  { id: 104, name: "Priya Sharma",  gender: "Female", email: "priya@example.com",   phone: "9876500003", course: "IT",  year: "4th Year", attendance: 74, marks: 92 },
  { id: 105, name: "Kiran Patil",   gender: "Male",   email: "kiran@example.com",   phone: "9876500004", course: "IT",  year: "1st Year", attendance: 88, marks: 63 },
  { id: 106, name: "Anjali Nair",   gender: "Female", email: "anjali@example.com",  phone: "9876500005", course: "IT",  year: "3rd Year", attendance: 95, marks: 81 },
  { id: 107, name: "Vikram Singh",  gender: "Male",   email: "vikram@example.com",  phone: "9876500006", course: "ECE", year: "2nd Year", attendance: 59, marks: 47 },
  { id: 108, name: "Neha Gupta",    gender: "Female", email: "neha@example.com",    phone: "9876500007", course: "CSE", year: "1st Year", attendance: 79, marks: 70 }
];


function getStudents() {
  const data = localStorage.getItem("students");

  if (data) {
    return JSON.parse(data);
  } else {
    saveStudents(initialStudents);
    return initialStudents;
  }
}


function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}
