import { useEffect, useRef } from "react";
import "../styles/Image.css";

const UploadImage = (props) => {
  const previewRef = useRef(null);
  const inputRef = useRef(null);

  // Load default image if provided
  useEffect(() => {
    if (props.default_value && previewRef.current) {
      previewRef.current.style.backgroundImage = `url('${props.default_value}')`;
      previewRef.current.classList.add("has-image");
      previewRef.current.value = props.default_value;
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
    </div>
  );
};

export default UploadImage;