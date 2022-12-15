import Toastify from "toastify-js"


const toast = (message, isError) => {

    Toastify({
        text: message,
        style: {
            background: isError ? "linear-gradient(to right, #FF0000 , #FF0000)" : "linear-gradient(to right, #00b09b, #96c93d)"
        },
        close: true
    }).showToast()
}

export default toast