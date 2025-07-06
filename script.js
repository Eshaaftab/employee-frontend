const API = "http://localhost:5000/api/employees";
const form = document.getElementById("empForm");
const nameInput = document.getElementById("name");
const positionInput = document.getElementById("position");
const departmentInput = document.getElementById("department");
const tableBody = document.getElementById("empTableBody");
const searchBox = document.getElementById("searchBox"); // new search input

let editingId = null;

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: nameInput.value,
    position: positionInput.value,
    department: departmentInput.value,
  };

  if (editingId) {
    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    editingId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  form.reset();
  loadEmployees();
});

// Load all employees
async function loadEmployees() {
  const res = await fetch(API);
  const employees = await res.json();
  renderTable(employees);
}

// Render table rows
function renderTable(employees) {
  tableBody.innerHTML = "";
  employees.forEach((emp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.department}</td>
      <td>
        <button class="edit-btn" onclick="editEmployee('${emp.id}', '${emp.name}', '${emp.position}', '${emp.department}')">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee('${emp.id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete employee
async function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadEmployees();
  }
}

// Fill form to edit
function editEmployee(id, name, position, department) {
  nameInput.value = name;
  positionInput.value = position;
  departmentInput.value = department;
  editingId = id;
}

// Search employees by name
if (searchBox) {
  searchBox.addEventListener("input", async (e) => {
    const keyword = e.target.value.toLowerCase();
    const res = await fetch(API);
    const employees = await res.json();
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
  });
}


loadEmployees();

