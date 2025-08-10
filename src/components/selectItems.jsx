import { useEffect, useState } from "react";
import "../styles/SelectItems.css";
import dev_env from "../data/DevEnv.json";

const SelectItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(dev_env.url + "items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  // Extract selected IDs from props.selectedItems, fallback to empty array
  const selectedIds = props.selectedItems ? props.selectedItems.map(item => item.id) : [];

  const toggleItem = (id) => {
    if (!props.onSelectionChange) return;

    if (selectedIds.includes(id)) {
      // Remove from selection
      props.onSelectionChange(props.selectedItems.filter(item => item.id !== id));
    } else {
      // Add to selection
      // Find the item object by id from items list and add it
      const newItem = items.find(item => item.id === id);
      if (newItem) {
        props.onSelectionChange([...props.selectedItems, newItem]);
      }
    }
  };

  return (
    <div className="form-col">
      <div className="select-items">
        {items.map((item) => (
          <div key={item.id} className="select-item-card">
            <input
              type="checkbox"
              id={`item-${item.id}`}
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            <label htmlFor={`item-${item.id}`}>
              {item.image_url ? (
                <img src={dev_env.url + item.image_url} alt={item.name} />
              ) : (
                <img alt="" />
              )}
              <span>{item.name}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        className="select-items-button action-button light-pink"
        type="button"
        onClick={() => {
          props.onConfirm(props.selectedItems);
        }}
      >
        Confirmar
      </button>
    </div>
  );
};

export default SelectItems;
