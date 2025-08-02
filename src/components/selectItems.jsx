import { useEffect, useState} from "react";
import "../styles/SelectItems.css";

import dev_env from "../data/DevEnv.json";


const SelectItems = ( props ) => {
    const [items, setItems] = useState([]);
    const [selectedItemsIds, setSelectedItemsIds] = useState([]);

    useEffect(() => {
        fetch( dev_env.url + "items" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }
        ).then(data => {
            setItems(data);
        }).catch(error => {
            console.error("Error fetching items:", error);
        });
    }, []);

    return (
        <div className="select-items">
            {items.map((item) => (
                <div key={item.id} className="select-item-card">
                    <input
                        type="checkbox"
                        className=""
                        id={`item-${item.id}`}
                        onChange={() => {
                            if (selectedItemsIds.includes(item.id)) {
                                setSelectedItemsIds(selectedItemsIds.filter(id => id !== item.id));
                            } else {
                                setSelectedItemsIds([...selectedItemsIds, item.id]);
                            }
                        }}
                    />
                    <label htmlFor={`item-${item.id}`}>
                        {item.image_url ? <img src={dev_env.url + item.image_url} alt={item.name} /> : <img></img>}
                        <span>{item.name}</span>
                    </label>
                </div>
            ))}
            <button
                className="select-items-button action-button light-pink"
                type="button"
                onClick={() => {
                    props.onConfirm(items.filter(item => selectedItemsIds.includes(item.id)));
                }}
            > Confirmar
            </button>
        </div>
    )
}

export default SelectItems;