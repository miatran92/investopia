import { useState } from 'react';
import './Trade.css';
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'

function Trade() {
    const { register, handleSubmit, watch, formState: { errors }} = useForm({
        mode: 'onTouched',
        defaultValues: {
            symbol: "",
            qty: '',
            side: "",
            type: "",
            time_in_force: "",
            limit_price: '', // optional,
            stop_price: '', // optional,
            client_order_id: "", // optional,
            // extended_hours: boolean, // optional,
            // order_class: string, // optional,
            // take_profit: object, // optional,
            // stop_loss: object, // optional,
            trail_price: "", // optional,
            trail_percent: "" // optional,
        }
    });
    const [review, setReview] = useState(false)

    
    const handleReview = () => { 
        setStep(step + 1)
        setReview(!review)
    }
    const handleEdit = () => {
        setStep(step - 1)
        setReview(false)
    }
    const [step, setStep] = useState(0)
    const stepTitles = ['Step 1: Enter Order', 'Step 2: Review Order', 'Step 3: Order Confirmation']

    const onSubmit = (data) => {
    //    console.log(Object.values(data))
    }

    const symbol = watch('symbol');
    const qty = watch('qty');
    const side = watch('side');
    const time_in_force = watch('time_in_force');
    const type = watch('type');
    const limit_price = watch('limit_price');
    const stop_price = watch('stop_price');

    // if input is invalid, disable review button

    const isValid = (symbol && qty && side && time_in_force)  &&  ((type === 'market') 
    || (type === 'limit' && limit_price)
    || (type === 'stop' && stop_price)
    || (type === 'stop_limit' && stop_price && limit_price))

        const handlePlaceOrder = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({symbol, qty, side, time_in_force, type, limit_price, stop_price})
        }
          await fetch('https://investopia-paper-trading-app.herokuapp.com/orders', options)
                .then(async (res) => {
                    if(!res.ok){
                        const text =  await res.json()
                        console.log(text.message)
                        throw Error(text.message)
                        // ('Something went wrong, your order did not go through. Please try again later')
                    } return res.json()
                })
                .then(data => console.log(data)) 
                .catch(err => alert(err))
            }
  return (
    
    <section className="trade-container">
           {/* "handleSubmit" will validate inputs before invoking "onSubmit"  */}
        <div className="steps">
            {stepTitles[step]}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="trade-items">
            <div className="side-item">
                <label className="radio-button">
                    <input type="radio" value='buy' name="side"
                    {...register('side', {required: 'Please select action'}
                    )}/>
                    <span>Buy</span>
                </label>

                <label className="radio-button">
                    <input type="radio" value='sell' name="side"
                    {...register('side', {required: 'Please select action'})}/>
                    <span>Sell</span>
                </label>
                <div>
                {errors.side && <span className='err'>{errors.side.message}</span>}
                </div>
            </div>
            <div className="trade-item">
                <span>Symbol</span>
                <input 
                className='search-symbol'type='text' placeholder='Enter here' 
                {...register("symbol", { required: 'Please enter a valid symbol', 
                pattern: {value: /^[A-Za-z]+$/i, message:'Please enter a valid symbol'} })}/>
                {errors.symbol && <span className='err'>{errors.symbol.message}</span>}
            </div>
            <div className="trade-item">
                <div className='custom-select'>
                    <span>Order Type</span>
                    <select name='type' {...register('type', {required: 'Order Type is required'})}>
                        <option value=''>-- Select Order Type -- </option>
                        <option value='market'>Market</option>
                        <option value='limit'>Limit</option>
                        <option value='stop'>Stop</option>
                        <option value='stop_limit'>Stop Limit</option>
                    </select>
                    {errors.type && <span className='err'>{errors.type.message}</span>}
                    <div>
                        {type === 'limit' && (
                        <div>
                            <input className='search-symbol' type='number' placeholder='Enter Limit Price' name='limit_price' 
                            {...register('limit_price', {required: 'Limit Price is required'})}/>
                            {errors.limit_price && <span className='err'>{errors.limit_price.message}</span>}
                        </div>    
                        )}
                        { type === 'stop' && (
                        <div><input className='search-symbol' type='number' placeholder='Enter Stop Price'name='stop_price' 
                            {...register('stop_price', {required: 'Stop Price is required'})}/>
                            {errors.stop_price && <span className='err'>{errors.stop_price.message}</span>} 
                        </div>
                        )}
                        { type === 'stop_limit' && (
                            <div>  
                            <input className='search-symbol' type='tel' placeholder='Enter Limit Price' name='limit_price' 
                                {...register('limit_price', {required: 'Limit Price is required'})}/>
                                {errors.limit_price && <span className='err'>{errors.limit_price.message}</span>}
                                <input className='search-symbol' type='number' placeholder='Enter Stop Price'name='stop_price' 
                                {...register('stop_price', {required: 'Stop Price is required'})}/>
                                {errors.stop_price && <span className='err'>{errors.stop_price.message}</span>}
                            </div> 
                        )}
                    </div>
                </div>
            </div>
            <div className="trade-item">
                <span>Quantity</span>
                <input className='search-symbol' type='tel' placeholder='Quantity of shares' name='qty'
                {...register('qty', {required: 'Quantity is required'})} />
                {errors.qty && <span className='err'>{errors.qty.message}</span>}
            </div>
            <div className="trade-item">
                <div className='custom-select'>
                    <span>Time In Force</span>
                    <select name='time_in_force'{...register('time_in_force', {required: 'Timing is required'})}>
                        <option value=''>--Timing--</option>
                        <option value='day'>Day</option>
                        <option value='gtc'>GTC - Good Til Cancel</option>
                        <option value='ioc'>IOC - Immidiate Or Cancel</option>
                        <option value='opg'>OPG - At The Open</option>
                    </select>
                    {errors.time_in_force && <span className='err'>{errors.time_in_force.message}</span>}

                </div>
            </div>
            <input 
            disabled={!isValid} 
            className={review ? 'btn inactive' : 'btn'}
            type='submit' value='Review Order' 
            onClick={handleReview}/>
            {review 
            && <div className='msg-container'>
                <div>Are you sure you want to place this order?</div>
                <span><b>{type.toUpperCase()} {side.toUpperCase()}</b> for <b>{qty}</b> shares of <b>{symbol.toUpperCase()}</b></span><br/>
                <span>If so, press <b> Confirm Order</b> to place your trade</span>
                <div className="btns">
                    <button onClick={handleEdit}>Edit</button>
                    <Link to='/tradeconfirm'
                        state= {{symbol: symbol, 
                                qty: qty, 
                                side: side, 
                                type: type, 
                                limit_price: limit_price,
                                stop_price: stop_price,
                                timing: time_in_force,
                               }}
                    >
                        <button onClick={handlePlaceOrder}>Confirm Order</button>
                    </Link>
                </div>
            </div>}
        </form>
    </section>
  )
}
export default Trade
   
