import React, { useState, useEffect } from "react";
import "./SalesHistory.css";
import BillDetailsDialog from "./BillDetailsDialog";
import axios from "axios";

const SalesHistory = ({role}) => {
  const token = localStorage.getItem("token");
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const openDialog = (billDetails) => {
    setSelectedBill(billDetails);
  };

  const closeDialog = () => {
    setSelectedBill(null);
  };

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const handleSearch = () => {
    if (searchDate) {
      axios
        .get(
          `http://localhost:5000/api/admin/get-bills-by-date?date=${searchDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setFilteredBills(response.data);
          setSearchPerformed(true);
        })
        .catch((error) => {
          console.error("Error fetching filtered bills:", error);
        });
    } else {
      setFilteredBills(bills); 
      setSearchPerformed(false);
    }
  };

  const clearSearch = () => {
    setSearchDate(""); 
    setFilteredBills(bills);
    setSearchPerformed(false); 
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/get-bills", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBills(response.data);
        setFilteredBills(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      });
  }, [token]);

  return (
    <div className="component-container">
      <h2 className="heading-main">Sales History</h2>
      <div className="date-search">
        <div>
          <label htmlFor="searchDate">Search by Date:</label>
          <input
            type="date"
            id="searchDate"
            value={searchDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSearch}>Search</button>
          <button onClick={clearSearch}>Clear</button>
        </div>
      </div>

      <div className="bill-table-container">
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
            {searchPerformed && filteredBills.length === 0 ? (
              <tr>
                <td colSpan="4">No matching bills found.</td>
              </tr>
            ) : (
              filteredBills.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.billNo}</td>
                  <td>{new Date(bill.date).toLocaleString()}</td>
                  <td>{bill.totalAmount}</td>
                  <td>
                    <button onClick={() => openDialog(bill.details)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <BillDetailsDialog
        isOpen={selectedBill !== null}
        onClose={closeDialog}
        billDetails={selectedBill}
      />
    </div>
  );
};

export default SalesHistory;
