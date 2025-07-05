import { IoLogoWhatsapp } from "react-icons/io";
import '../styles/IconButtons.css'


const WhatsappButton = (props) => {
    const wa_link = "https://api.whatsapp.com/send?phone=" + props.number + "&text=" + encodeURIComponent(props.text);
    return (
        <a className="icon-button wa-button" href={wa_link}  target="_blank" rel="noreferrer noopener">
            <IoLogoWhatsapp/>
        </a>
    )
};

export default WhatsappButton;