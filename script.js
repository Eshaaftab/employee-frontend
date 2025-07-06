const API_URL = "http://localhost:5000/api/employees";
const form = document.getElementById("empForm");
const list = document.getElementById("empList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    position: form.position.value,
    department: form.department.value,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const newEmp = await res.json();
  addToList(newEmp);
  form.reset();
});

function addToList(emp) {
  const li = document.createElement("li");
  li.textContent = `${emp.name} - ${emp.position}`;
  list.appendChild(li);
}

async function loadEmployees() {
  const res = await fetch(API_URL);
  const data = await res.json();
  data.forEach(addToList);
}

loadEmployees();
