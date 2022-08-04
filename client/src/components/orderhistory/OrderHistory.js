import { useEffect, useState } from "react";

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([])
    const [filtered, setFiltered] = useState('all')
    
    useEffect(() => {
        const fetchData = async () => {
           const data = await fetch(`https://investopia-paper-trading-app.herokuapp.com/orders/orderhistory?status=${filtered}`)
                .then(res => res.json())
                .catch(err => console.log(err))
                setOrderHistory(data)            
        }
        fetchData()
    },[filtered])

    const handleFiltered = (e) => {
        setFiltered(e.target.value)
    }
  return (
    <div className='p-container'>
        <table>
        <thead>
            <tr>
                <th><h1>Order History</h1>
                </th>
                <td className="view-all-btn"><a href='/orderhistory'>View All</a></td>
                <td className="custom-select">
                    <select  onChange={handleFiltered}>
                        <option value='all' >All</option>
                        <option value='open' >Open</option>
                        <option value='closed'>Closed</option>
                    </select>
                </td>  
            </tr>
            <tr>
                <th>Assets</th>
                <th>Order</th>
                <th>Quantity</th>
                <th>Status</th>
            </tr> 
        </thead>
        <tbody>
            {orderHistory.map((i) => (
                <tr key={i.id} className='o-row'>
                    <td className='symbol'>{i.symbol}</td>
                    <td>{i.type.toUpperCase()} - {i.side.toUpperCase()}
                     {(i.type === 'market' &&  ' ' )
                    || (i.type === 'limit' && 
                        <span> @ ${i.limit_price}</span>)
                    || (i.type === 'stop' &&
                        <span> @ ${i.stop_price}</span>)
                    || (i.type === 'stop_limit' &&
                        <span><br/>with limit @ ${i.limit_price} <br/>and stop price @ ${i.stop_price}</span>)
                    }
                        <br/>
                        {new Date(i.submitted_at).toLocaleTimeString('en-US',
                        {year: "numeric",month: "2-digit",day: "numeric"})}</td>
                    <td>{i.qty}</td>
                    <td><b>{i.status.toUpperCase()}</b></td>
                </tr>
            ))}
        </tbody>   
    </table>
    </div>
  )
}
export default OrderHistory