import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id)
                {
                     setOrderDetails(item) 
                }
                    
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page"> 
            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th>Resimler</th>
                        <th>Ürünler</th>
                        <th>Adet</th>
                        <th>Ücret</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>XRP {item.price}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
                
            <label> Toplam Ödenen Tutar: XRP {orderDetails.cart.reduce((prev, item) => {return  prev + (item.price * item.quantity)},0)}</label>
                
            
        </div>
    )
}

export default OrderDetails
