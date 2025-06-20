import React, { useState } from "react";
import "../App.css";

/**
 * WasteItemInput:
 * Lets users input or select types of household waste materials.
 * Controlled by container's wasteItems/setWasteItems state (not managed internally).
 * Features: Dropdown selection for common items, tag entry, and free text.
 * 
 * Props:
 *   wasteItems: array<string>, the list of currently selected waste items.
 *   setWasteItems: function(newItems: array<string>), updates wasteItems state in parent.
 */
// PUBLIC_INTERFACE
function WasteItemInput({ wasteItems = [], setWasteItems }) {
  const COMMON_ITEMS = [
    "Plastic Bottles",
    "Glass Jars",
    "Cardboard",
    "Tin Cans",
    "Fabric Scraps",
    "Paper",
    "Bottle Caps",
    "Old Magazines",
    "CDs/DVDs",
    "Other",
  ];
  const [dropdownValue, setDropdownValue] = useState("");
  const [customInput, setCustomInput] = useState("");

  // Handler for dropdown/selection change
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };
  // Handler for free text input change
  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };
  // Handler for adding an item (from dropdown or text)
  const handleAddItem = (e) => {
    e.preventDefault();
    let valueToAdd =
      dropdownValue === "Other" ? customInput.trim() : dropdownValue;
    if (!valueToAdd || wasteItems.includes(valueToAdd)) return;
    setWasteItems([...wasteItems, valueToAdd]);
    setDropdownValue("");
    setCustomInput("");
  };
  // Handler for removing an item (tag deletion)
  const removeItem = (item) => {
    setWasteItems(wasteItems.filter((i) => i !== item));
  };

  // Placeholder submit handler, in future can trigger project suggestion engine
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Connect with project suggestion engine here in the future
    alert("Submitted: " + JSON.stringify(wasteItems));
  };

  return (
    <form
      className="waste-item-input-form"
      onSubmit={handleSubmit}
      autoComplete="off"
      style={formStyle}
    >
      <label htmlFor="waste-dropdown" style={labelStyle}>
        Add Waste Type:
      </label>
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
        <select
          id="waste-dropdown"
          value={dropdownValue}
          onChange={handleDropdownChange}
          style={dropdownStyle}
        >
          <option value="">Select...</option>
          {COMMON_ITEMS.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {dropdownValue === "Other" && (
          <input
            type="text"
            placeholder="Specify waste type"
            value={customInput}
            onChange={handleCustomInputChange}
            style={inputStyle}
          />
        )}
        <button
          type="button"
          className="btn"
          onClick={handleAddItem}
          style={addBtnStyle}
          disabled={
            (!dropdownValue && !customInput) ||
            (dropdownValue === "Other" && !customInput.trim())
          }
        >
          Add
        </button>
      </div>
      {/* Display added waste items as removable tags */}
      <div style={chipListContainer}>
        {wasteItems.length > 0 &&
          wasteItems.map((item) => (
            <span className="waste-chip" key={item} style={chipStyle}>
              {item}
              <button
                onClick={() => removeItem(item)}
                type="button"
                aria-label={`Remove ${item}`}
                style={chipRemoveBtn}
              >
                ×
              </button>
            </span>
          ))}
      </div>
      <button
        type="submit"
        className="btn btn-large"
        style={submitBtnStyle}
        disabled={wasteItems.length === 0}
      >
        Submit
      </button>
    </form>
  );
}

// --- Inline minimal styles for component usability ---
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  width: "100%",
  alignItems: "flex-start"
};
const labelStyle = {
  color: "var(--primary-green)",
  fontWeight: 500,
  fontSize: "1.05rem"
};
const dropdownStyle = {
  minWidth: 140,
  fontSize: "1rem",
  padding: "7px 8px",
  borderRadius: 4,
  border: "1px solid var(--border-color)"
};
const inputStyle = {
  fontSize: "1rem",
  padding: "8px",
  borderRadius: 4,
  border: "1px solid var(--border-color)",
  width: 180
};
const addBtnStyle = {
  height: 36, fontWeight: 500, padding: "0 18px"
};
const chipListContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: 8,
  marginBottom: 6,
  minHeight: 32
};
const chipStyle = {
  background: "var(--secondary-green)",
  borderRadius: "20px",
  color: "#fff",
  padding: "6px 12px",
  display: "flex",
  alignItems: "center",
  fontSize: "0.98rem",
  fontWeight: 400,
  gap: "6px"
};
const chipRemoveBtn = {
  background: "none",
  color: "#fff",
  border: "none",
  fontSize: "1.1em",
  marginLeft: 4,
  cursor: "pointer"
};
const submitBtnStyle = {
  marginTop: 8,
  alignSelf: "flex-end"
};

export default WasteItemInput;
