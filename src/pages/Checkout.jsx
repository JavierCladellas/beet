import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../components/LocalStorage";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextInput from "../components/TextInput";
import { SearchableDropdown } from "../components/Dropdown";
import Modal from "../components/Modal";
import "../styles/Checkout.css";
import "../styles/Button.css";

import municipalities from "../data/municipios.json";
import metropolitan_area from "../data/metropolitanArea.json";
import { Link, useNavigate } from "react-router-dom";


const apiUrl = process.env.REACT_APP_BEET_API_URL;


const Checkout = (props) => {

    const formRef = useRef(null);
    const confirmationModalRef = useRef();

    const [confirmationMsg, setConfirmationMsg] = useState(<p></p>);

    const [cart, setCart] = useLocalStorage("cart", []);
    const [orderPrice, setOrderPrice] = useState(null);
    const [deliveryPrice, setDeliveryPrice] = useState(2.5);
    const totalPrice = orderPrice + deliveryPrice;
    const [paymentType, setPaymentType] = useState("card");

    const [deliveryType, setDeliveryType] = useState("delivery");
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
                throw new Error("MUNICIPALITY IS WRONG");


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
        if (type === "delivery") {
            if (!deliveryMunicipality || !deliveryDepartment) {
                setDeliveryPrice(2.5);
                setIsMetropolitan(false);
            }
            else if (metropolitan_area.includes(deliveryMunicipality))
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
            setDeliveryPrice(0);
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


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    const [ address, setAddress ] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault();

        //Open confirmation modal with loading screen
        confirmationModalRef.current?.open();
        setIsLoading(true);

        const formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());

        data["cart_items"] = cart.map(item => ({ id: item.id, qty: item.qty }));
        data["total_amount"] = totalPrice;


        fetch(apiUrl + "checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        })
            .then( async (response) => {
                setIsLoading(false);
                if (response.ok) {
                    if (data["payment_type"] === "bank_transfer"){
                        const order = await response.json();
                        console.log(order);
                        setConfirmationMsg(
                            <>
                            <h2>La orden ha sido tomada en cuenta!</h2>
                            <p>Haz tu transferencia con los siguientes detalles. <br/>
                                Banco: <b>Davivienda</b> <br/>
                                Numero de Cuenta: <b>1234-5678-9100-1234</b>
                            </p>
                            <p>
                                Luego envianos captura de pantalla con la confirmacion de la transferencia por WhatsApp : <b>7852 4563</b>
                            </p>

                            <p> Hemos enviado un mensaje con los detalles de tu orden a tu correo. </p>

                            <br/>
                            <p> Orden : <b>{order.code}</b></p>
                            </>
                        )
                    }
                    else if (data["payment_type"] === "card"){
                        setConfirmationMsg(
                            <>
                            <h2>Tu pago ha sido tomada en cuenta!</h2>
                            <p> Te enviaremos tu pedido lo antes posible.</p>
                            <p> Hemos enviado un mensaje con los detalles de tu orden a tu correo. </p>
                            </>
                        )
                    }
                    else{
                        throw new Error("Unkown payment type");
                    }

                    setCart([]);
                }
                else {
                    //If response code is XXX then show payment error, 
                    // else show default err msh
                    setConfirmationMsg(
                        <>
                        <h2>Lo sentimos...</h2>
                        <p>Ha ocurrido un error con tu orden :( </p>
                        </>
                    )
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setConfirmationMsg(
                    <>
                    <h2>Lo sentimos...</h2>
                    <p>Ha ocurrido un error con tu orden :( </p>
                    <p>Intentalo de nuevo o contactanos al 7123 7723</p>
                    </>
                )
            });
    };
    const navigate = useNavigate();

    return (
        <div className="page cart-page checkout-page" style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <form className="checkout-form" style={{ alignItems: "flex-start" }} ref={formRef} onSubmit={submitHandler}>


                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="telephone" value={telephone} />

                <div className="form-col" style={{ alignItems: "flex-start", display:step === 0 ? "flex" : "none"}}>
                    <p> Datos personales </p>
                    <TextInput type="text" label="Nombre Completo" required onChange ={(e) => { setName(e.target.value); }} />
                    <div className="form-row">
                        <TextInput type="email" label="Email" required onChange={(e) => { setEmail(e.target.value); }} />
                        <TextInput type="tel" label="Teléfono" required pattern="^$|^\+?(?=(?:\D*\d){5,16}\D*$)[\d ]+$" onChange={(e) => { setTelephone(e.target.value); }} />
                    </div>
                </div>

                <hr style={{display:step === 0 ? "flex" : "none"}}/>



                <div className="form-row" style={{ justifyContent: "flex-start", alignItems: "center",display:step === 0 ? "flex" : "none" }}>
                    <p>Método de Entrega</p>

                    <ToggleButtonGroup value={deliveryType} exclusive onChange={(e) => { deliveryTypeHandler(e.target.value); }} aria-label="Platform" color="primary">
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="delivery">
                            Envío a domicilio
                        </ToggleButton>
                        <ToggleButton
                            sx={{ "&.Mui-selected": { backgroundColor: "#b275a6", color: "white", "&:hover": { backgroundColor: "#9a5e8a" } } }}
                            value="pickup">
                            Retiro en tienda
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="form-col" style={{ alignItems: "flex-start",display:(step === 0 && deliveryType === "delivery") ? "flex" : "none"}}>

                    <TextInput  label="Dirección de entrega" required={deliveryType === "delivery"} onChange={(e) => { setAddress(e.target.value); }} />
                    <SearchableDropdown
                        label="Departamento - Municipio"
                        options={municipalities}
                        style={{ maxWidth: "350px" }}
                        onChange={(value) => municipalityHandler(value)}
                        required={deliveryType === "delivery"}
                    />
                </div>

                <input type="hidden" name="delivery_type" value={deliveryType}/>
                <input type="hidden" name="municipality" value={deliveryMunicipality} />
                <input type="hidden" name="department" value={deliveryDepartment} />
                <input type="hidden" name="address" value={address} />
                <input type="hidden" name="delivery_amount" value={deliveryPrice} />

                <button type="button" className="action-button pink form-button" style={{alignSelf:"flex-end", display:(step === 0) ? "flex" : "none"}} onClick={(e)=>{
                    if ( !name || !email || !telephone) {
                        alert("Por favor, completa todos los campos requeridos antes de continuar.");
                        return;
                    }
                    if ( deliveryType === "delivery" && (!deliveryMunicipality || !deliveryDepartment || !address)) {
                        alert("Por favor, completa todos los campos requeridos para la entrega a domicilio.");
                        return;
                    }

                    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) {
                        alert("El nombre solo debe contener letras, espacios y acentos.");
                        return;
                    }
                    if (!/^\+?[0-9 ()]{5,20}$/.test(telephone)) {
                        alert("Por favor, ingresa un número de teléfono válido (solo dígitos, espacios, paréntesis y un '+' opcional al inicio).");
                        return;
                    }

                    setStep(1);

                }}><p>Siguiente</p></button>

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
                            value="bank_transfer">
                            Transferencia
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <input type="hidden" name="payment_type" value={paymentType} />

                <div className="form-col" style={{display:(step === 1 && paymentType==="card") ? "flex" : "none"}}>
                    <TextInput type="text" id="card_number" label="Número de tarjeta" required={paymentType === "card"} pattern="^\\+?[0-9 ()]{5,20}$" inputMode="numeric" autocomplete="cc-number" />
                    <div className="form-row">
                        <TextInput type="text" id="card_expiry" label="MM/AA" required={paymentType === "card"} autocomplete="cc-exp" pattern="^(0[1-9]|1[0-2])/[0-9]{2}$" />
                        <TextInput type="text" id="card_cvc" label="CVC" required={paymentType === "card"} autocomplete="cc-csc"  pattern="^[0-9]{3,4}$" />
                    </div>
                    <TextInput type="text" id="card_name" label="Nombre en la tarjeta" required={paymentType === "card"} autocomplete="cc-number"/>
                </div>

                <hr style={{display:(step === 1) ? "flex" : "none" }}/>

                <div className="form-col" style={{ alignItems: "flex-start",display:(step === 1) ? "flex" : "none"  }}>
                    <p>Notas adicionales</p>
                    <TextInput type="textarea" id="special_notes" label="Notas adicionales para tus productos o información de entrega" sx={{ ">textarea": { minHeight: "80px" } }} />
                </div>
                <div style={{ width:"100%", flexDirection:"row", alignContent:"center", justifyContent:"space-between",display:(step === 1) ? "flex" : "none" }}>
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
                        deliveryType==="delivery"?
                        "A domicilio - " + (isMetropolitan ? "Área Metropolitana" : "Resto del país")
                        :"Recoger en tienda"
                    })</i> </p> <p className="price"> {Number.isInteger(deliveryPrice) ? deliveryPrice : deliveryPrice?.toFixed(2)} $</p>
                </div>

                <hr />

                <div className="checkout-card-item">
                    <span>Total </span> <span> {Number.isInteger(totalPrice) ? totalPrice : totalPrice?.toFixed(2)} $</span>
                </div>

                <input type="hidden" name="total_amount" value={totalPrice} />


                <div>
                    TODO: Add serfinsa logos (and mastercard and stuff)
                </div>

            </div>
            <Modal ref={confirmationModalRef} key="confirmation-modal" className="confirmation-modal" 
            close = {(e)=>{
                window.dispatchEvent(new Event("storage"));
                navigate("/shop");
            }}
            children={[
                <img src="/logos/beet_minimal_white_bg.webp" />,
                isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div>{confirmationMsg}</div>
                ),
                <Link className="action-button pink" to="/shop" onClick={
                    (e)=>{
                        window.dispatchEvent(new Event("storage"));
                        confirmationModalRef.current?.close();
                    }
                } ><p> Regresar </p> </Link>
            ]}/>
        </div>
    )

}

export default Checkout;