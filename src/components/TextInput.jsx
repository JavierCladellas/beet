import "../styles/FormInput.css";
import { useState, useEffect, useRef } from "react";

const TextInput = (props) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef(null);

    const [value, setValue] = useState(props.default_value ?? "");

    useEffect(() => {
        setValue(props.default_value);
        if (props.default_value)
            setIsEmpty(props.default_value.trim() === "");
    }, [props.default_value]);

    const inputHandler = (e) => {
        setValue(e.target.value);
        setIsEmpty(e.target.value.trim() === "");

        props.onChange?.(e);

        if ( props.checkAgainst ) {
            const other = document.getElementById(props.checkAgainst);
            if (other && e.target.value !== other.value) {
                e.target.setCustomValidity("The values do not match.");
            } else {
                e.target.setCustomValidity("");
            }
        }

    };

    // On reset, update `isEmpty` by checking actual DOM value
    useEffect(() => {
        const el = inputRef.current;

        const updateState = () => {
            if (el) {
                setIsEmpty(el.value.trim() === "");
            }
        };

        // Listen for 'input' events manually dispatched from outside (e.g., cancelHandler)
        el?.addEventListener('input', updateState);

        // Initialize state
        updateState();

        return () => {
            el?.removeEventListener('input', updateState);
        };
    }, []);

    if (props.type === "textarea") {
        return (
            <div className="input-container" style={props.style}>
                <textarea
                    ref={inputRef}
                    className={"text-input" + (isEmpty ? "" : " not-empty")}
                    required={props.required ?? false}
                    id={props.id}
                    name={props.id}
                    onChange={inputHandler}
                    defaultValue={value}
                    placeholder={props.placeholder ?? ""}
                />
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        );
    }

    return (
        <div className="input-container text-input" style={props.style}>
            <input
                ref={inputRef}
                autoComplete={props.autocomplete}
                className={"text-input" + (isEmpty ? "" : " not-empty")}
                required={props.required ?? false}
                type={props.type ?? "text"}
                id={props.id}
                pattern={props.pattern}
                name={props.id}
                onChange={inputHandler}
                defaultValue={value}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

export default TextInput;
