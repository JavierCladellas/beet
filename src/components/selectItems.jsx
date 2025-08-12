import { useEffect, useState } from "react";
import "../styles/SelectItems.css";
import dev_env from "../data/DevEnv.json";
import { DataGrid } from "@mui/x-data-grid";

const SelectItems = (props) => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems ] = useState([]);

    const [rowSelectionModel, setRowSelectionModel] = useState({
        type: 'include',
        ids: new Set(props.selectedItems.map((it) => it.id)),
    });

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


  return (
    <div className="form-col">
        <h2>Selecciona los items</h2>
        <DataGrid
            columns={[
                { field: "id", headerName:"", width:0, flex: 0},
                { field: "sku", headerName:"SKU", width:100, flex: 1,minWidth : 100, maxWidth: 150},
                { field: "name", headerName:"Nombre", flex: 1,minWidth : 100, maxWidth: 300},
                { field: "stock", headerName:"Stock", flex: 1, maxWidth: 80},
                { field: "image_url", headerName:"", flex: 1,minWidth : 100, maxWidth: 300,
                sortable: false, filterable: false, disableExport: true,
                renderCell: (params) => (
                    params.value ?
                    <img
                    src={"http://localhost:8000/api/"+params.value}
                    alt="preview"
                    className='table-image-preview'
                    onClick={(e) => e.stopPropagation()}
                    /> :
                    <span></span>
                )}
            ]}
            rows={items}
            checkboxSelection
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(ids) => {
              setRowSelectionModel(ids);
                const selectedIds = Array.from([...ids.ids]);
                const selectedFullItems = selectedIds.map(id => items.find(item => item.id === id)).filter(Boolean);
                setSelectedItems(selectedFullItems);
            }}
            pageSizeOptions={[5, 10, 100]}
            initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false
                  },
                },
            }}
        />
        <button
            className="select-items-button action-button light-pink"
            type="button"
            onClick={() => props.onConfirm(selectedItems)}
        >
            Confirmar
        </button>
    </div>
  );
};

export default SelectItems;
