import React, { useState, useEffect } from "react";
import "./SalesHistory.css";
import "../../styles.css";
import BillDetailsDialog from "./BillDetailsDialog";
import axios from "axios";

const SalesHistory = () => {
  const token = localStorage.getItem("token");
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  const openDialog = (billDetails) => {
    setSelectedBill(billDetails);
  };

  const closeDialog = () => {
    setSelectedBill(null);
  };

  useEffect(() => {
    // Make a backend request to fetch bills data
    axios
      .get("http://localhost:5000/api/admin/get-bills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, [token]);

  return (
    <div className="component-container bill-table-container">
      <h2 className="heading-main">Sales History</h2>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.billNo}</td>
              <td>{new Date(bill.date).toLocaleString()}</td>
              <td>{bill.totalAmount}</td>
              <td>
                <button onClick={() => openDialog(bill.details)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BillDetailsDialog
        isOpen={selectedBill !== null}
        onClose={closeDialog}
        billDetails={selectedBill}
      />
    </div>
  );
};

export default SalesHistory;
