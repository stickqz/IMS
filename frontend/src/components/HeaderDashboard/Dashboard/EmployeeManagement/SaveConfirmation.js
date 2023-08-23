import React from "react";
import './SaveConfirmation.css';

const SaveConfirmation = ({ onSaveConfirmed, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to save the changes?</p>
      <button onClick={onSaveConfirmed}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default SaveConfirmation;