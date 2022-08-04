import './TradeConfirm.css'
import {useLocation, Link} from 'react-router-dom';

function TradeConfirm() {
    const location = useLocation()
    const {symbol, qty, side, type, limit_price, stop_price, timing} = location.state;
    return (
    <div className="trade-confirm-container">
        <div className="trade-confirm-wrapper">
            <div className="trade-confirm-item">
                <b>Your order has been placed and received by investopia</b>
                <br/>
                <span>To check your order status, use 
                    <Link to='/orderhistory'> <b style={{color: 'blue', }}>Order History</b></Link>
                </span>
            </div>
            <div className="trade-confirm-item">
                <div className="confirm-items">
                    <span className='confirm-item'>Order Information</span>
                    <span className='confirm-details'>
                        <span className="confirm-detail">
                            <span>Symbol</span>
                            <span>{symbol.toUpperCase()}</span>
                        </span>
                        <span className="confirm-detail">
                            <span>Action</span>
                            <span>{side.toUpperCase()}</span>
                        </span>
                        <span className="confirm-detail">
                            <span>Quantity</span>
                            <span>{qty}</span>
                        </span>
                        <span className="confirm-detail">
                            <span>Order Type</span>
                            <span>
                                <span>{type.toUpperCase()} </span>
                                ${
                                        (type === 'limit' && limit_price) 
                                    ||  (type === 'stop' && stop_price)
                                    ||  (type === 'stop_limit' && 
                                        <span>
                                            <span>STOP ${stop_price}</span>
                                            <span>LIMIT ${limit_price}</span>
                                        </span>)
                                        }
                            </span>
                        </span>
                        <span className="confirm-detail">
                            <span>Timing</span>
                            <span>{timing.toUpperCase()}</span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="trade-confirm-item">
                <li>
                    <i className="arrow-right"></i>To check your order status, use
                    <Link to='/orderhistory'> 
                        <b style={{color: 'blue',cursor: 'pointer'}}> Order History</b>
                    </Link>
                </li>
                <Link to='/trade'>
                    <li style={{color: 'blue', cursor: 'pointer'}}>
                        <i className="arrow-right"></i> Place another ETF/Stock trade
                    </li>
                </Link>
            </div>
        </div>
    </div>
  )
}
export default TradeConfirm