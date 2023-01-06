
export const UPDATE_INFO = "UPDATE_INFO"
const initialState = {
    email : "",
    password : "",
    phone: "",
    address: ""
}

export default function actionForReducer( state = initialState, payload){
    switch(payload.type) {
        case UPDATE_INFO: 
        return{
            ...state,
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
            address: payload.address
        }
        default: state
    }
}