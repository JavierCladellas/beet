import Form from "../components/Form";
import TextInput from "../components/TextInput";

const Login = ( {setLogin} ) => {

    const onSuccess = (result) => {
        if (result.status === 200) {
            setLogin(true);
        }
        else {
            alert(result.message || "Error al iniciar sesión");
            setLogin(false);

            const loginForm = document.getElementById('login_form');
            if (loginForm) {
                const fields = loginForm.querySelectorAll('input, textarea');
                fields.forEach(field => {
                    field.value = '';
                    const event = new Event('input', { bubbles: true });
                    field.dispatchEvent(event);
                });

            }
        }
    }


    return (
        <div className="login-container">
        <Form title="BEET - ERP"
            method="post"
            action="login"
            include_credentials
            create_button_text="Iniciar Sesión"
            onSuccess={onSuccess}
            content={
                <div className='form-col' id="login_form">
                    <TextInput type="email" id="email" label="Email" required />
                    <TextInput type="password" id="password" label="Contraseña" required/>
                </div>
            }
        />
        </div>
    )
}

export default Login;