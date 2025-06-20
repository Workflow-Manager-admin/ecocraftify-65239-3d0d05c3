import React, { useState, useRef, useEffect } from "react";
import "../App.css";

/**
 * WasteItemInput:
 * Lets users input or select types of household waste materials.
 * Controlled by container's wasteItems/setWasteItems state (not managed internally).
 * Features: Dropdown selection for common items, tag entry, and free text.
 * Wikipedia summary (fun fact) for each new item.
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

  // Wikipedia summary state
  const [wikiSummary, setWikiSummary] = useState("");
  const [wikiTitle, setWikiTitle] = useState("");
  const [wikiLoading, setWikiLoading] = useState(false);
  const [wikiError, setWikiError] = useState("");
  const lastRequestedRef = useRef(""); // Prevent race conditions

  // Handler for dropdown/selection change
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };
  // Handler for free text input change
  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };
  // Handler for adding an item (from dropdown or text)
  const handleAddItem = async (e) => {
    e.preventDefault();
    let valueToAdd =
      dropdownValue === "Other" ? customInput.trim() : dropdownValue;
    if (!valueToAdd || wasteItems.includes(valueToAdd)) return;
    setWasteItems([...wasteItems, valueToAdd]);
    setDropdownValue("");
    setCustomInput("");
    // Fetch Wikipedia summary for new item
    fetchWikipediaSummary(valueToAdd);
  };
  // Handler for removing an item (tag deletion)
  const removeItem = (item) => {
    setWasteItems(wasteItems.filter((i) => i !== item));
    // If removing last shown item, clear summary
    if (wikiTitle && wikiTitle.toLowerCase() === item.toLowerCase()) {
      setWikiSummary("");
      setWikiTitle("");
      setWikiError("");
    }
  };

  // Placeholder submit handler, in future can trigger project suggestion engine
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: Connect with project suggestion engine here in the future
    alert("Submitted: " + JSON.stringify(wasteItems));
  };

  // PUBLIC_INTERFACE
  /**
   * Fetches a summary from Wikipedia REST API for a material/waste item
   */
  async function fetchWikipediaSummary(wasteItem) {
    if (!wasteItem) return;
    setWikiSummary("");
    setWikiError("");
    setWikiLoading(true);

    const encoded = encodeURIComponent(wasteItem.replace(/ /g, "_"));
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
    lastRequestedRef.current = wasteItem;
    try {
      const resp = await fetch(url, { headers: { accept: "application/json" } });
      if (!resp.ok) {
        throw new Error(`Wikipedia returned status ${resp.status}`);
      }
      const data = await resp.json();
      // Only show result if still the latest request
      if (lastRequestedRef.current !== wasteItem) return;
      if (data && data.extract) {
        setWikiSummary(data.extract);
        setWikiTitle(data.title || wasteItem);
        setWikiError("");
      } else if (data.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
        setWikiSummary("");
        setWikiError("No Wikipedia summary found for that item.");
        setWikiTitle(wasteItem);
      } else {
        setWikiSummary("");
        setWikiError("No relevant Wikipedia fact found.");
        setWikiTitle(wasteItem);
      }
    } catch (e) {
      if (lastRequestedRef.current === wasteItem) {
        setWikiSummary("");
        setWikiError("Unable to fetch Wikipedia info. Try again later.");
        setWikiTitle(wasteItem);
      }
    } finally {
      if (lastRequestedRef.current === wasteItem) setWikiLoading(false);
    }
  }

  // Fetch Wikipedia summary for last item added, whenever wasteItems updates
  useEffect(() => {
    if (wasteItems.length === 0) {
      setWikiSummary("");
      setWikiTitle("");
      setWikiError("");
      setWikiLoading(false);
      return;
    }
    const newItem = wasteItems[wasteItems.length - 1];
    if (!newItem) return;

    fetchWikipediaSummary(newItem);
    // eslint-disable-next-line
  }, [wasteItems.length]);

  return (
    <>
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

      {/* --- Wikipedia/Fact section --- */}
      <div style={factBoxStyle}>
        <strong style={{ color: "var(--secondary-green)" }}>
          {wikiLoading ? "Looking up fun fact..." : wikiTitle ? "Did you know?" : "Material Fact"}
        </strong>
        <div style={{ marginTop: 4 }}>
          {wikiLoading && (
            <span style={{ color: "#6e8855" }}>Fetching Wikipedia summary...</span>
          )}
          {!wikiLoading && wikiError && (
            <span style={{ color: "#c55332", opacity: 0.97 }}>{wikiError}</span>
          )}
          {!wikiLoading && !wikiError && wikiSummary && (
            <span>
              <span style={{ color: "var(--text-secondary)" }}>{wikiSummary}</span>
              {wikiTitle && (
                <span>
                  {" "}
                  <a
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                      wikiTitle.replace(/ /g, "_")
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: 7,
                      color: "var(--accent-yellow)",
                      textDecoration: "underline dotted",
                      fontWeight: 500,
                      fontSize: "0.97em"
                    }}
                  >
                    Learn more
                  </a>
                </span>
              )}
            </span>
          )}
          {!wikiLoading && !wikiError && !wikiSummary && wikiTitle && (
            <span style={{ color: "#9a9e92" }}>No fact found for "{wikiTitle}"</span>
          )}
          {!wikiTitle && !wikiLoading && (
            <span style={{ color: "#b5ab80" }}>
              Add a waste material to see a fun Wikipedia fact here!
            </span>
          )}
        </div>
      </div>
    </>
  );
}

const factBoxStyle = {
  marginTop: 20,
  background: "#fafdff",
  borderLeft: "5px solid var(--accent-yellow)",
  borderRadius: "10px",
  padding: "13px 18px 13px 18px",
  boxShadow: "0 1px 11px 0 rgba(80,130,50,0.08)",
  minHeight: 46,
  width: "98%",
  maxWidth: 630,
  fontSize: "1.01em"
};

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
