import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import PortfolioPerform from './components/portfoliohistory/PortfolioPerform';
import Positions from './components/positions/Positions';
import Nav from './components/pages/nav/Nav';
import Trade from './components/trade/Trade';
import News from './components/news/News';
import OrderHistory from './components/orderhistory/OrderHistory';
import TradeConfirm from './components/trade/TradeConfirm';
import {PositionProvider} from './contexts/PosContext'
import { AcctProvider } from './contexts/AcctContext';
import Auth from './components/auth/Auth';
import { useContext } from 'react';
import { GlobalContext } from './contexts/GlobalContext';
import {PropagateLoader} from 'react-spinners'
function App() {

  const { fetchingUser, isAuth } = useContext(GlobalContext)

  return fetchingUser ? (
      <div className="loading">
        <PropagateLoader/>
      </div> 
  )
  : (
    <div className="App">
      <PositionProvider>
        <AcctProvider>
        <BrowserRouter>
        {isAuth ? <Nav/> : null}
          <div className="sections">
              <Routes>
                <Route exact path='/' element={<Auth />} />
                  <Route path='/news' element={isAuth ? <News /> : <Auth />}/>
                  <Route path='/dashboard' element={isAuth ? <Dashboard /> : <Auth />}/>
                  <Route path='/positions' element={isAuth ? <Positions/> : <Auth />} />
                  <Route path='/trade' element={isAuth ? <Trade /> : <Auth />} />
                  <Route path='/tradeconfirm' element={isAuth ? <TradeConfirm/> : <Auth />} />
                  <Route path='/orderhistory' element={isAuth ? <OrderHistory/> : <Auth/>} />
                  <Route path='/performance' element={isAuth ? <PortfolioPerform /> : <Auth />} />
              </Routes>
          </div>
          </BrowserRouter>
          </AcctProvider>
        </PositionProvider>
    </div>
  )
}

export default App;
