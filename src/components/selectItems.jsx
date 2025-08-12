import { useEffect, useState } from "react";
import "../styles/SelectItems.css";
import dev_env from "../data/DevEnv.json";

const SelectItems = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(dev_env.url + "items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const toggleItem = (id) => {
    if (!props.onSelectionChange) return;

    if (props.selectedItems.some(item => item.id === id)) {
      props.onSelectionChange(props.selectedItems.filter(item => item.id !== id));
    } else {
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
              checked={props.selectedItems.some(sel => sel.id === item.id)}
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
        onClick={() => props.onConfirm(props.selectedItems)}
      >
        Confirmar
      </button>
    </div>
  );
};

export default SelectItems;
