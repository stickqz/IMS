import React from "react";
import {
  BsFillPersonFill,
  BsPersonFillGear,
  BsFillBoxFill,
  BsReceiptCutoff,
} from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { RiChatHistoryLine } from "react-icons/ri";
import "./Navbar.css";

const Navbar = ({ onSelectComponent, role }) => {
  return (
    <div className="navbar">
      <button
        onClick={() => onSelectComponent("profile")}
        className="profile-button"
      >
        <span className="size">
          <BsFillPersonFill />
        </span>
        <span className="size">Profile</span>
      </button>

      {role === "Admin" && (
        <button onClick={() => onSelectComponent("employee-management")}>
          <span className="size">
            <BsPersonFillGear />
          </span>
          <span className="size">Employees</span>
        </button>
      )}

      <button onClick={() => onSelectComponent("stock-management")}>
        <span className="size">
          <BsFillBoxFill />
        </span>
        <span className="size">Stocks</span>
      </button>

      <button onClick={() => onSelectComponent("sales-history")}>
        <span className="size">
          <RiChatHistoryLine />
        </span>
        <span className="size">Sales</span>
      </button>

      <button onClick={() => onSelectComponent("billing")}>
        <span className="size">
          <BsReceiptCutoff />
        </span>
        <span className="size">Billing</span>
      </button>

      <button
        className="logout-button"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        <span className="size">
          <IoLogOutOutline />
        </span>
        <span className="size">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
