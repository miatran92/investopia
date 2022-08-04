import './Positions.css';
import { PositionsContext } from '../../contexts/PosContext';
import {useContext} from 'react'

function Positions() {
    const {pos} = useContext(PositionsContext)  
  return (
              <div className='p-container'>
              <table>
                  <thead>
                    <tr>
                      <th><h1>Positions</h1></th>
                      <td className='view-all-btn'><a href='/orderhistory'>View All</a></td>
                    </tr>
                    <tr>
                      <th>Asset</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Market Value</th>
                      <th>P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                      {pos.map(i => 
                    <tr key={i.asset_id}>
                      <td className='symbol'>{i.symbol}</td>
                      <td>${(Number((parseFloat(i.current_price)).toFixed(1)).toLocaleString())}</td>
                      <td>{i.qty}</td>
                      <td>${(Number((parseFloat(i.current_price*i.qty)).toFixed(2)).toLocaleString())}</td>
                      <td className={i.current_price*i.qty - i.cost_basis < 0 ? ' pl red': 'pl green'}>
                        ${(Number((parseFloat(i.current_price*i.qty - i.cost_basis)).toFixed(2)).toLocaleString())}</td>
                    </tr>
              )}
              </tbody>
              </table>
    </div>
  )
}
export default Positions