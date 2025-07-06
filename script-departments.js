const API = "http://localhost:5000/api/employees";

async function loadDepartments() {
  const res = await fetch(API);
  const employees = await res.json();

  const departments = [...new Set(employees.map(emp => emp.department))];
  const list = document.getElementById("deptList");
  list.innerHTML = "";

  departments.forEach(dept => {
    const li = document.createElement("li");
    li.textContent = dept;
    list.appendChild(li);
  });
}

loadDepartments();
