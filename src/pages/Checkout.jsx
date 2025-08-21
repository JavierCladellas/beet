import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../components/LocalStorage";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextInput from "../components/TextInput";
import { SearchableDropdown } from "../components/Dropdown";
import "../styles/Checkout.css";
import "../styles/Button.css";

import municipalities from "../data/municipios.json";
import metropolitan_area from "../data/metropolitanArea.json";



const Checkout = (props) => {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [orderPrice, setOrderPrice] = useState(null);
    const [deliveryPrice, setDeliveryPrice] = useState(2.5);
    const totalPrice = orderPrice + deliveryPrice;
    const [paymentType, setPaymentType] = useState("card");

    const [deliveryType, setDeliveryType] = useState("domicilio");
    const [deliveryDepartment, setDeliveryDepartment] = useState("");
    const [deliveryMunicipality, setDeliveryMunicipality] = useState("");

    const [isMetropolitan, setIsMetropolitan] = useState(true);
    const [step, setStep] = useState(0);

    const municipalityHandler = (region) => {
        if (region) {
            let r = region.split(",");
            const d = r[0].trim();
            const m = r[1].trim();
            setDeliveryDepartment(d);
            setDeliveryMunicipality(m);
            if (r.length > 2)
                throw "MUNICIPALITY IS WRONG";


            if (metropolitan_area.includes(m))
            {
                setDeliveryPrice(2.5);
                setIsMetropolitan(true);
            }
            else{
                setDeliveryPrice(5);
                setIsMetropolitan(false);
            }
        }
        else {
            setDeliveryDepartment("");
            setDeliveryMunicipality("");
            setDeliveryPrice(0);
            setIsMetropolitan(false);
        }
    }

    const deliveryTypeHandler = (type) => {
        setDeliveryType(type);
        if (type === "domicilio") {
            setDeliveryPrice(2.5);
            setIsMetropolitan(true);
        } else {
            setDeliveryPrice(0);
            setDeliveryDepartment("");
            setDeliveryMunicipality("");
            setIsMetropolitan(false);
        }
    }

    useEffect(() => {
        const updateCart = () => {
            const parsedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCart(parsedCart);
            setOrderPrice(parsedCart.reduce((sum, prod) => sum + prod.price * prod.qty, 0));
        };

        updateCart();
        const handler = () => updateCart();
        window.addEventListener("storage", handler);
        return () => {
            window.removeEventListener("storage", handler);
        };
    }, []);

    return (
        <div className="page cart-page" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <form className="checkout-form" style={{ alignItems: "flex-start" }}>


                <div className="form-col" style={{ alignItems: "flex-start", display:step === 0 ? "flex" : "none"}}>
                    <p> Datos personales </p>
                    <TextInput type="text" id="name" label="Nombre Completo" required />
                    <div className="form-row">
                        <TextInput type="email" id="email" label="Email" required />
                        <TextInput type="tel" id="telephone" label="Teléfono" required pattern="^$|^\+?(?=(?:\D*\d){5,16}\D*$)[\d ]+$" />
                    </div>
                </div>

                <hr style={{display:step === 0 ? "flex" : "none"}}/>

                <div className="form-row" style={{ justifyContent: "flex-start", alignItems: "center",display:step === 0 ? "flex" : "none" }}>
                    <p>Método de Entrega</p>

                    <ToggleButtonGroup value={deliveryType} exclusive onChange={(e) => { deliveryTypeHandler(e.target.value); }} aria-label="Platform" color="primary">
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="domicilio">
                            Envío a domicilio
                        </ToggleButton>
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="tienda">
                            Retiro en tienda
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="form-col" style={{ alignItems: "flex-start",display:(step === 0 && deliveryType === "domicilio") ? "flex" : "none"}}>

                    <TextInput id="address" label="Dirección de entrega" required={deliveryType === "domicilio"} />
                    <SearchableDropdown
                        label="Departamento - Municipio"
                        options={municipalities}
                        style={{ maxWidth: "350px" }}
                        onChange={(value) => municipalityHandler(value)}
                        required={deliveryType === "domicilio"}
                    />
                    <input type="hidden" name="municipality" value={deliveryMunicipality} />
                    <input type="hidden" name="department" value={deliveryDepartment} />

                </div>
                <button type="button" className="action-button pink form-button" style={{alignSelf:"flex-end", display:(step === 0) ? "flex" : "none"}} onClick={(e)=>{setStep(1);}}><p>Siguiente</p></button>

                <div className="form-row" style={{ justifyContent: "flex-start", alignItems: "center",display:(step === 1) ? "flex" : "none" }}>
                    <p>Método de Pago</p>

                    <ToggleButtonGroup value={paymentType} exclusive onChange={(e) => { setPaymentType(e.target.value) }} aria-label="Platform" color="primary">
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="card">
                            Tarjeta
                        </ToggleButton>
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="cash">
                            Efectivo
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className="form-col" style={{display:(step === 1 && paymentType==="card") ? "flex" : "none"}}>
                    <TextInput type="text" id="card_number" label="Número de tarjeta" required={paymentType === "card"} pattern="[0-9\s]{13,19}" inputMode="numeric" autocomplete="cc-number" />
                    <div className="form-row">
                        <TextInput type="text" id="card_expiry" label="MM/AA" required={paymentType === "card"} autocomplete="cc-exp" />
                        <TextInput type="text" id="card_cvc" label="CVC" required={paymentType === "card"} autocomplete="cc-csc" />
                    </div>
                    <TextInput type="text" id="card_name" label="Nombre en la tarjeta" required={paymentType === "card"} autocomplete="cc-number" />
                </div>

                <hr style={{display:(step === 1) ? "flex" : "none" }}/>

                <div className="form-col" style={{ alignItems: "flex-start",display:(step === 1) ? "flex" : "none"  }}>
                    <p>Notas adicionales</p>
                    <TextInput type="textarea" id="special_notes" label="Notas adicionales para tus productos o información de entrega" sx={{ ">textarea": { minHeight: "80px" } }} />
                </div>
                <div style={{ width:"100%", display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"space-between",display:(step === 1) ? "flex" : "none" }}>
                    <button type="button" className="action-button light-pink form-button" onClick={(e)=>{setStep(0);}}><p>Regresar</p></button>
                    <button type="submit" className="action-button pink form-button" ><p>Pagar</p></button>
                </div>

            </form>
            <div className="checkout-card">
                <div className="checkout-card-item">
                    <span>Productos </span>
                </div>
                {
                    cart && cart.map((prod, index) =>
                        <div className="checkout-card-item" key={"prod_summary_" + index}>
                            <p>{prod.qty} x {prod.name} </p> <p className="price"> {Number.isInteger((prod.price * prod.qty)) ? (prod.price * prod.qty) : (prod.price * prod.qty)?.toFixed(2)} $</p>
                        </div>
                    )}

                <hr />

                <div className="checkout-card-item">
                    <p>Subtotal </p> <p className="price"> {Number.isInteger(orderPrice) ? orderPrice : orderPrice?.toFixed(2)} $</p>
                </div>
                <div className="checkout-card-item">
                    <p>Envío <br/> <i>({
                        deliveryType==="domicilio"?
                        "A domicilio - " + (isMetropolitan ? "Área Metropolitana" : "Resto del país")
                        :"Recoger en tienda"
                    })</i> </p> <p className="price"> {Number.isInteger(deliveryPrice) ? deliveryPrice : deliveryPrice?.toFixed(2)} $</p>
                </div>

                <hr />

                <div className="checkout-card-item">
                    <span>Total </span> <span> {Number.isInteger(totalPrice) ? totalPrice : totalPrice?.toFixed(2)} $</span>
                </div>


            </div>
        </div>
    )

}

export default Checkout;