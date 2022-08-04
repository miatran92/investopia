import './AccountDetails.css';
import AcctContext from '../../contexts/AcctContext';
import {useContext} from 'react';

function AccountDetails() {
  const {acctData} = useContext(AcctContext)

  return (
    <div className='account-container'>
        <div className="account-wrapper">
        <div className="a-items">
            <div className="a-left">
              <div className="a-item">
                <h5>Buying Power</h5>
                <span>${Number(acctData.buying_power).toLocaleString()}</span>
              </div>
              <div className="a-item">
                <h5>Portfolio Value</h5>
                <span>${Number(acctData.portfolio_value).toLocaleString()}</span>
              </div>
            </div>
            <div className="a-right">
              <div className="a-item">
                <h5>Long Market Value</h5>
                <span>${Number(acctData.long_market_value).toLocaleString()}</span>
              </div>
              <div className="a-item">
                <h5>Cash</h5>
                <span>${Number(acctData.cash).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
  export default AccountDetails