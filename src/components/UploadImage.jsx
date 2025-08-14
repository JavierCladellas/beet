import { useEffect, useRef } from "react";
import "../styles/Image.css";
import dev_env from "../data/DevEnv.json"

const UploadImage = (props) => {
  const previewRef = useRef(null);
  const inputRef = useRef(null);
  const existingRef = useRef(null);

  useEffect(() => {
    const preview = previewRef.current;
    const defaultValue = props.default_value;

    if (preview) {
      if (defaultValue) {
        const fullUrl = defaultValue.startsWith("http")
          ? defaultValue : dev_env.url + defaultValue;
        preview.style.backgroundImage = `url('${fullUrl}')`;
        preview.classList.add("has-image");
      } else {
        preview.style.backgroundImage = "";
        preview.classList.remove("has-image");
      }
    }

    if (existingRef.current) {
      existingRef.current.value = props.default_value || "";
    }
  }, [props.default_value]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const preview = previewRef.current;

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        preview.style.backgroundImage = `url('${event.target.result}')`;
        preview.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    } else {
      preview.style.backgroundImage = "";
      preview.classList.remove("has-image");
    }
  };

  return (
    <div className="image-upload-container" style={props.style}>
      <input
        ref={inputRef}
        type="file"
        id={props.id}
        name={props.id}
        accept="image/*"
        required={props.required}
        onChange={handleChange}
      />
      <div ref={previewRef} className="image-upload-preview">
        {props.label}
      </div>
      <input
        type="hidden"
        name={`${props.id}_existing`}
        ref={existingRef}
        value={props.default_value || ""}
      />
    </div>
  );
};

export default UploadImage;
