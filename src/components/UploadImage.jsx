import "../styles/Image.css";

const UploadImage = ( props ) => {
return(
    <div className="image-upload-container">
        <input type="file" id={props.id} accept="image/*" onChange={(e) => {
            const fileInput = e.target;
            const preview = fileInput.nextElementSibling;
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    preview.style.backgroundImage = `url('${event.target.result}')`;
                    preview.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            } else {
                preview.style.backgroundImage = '';
                preview.classList.remove('has-image');
            }
        }} />
        <div className="image-upload-preview">{props.label}</div>
    </div>
)
}

export default UploadImage;