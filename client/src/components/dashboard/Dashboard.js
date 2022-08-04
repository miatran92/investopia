import './Dashboard.css'
import React, { useContext } from 'react'
import Positions from '../positions/Positions'
import OrderHistory from '../orderhistory/OrderHistory'
import AccountDetails from '../accountdetails/AccountDetails'
import Trade from '../trade/Trade'
import DoughnutChart from '../charts/DoughnutChart';
import  {PositionsContext}  from '../../contexts/PosContext';
import AcctContext from '../../contexts/AcctContext'

function Dashboard() {
  const {posChartData, options} = useContext(PositionsContext)
  const {acctChartData} = useContext(AcctContext)

  return (
    <div className='dashboard'>
        <AccountDetails/>
        <div className='chart-container'>
          <DoughnutChart data={posChartData} options={options}/>
          <DoughnutChart data={acctChartData} options={options}/>
        </div>
        <div className='d-item'>
          <Positions/>
        </div>
        <div className='d-item'>
          <OrderHistory/>
        </div>
        <div className='d-item'>
          <Trade/>
        </div>
    </div>
  )
}

export default Dashboard