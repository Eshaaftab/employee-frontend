const API = "http://localhost:5000/api/employees";

// Load total stats
async function loadDashboard() {
  const res = await fetch(API);
  const employees = await res.json();

  const departments = [...new Set(employees.map(emp => emp.department))];

  document.getElementById("totalEmp").textContent = employees.length;
  document.getElementById("totalDept").textContent = departments.length;
}

// ✅ Show employees in a styled table
async function showEmployeeList() {
  const res = await fetch(API);
  const employees = await res.json();

  let html = `
    <h3>All Employees</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
  `;

  employees.forEach(emp => {
    html += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.department}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  document.getElementById("output").innerHTML = html;
}

// ✅ Show department-wise count in styled list
async function showDepartmentCounts() {
  const res = await fetch(API);
  const employees = await res.json();

  const deptCount = {};
  employees.forEach(emp => {
    deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
  });

  let html = `<h3>Department-wise Employee Count</h3><ul id="deptList">`;
  for (const dept in deptCount) {
    html += `<li>${dept}: ${deptCount[dept]}</li>`;
  }
  html += `</ul>`;

  document.getElementById("output").innerHTML = html;
}

// Load stats when page opens
loadDashboard();


