import "../styles/Dropdown.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState, useEffect } from "react";

const Dropdown = (props) => {

    const [selectedValue, setSelectedValue] = useState(props.default_value ?? "");
    const [customInput, setCustomInput] = useState("");


    useEffect(() => {
        setSelectedValue(props.default_value ?? "");
    }, [props.default_value]);


    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        props.onChange?.(e);
        if (e.target.value !== "other") {
            setCustomInput("");
        }
    };

    return (
        <div className="input-container" style={props.style}>
            {selectedValue === "other" && (
                <input
                    type="text"
                    placeholder="Tu opción personalizada"
                    value={customInput}
                    onChange={(e) => { setCustomInput(e.target.value); props.onChange?.(e); }}
                    className="custom-input"
                    required
                />
            )}
            <select id={props.id}
                required={props.required ?? false}
                onChange={handleChange}
                className={selectedValue === "other" ? "custom-select" : ""}
                value={selectedValue}
            >
                {!props.default_value && <option value="" disabled={props.accept_empty} hidden>{props.placeholder ?? "Selecciona"}</option>}
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <input
                type="hidden"
                name={props.id}
                value={selectedValue === "other" ? customInput : selectedValue}
            />
            <label htmlFor={props.id}>{props.label}</label>

        </div>
    )
}

const SearchableDropdown = ({ label, options, onChange }) => {
    const [value, setValue] = useState(null);

    return (
        <Autocomplete
            options={options}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                if (onChange) onChange(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            "&:hover fieldset": { borderColor: "#b275a6" },
                            "&.Mui-focused fieldset": { borderColor: "#b275a6" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#b275a6" },
                    }}
                />
            )}
            sx={{
                width: 300,
                "& .MuiAutocomplete-option": {
                    "&:hover": { backgroundColor: "#f5e1f0" },
                    "&.Mui-focused": { backgroundColor: "#e7c9df" },
                },
            }}
        />
    );
};


export {Dropdown, SearchableDropdown};