// EmployeeManagement.js
import React, { useState, useEffect } from "react";
import "./EmployeeManagement.css";
import AddEmployee from "./AddEmployee";

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [employeeData, setEmployeeData] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedSalary, setEditedSalary] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Example dummy employee data
  const dummyEmployeeData = [
    { id: 1, name: "John Doe", role: "xyxx", salary: "xxxx" },
    { id: 2, name: "Jane Smith", role: "xxxxxxx", salary: "xxxx" },
    { id: 3, name: "Michael Johnson", role: "xxxxxx", salary: "xxxxxx" },
  ];

  useEffect(() => {
    setEmployeeData(dummyEmployeeData);
  }, []);

  const handleEdit = (id) => {
    const employeeToEdit = employeeData.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setEditEmployeeId(id);
      setEditedName(employeeToEdit.name);
      setEditedRole(employeeToEdit.role);
      setEditedSalary(employeeToEdit.salary);
    }
  };

  const handleSaveEdit = (id) => {
    const updatedData = employeeData.map((employee) =>
      employee.id === id
        ? {
            ...employee,
            name: editedName,
            role: editedRole,
            salary: editedSalary,
          }
        : employee
    );
    setEmployeeData(updatedData);
    setEditEmployeeId(null);
    setEditedName("");
    setEditedRole("");
    setEditedSalary("");
  };

  const handleCancelEdit = () => {
    setEditEmployeeId(null);
    setEditedName("");
    setEditedRole("");
    setEditedSalary("");
  };

  const handleDelete = (id) => {
    const updatedData = employeeData.filter((employee) => employee.id !== id);
    setEmployeeData(updatedData);
  };

  return (
    <div className="component-container">
      <h2 className="employee-component-heading">Employee Management</h2>
      <div className="employee-button-container">
        <button
          onClick={() => handleTabChange("view")}
          className={`employee-tab-button ${activeTab === "view" ? "active" : ""}`}
        >
          View Employees
        </button>
        <button
          onClick={() => handleTabChange("add")}
          className={`employee-tab-button ${activeTab === "add" ? "active" : ""}`}
        >
          Add Employee
        </button>
      </div>
      {activeTab === "add" && (
        <div className="add-employee-animation">
          <AddEmployee />
        </div>
      )}
      {activeTab === "view" && (
        <div>
          <h3 >Employee List</h3>
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    {employee.id === editEmployeeId ? (
                      <input className="employee-edit-field"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    ) : (
                      employee.name
                    )}
                  </td>
                  <td>
                    {employee.id === editEmployeeId ? (
                      <input className="employee-edit-field"
                        type="text"
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                      />
                    ) : (
                      employee.role
                    )}
                  </td>
                  <td>
                    {employee.id === editEmployeeId ? (
                      <input className="employee-edit-field"
                        type="text"
                        value={editedSalary}
                        onChange={(e) => setEditedSalary(e.target.value)}
                      />
                    ) : (
                      employee.salary
                    )}
                  </td>
                  <td>
                    {employee.id === editEmployeeId ? (
                      <div className="employee-edited-button">
                        <button
                          className="employee-save-button"
                          onClick={() => handleSaveEdit(employee.id)}
                        >
                          Save
                        </button>
                        <button
                          className="employee-cancel-button"
                          onClick={() => handleCancelEdit()}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="employee-edit-button"
                          onClick={() => handleEdit(employee.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="employee-delete-button"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
