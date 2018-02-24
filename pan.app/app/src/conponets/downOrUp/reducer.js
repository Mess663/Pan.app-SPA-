// search

// redux 定义
const initialState = {
    downOrUp: 0,    //0是下载，1是上传
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DOWNTAB': return Object.assign({}, state, {
            downOrUp: 0
        })

        case 'UPTAB': return Object.assign({}, state, {
            downOrUp: 1
        })

        default: return state
    }
}

export default reducer