import { UPDATE_INFO } from "../reducers/infoReducer"
export const updateInfo = (email, password, phone, address) => async dispatch => {
    try{
       await new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve()
            },1000)
        })
        dispatch({
            type: UPDATE_INFO,
            email: email,
            password: password,
            phone: phone,
            address: address
        })
    }catch (error){
        console.log("");
        
    }
}