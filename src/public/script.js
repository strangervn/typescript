document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/employees/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        alert(data.message || 'Đăng ký thành công!');
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/employees/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            alert('Đăng nhập thành công!');
            loadEmployees();  // Gọi hàm tải danh sách nhân viên
        } else {
            const data = await response.json();
            alert(data.message || 'Đăng nhập thất bại!');
        }
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
});

async function loadEmployees() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Bạn cần đăng nhập trước khi xem danh sách nhân viên.');
        return;
    }

    try {
        const response = await fetch('/api/employees', {
            headers: {
                'Authorization': 'Bearer ' + token,  // Thêm 'Bearer ' trước token
            },
        });

        if (response.ok) {
            const employees = await response.json();
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = `
                <h2>Danh sách Nhân viên</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Họ và Tên</th>
                            <th>Email</th>
                            <th>Vai Trò</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employees.map(employee => `
                            <tr>
                                <td>${employee.name}</td>
                                <td>${employee.email}</td>
                                <td>${employee.role}</td>
                                <td>
                                    <button onclick="showUpdateForm('${employee._id}', '${employee.name}', '${employee.email}', '${employee.role}')">Cập nhật</button>
                                    <button onclick="deleteEmployee('${employee._id}')">Xóa</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            const addButton = document.createElement('button');
            addButton.innerText = 'Thêm Nhân viên';
            addButton.onclick = showAddForm;
            employeeList.appendChild(addButton);
        } else {
            const data = await response.json();
            alert(data.message || 'Không thể tải danh sách nhân viên.');
        }
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
}

function showAddForm() {
    const name = prompt("Nhập tên nhân viên:");
    const email = prompt("Nhập email nhân viên:");
    const password = prompt("Nhập mật khẩu nhân viên:");
    const role = prompt("Nhập vai trò nhân viên (admin/employee):");

    addEmployee(name, email, password, role);
}

async function addEmployee(name, email, password, role) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/employees/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,  // Thêm 'Bearer ' trước token
            },
            body: JSON.stringify({ name, email, password, role }),
        });

        if (response.ok) {
            alert('Nhân viên đã được thêm thành công!');
            loadEmployees();  // Tải lại danh sách nhân viên
        } else {
            const data = await response.json();
            alert(data.message || 'Có lỗi xảy ra khi thêm nhân viên.');
        }
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
}

function showUpdateForm(id, name, email) {
    const newName = prompt("Nhập tên mới:", name);
    const newEmail = prompt("Nhập email mới:", email);
    const newRole = prompt("Nhập vai trò mới (admin/employee):");

    updateEmployee(id, newName, newEmail, newRole);
}

async function updateEmployee(id, name, email, role) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,  // Thêm 'Bearer ' trước token
            },
            body: JSON.stringify({ name, email, role }),
        });

        if (response.ok) {
            alert('Cập nhật thành công!');
            loadEmployees();  // Tải lại danh sách nhân viên
        } else {
            const data = await response.json();
            alert(data.message || 'Có lỗi xảy ra khi cập nhật.');
        }
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
}

async function deleteEmployee(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,  // Thêm 'Bearer ' trước token
            },
        });

        if (response.ok) {
            alert('Nhân viên đã được xóa thành công!');
            loadEmployees();  // Tải lại danh sách nhân viên
        } else {
            const data = await response.json();
            alert(data.message || 'Có lỗi xảy ra khi xóa nhân viên.');
        }
    } catch (error) {
        alert('Đã xảy ra lỗi: ' + error.message);
    }
}
