import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../components/LocalStorage";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextInput from "../components/TextInput";
import { SearchableDropdown } from "../components/Dropdown";
import "../styles/Checkout.css";
import "../styles/Button.css";

import municipalities from "../data/municipios.json";



const Checkout = (props) => {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [orderPrice, setOrderPrice] = useState(null);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const totalPrice = orderPrice + deliveryPrice;
    const [paymentType, setPaymentType] = useState("card");

    const [deliveryType, setDeliveryType] = useState("domicilio");
    const [deliveryDepartment, setDeliveryDepartment] = useState("");
    const [deliveryMunicipality, setDeliveryMunicipality] = useState("");

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
        }
        else {
            setDeliveryDepartment("");
            setDeliveryMunicipality("");
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

                {step === 0 && <>
                    <div className="form-col" style={{ alignItems: "flex-start" }}>
                        <p> Datos personales </p>
                        <TextInput type="text" id="name" label="Nombre Completo" required />
                        <div className="form-row">
                            <TextInput type="email" id="email" label="Email" required />
                            <TextInput type="tel" id="telephone" label="Teléfono" required pattern="^$|^\+?(?=(?:\D*\d){5,16}\D*$)[\d ]+$" />
                        </div>
                    </div>

                    <hr />

                    <div className="form-row" style={{ justifyContent: "flex-start", alignItems: "center" }}>
                        <p>Método de Entrega</p>

                        <ToggleButtonGroup value={deliveryType} exclusive onChange={(e) => { setDeliveryType(e.target.value) }} aria-label="Platform" color="primary">
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
                    {deliveryType === "domicilio" &&
                        <div className="form-col" style={{ alignItems: "flex-start" }}>

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
                    }
                    <button type="button" className="action-button pink form-button" style={{alignSelf:"flex-end"}} onClick={(e)=>{setStep(1);}}><p>Siguiente</p></button>

                </>
                }

                { step === 1 && <>
                    <div className="form-row" style={{ justifyContent: "flex-start", alignItems: "center" }}>
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

                    {paymentType === "card" &&
                        <div className="form-col">
                            <TextInput type="text" id="card_number" label="Número de tarjeta" required={paymentType === "card"} pattern="[0-9\s]{13,19}" inputMode="numeric" autocomplete="cc-number" />
                            <div className="form-row">
                                <TextInput type="text" id="card_expiry" label="MM/AA" required={paymentType === "card"} autocomplete="cc-exp" />
                                <TextInput type="text" id="card_cvc" label="CVC" required={paymentType === "card"} autocomplete="cc-csc" />
                            </div>
                            <TextInput type="text" id="card_name" label="Nombre en la tarjeta" required={paymentType === "card"} autocomplete="cc-number" />
                        </div>
                    }
                    <hr />

                    <div className="form-col" style={{ alignItems: "flex-start" }}>
                        <p>Notas adicionales</p>
                        <TextInput type="textarea" id="special_notes" label="Notas adicionales para tus productos o información de entrega" sx={{ ">textarea": { minHeight: "80px" } }} />
                    </div>
                    <div style={{ width:"100%", display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"space-between"}}>
                        <button type="button" className="action-button light-pink form-button" onClick={(e)=>{setStep(0);}}><p>Regresar</p></button>
                        <button type="submit" className="action-button pink form-button" ><p>Pagar</p></button>
                    </div>
                </>}

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
                    <p>Envío </p> <p className="price"> {Number.isInteger(deliveryPrice) ? deliveryPrice : deliveryPrice?.toFixed(2)} $</p>
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