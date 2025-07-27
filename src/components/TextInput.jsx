import "../styles/FormInput.css";
import { useState, useEffect, useRef } from "react";

const TextInput = (props) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef(null);

    const inputHandler = (e) => {
        setIsEmpty(e.target.value.trim() === "");
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
                />
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        );
    }

    return (
        <div className="input-container text-input" style={props.style}>
            <input
                ref={inputRef}
                className={"text-input" + (isEmpty ? "" : " not-empty")}
                required={props.required ?? false}
                type={props.type ?? "text"}
                id={props.id}
                name={props.id}
                onChange={inputHandler}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

export default TextInput;
