const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const btn_enviar = document.getElementById("btn-enviar");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

/* Lo uso para verificar que esten todos cargados */
const campos = {
    usuario: false,
    nombre: false,
    contraseña: false,
    correo: false,
    telefono: false
}

const validarForm = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "contraseña":
            validarCampo(expresiones.contraseña, e.target, "contraseña");
            validarContraseña2();
        break;
        case "contraseña2":
            validarContraseña2();
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");        
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");        
        break;
    }

}

const validarContraseña2 = () => {
    const pwd1 = document.getElementById("contraseña").value;
    const pwd2 = document.getElementById("contraseña2").value;
    if (pwd1 == pwd2) {
        document.getElementById("grupo__contraseña2").classList.remove("form__grupo-incorrecto");
        document.getElementById("grupo__contraseña2").classList.add("form__grupo-correcto");
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-times-circle");
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-check-circle");
        document.querySelector("#grupo__contraseña2 .form__input-error").classList.remove("form__input-error-activo"); 
        campos["contraseña"] = true;
    }else{
        document.getElementById("grupo__contraseña2").classList.remove("form__grupo-correcto");
        document.getElementById("grupo__contraseña2").classList.add("form__grupo-incorrecto");
        document.querySelector("#grupo__contraseña2 i").classList.remove("fa-check-circle");
        document.querySelector("#grupo__contraseña2 i").classList.add("fa-times-circle");
        document.querySelector("#grupo__contraseña2 .form__input-error").classList.add("form__input-error-activo");
        campos["contraseña"] = false;
    }
}

const validarCampo = (expresion, input, campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("form__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove("form__input-error-activo"); 
        campos[campo] = true;

    }else{
        document.getElementById(`grupo__${campo}`).classList.remove("form__grupo-correcto");
        document.getElementById(`grupo__${campo}`).classList.add("form__grupo-incorrecto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${campo} .form__input-error`).classList.add("form__input-error-activo");
        campos[campo] = false;
    }    

}

inputs.forEach(
    (input)=>{
        input.addEventListener("keyup", validarForm);
        input.addEventListener("blur", validarForm);            /* Click fuera del formulario*/
    }
)

/* Desahabilito el envio del formulario pq no tengo backend con e.preventDefault*/
btn_enviar.addEventListener(
    "click", 
    (e)=>{
        e.preventDefault;
        terminos = document.getElementById("terminos");
        
        if (campos.usuario && campos.nombre && campos.correo && campos.telefono && campos.contraseña && terminos.checked){
            document.getElementById("form__mensaje").classList.remove("form__mensaje-activo");
            document.getElementById("form__mensaje-exito").classList.add("form__mensaje-exito-activo");
            setTimeout(
                ()=>{
                    document.getElementById("form__mensaje-exito").classList.remove("form__mensaje-exito-activo");
                }
                ,5000
            )
            document.querySelectorAll(".form__grupo-correcto").forEach((icono)=>{
                icono.classList.remove("form__grupo-correcto");
            })
            form.reset();
        }else{
            document.getElementById("form__mensaje").classList.add("form__mensaje-activo");
            setTimeout( 
                () => {
                    document.getElementById("form__mensaje").classList.remove("form__mensaje-activo");
                }
                ,5000
            )
        }
    }
);

