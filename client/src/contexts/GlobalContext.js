import { createContext, useEffect, useReducer } from 'react';
import { globalReducer } from './globalReducer'

const initialState = {
    user: null,
    fetchingUser: true,
    isAuth: false
}

export const GlobalContext = createContext()
export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(globalReducer, initialState)

    useEffect(() => {
        getCurrentUser();
        console.log('useffect ran')
    }, [])

    //

    //GET CURRENT USER
    const getCurrentUser = async () => {
        try {
                const response = await fetch('https://investopia-paper-trading-app.herokuapp.com/auth/current', 
                {
                    method: 'GET',
                    credentials: 'include',
                    
            })
            const data = await response.json()
            console.log('get current user ran, response', response)
            console.log('get current user ran, data', data)

            if(data.message){
                dispatch({
                    type:'RESET_USER'
                })
                console.log(data.message)
               
            } else {
                dispatch({
                    type: 'SET_USER',
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await fetch('https://investopia-paper-trading-app.herokuapp.com/auth/logout', {
            credentials: 'include',
            mode: 'cors'
            });
            dispatch({ type: 'RESET_USER'})
        } catch (error) {
            console.log(error)
            dispatch({ type: 'RESET_USER'})
        }
        

    }
    return (
        <GlobalContext.Provider value={{
            ...state,
            getCurrentUser,
            logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

