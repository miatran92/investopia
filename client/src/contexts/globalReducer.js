//reducer

export const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
                isAuth: true
            }
        case 'RESET_USER':
            return {
                ...state,
                user: null,
                fetchingUser: false,
                isAuth: false
            }
        default:
            return state;
    }
}