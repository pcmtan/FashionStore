import {showMessage} from "react-native-flash-message";

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        titleStyle: {
            fontSize: 16,
            fontWeight: "600"
        },
        message
    })
}

const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        titleStyle: {
            fontSize: 16,
            fontWeight: "600"
        },
        message
    })
}
const showWarning = (message) => {
    showMessage({
        type: 'warning',
        icon: 'warning',
        titleStyle: {
            fontSize: 16,
            fontWeight: "600"
        },
        message
    })
}

export {
    showError, 
    showSuccess,
    showWarning
}