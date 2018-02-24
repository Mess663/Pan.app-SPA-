
// login

// redux 定义
const initialState = {
    inpText: undefined,
    name: '',
    user: null,
    password: null,
    isLoading: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INPVALUE': return Object.assign({}, state, {
            [action.name]: action.value
        })
        case 'TOGGLELOAD': return Object.assign({}, state, {
            isLoading: !state.isLoading
        })
        default: return state
    }
}

export default reducer