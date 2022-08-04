import { useState, useContext } from 'react';
import './Auth.css';
import {  useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';


function Auth() {
    let navigate = useNavigate()
    const {getCurrentUser} = useContext(GlobalContext)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
       console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
            const response = await fetch('https://investopia-paper-trading-app.herokuapp.com/auth/login', {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if(!response.ok){
                //get error msg
                const error = ((data && data.message) || (data.details[0] && data.details[0].message)) 
                console.log(error)
                setError(error)
            } else {
                setError('')
                getCurrentUser()
                .then(navigate('/dashboard'))
                .then(console.log('data', data))
            }
    }
  return (
    <div className="authContainer">
        <div className="authWrapper">
            <div className="loginHeader">
                <h1>Investopia</h1>
                <span>Login to your account</span>
            </div>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="inputItem">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' onChange={handleChange}/>
                </div>
                <div className="inputItem">
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' onChange={handleChange}/>
                </div>
                <div className="inputItem">
                    <button className='loginBtn'>Login</button>
                    <span>Demo account: test123@gmail.com / pw: test123</span>
                </div>
                {error && <div style={{color:'red'}}>{error}</div>}
            </form>
            <div className="loginFooter">
                <span><b>Powered by Alpaca API</b>
                <br/><i>**Disclaimer: All Money in this app is virtual/fake. 
                You will not actually own the equities purchased.</i></span>
            </div>
        </div>
    </div>
  )
}
export default Auth