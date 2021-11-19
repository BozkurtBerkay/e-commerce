import React, {useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'

function BuyButton({total, tranSuccess}){
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged 
    const toPayment = async (total, payment) =>{
        console.log("satış başarılı")
        await axios.get(`http://localhost:26000/payment/pay/user='${isLogged}'&price='${total}'`);
        if(window.confirm("Ödeme işleminiz başarılı mı?")){
            tranSuccess(payment)
        }
    }

    let priceTotal = 0.50 - total
    if(total <= 0.49){
        return (
            <>
            <h1 className="buy-title">{priceTotal.toFixed(2)} XRP tutarında daha alım yapmanız gerekmektedir</h1>
            </>
        )   
    }else{
        return (
            <>
            <button className="buy-button" onClick={()=>toPayment(total)}>Satın Al</button>
            </>
        )
    }
}

export default BuyButton