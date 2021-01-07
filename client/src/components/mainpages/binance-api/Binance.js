import React, {useEffect, useState} from 'react' 
import axios from 'axios'
const crypto = require('crypto');
const qs = require('qs'); 

 function Binance() {

    const binanceConfig = {
        API_KEY: '1UBIJxP7q8fWe9vTedrEEQXnGVvYa5lyqi0KJUXyppPSCmz0nkMeQVz9ncTxToJ91UBIJxP7q8fWe9vTedrEEQXnGVvYa5lyqi0KJUXyppPSCmz0nkMeQVz9ncTxToJ9',
        API_SECRET: 'OiVpV2p0szGPE3IyZNdGdgdMEjIJlBW0rDmrCIDA9e1hBsaJOwq29NPclmvStvpP',
        HOST_URL: 'https://api.binance.com',
      };

    const [ripples, setRipples] = useState([])
    const [timestamp, setTimestamp] = useState(0)
    const [signature, setSignature] = useState(0)

    useEffect(() => {   
        getTradeTRXTRY() 
        getTimeStampAndSignature()  
    },[]);
 
    const getTradeTRXTRY = async () => {
        try {
            const {data} = await axios.get(`${binanceConfig.HOST_URL}/api/v3/trades?symbol=XRPTRY&limit=5`); 
            setRipples(data)
            
        } catch (error) {
            console.log("getTRXTRY err", error)
        }
    }

    const getTimeStampAndSignature = async () => { 
        try {
            const {data} = await axios.get(`${binanceConfig.HOST_URL}/api/v3/time`); 
            setTimestamp(data.serverTime)
            const signature = crypto.createHmac('sha256', binanceConfig.API_SECRET).update(`timestamp=${data.serverTime}`).digest('hex'); 
            setSignature(signature)  
            await axios.get(`${binanceConfig.HOST_URL}/wapi/v3/accountStatus.html?timestamp=${data.serverTime}&signature=${signature}`,{
                headers:{
                    "X-MBX-APIKEY" : binanceConfig.API_KEY
                }
            }) 
             
        } catch (error) {
            console.log(error)
        } 
    }
     
    const getAccountStatus = async () => {
        try {  
            const {data} = await axios.get(`${binanceConfig.HOST_URL}/wapi/v3/accountStatus.html?timestamp=${timestamp}&signature=${signature}`,{
                headers:{
                    "X-MBX-APIKEY" : binanceConfig.API_KEY
                }
            }) 
        } catch (error) {
            console.log(error)
        }
    }
    
     
    return (
        <div className="ripple-main">
            <h2>Ripple TRY</h2>
            <div className="ripple-table">
                <div className="ripple-text">
                    <ul>
                        <li>id</li>
                        <li>price</li>
                        <li>qty</li>
                        <li>quoteQty</li> 
                    </ul> 
                </div>
                <div className="ripple-value">
                    {
                        ripples.reverse().map((ripple,i) => {
                             return (
                                 <ul key={i}>
                                     <li>{ripple.id}</li>
                                     <li>{ripple.price}</li>
                                     <li>{ripple.qty}</li>
                                     <li>{ripple.quoteQty}</li> 
                                 </ul>
                             )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Binance;