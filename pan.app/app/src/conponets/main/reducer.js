// main

// redux 定义
const initialState = {
    docNewUp: false,
    classifyUp: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DOCNEWTOOGLE': return Object.assign({}, state, {
            docNewUp: !state.docNewUp
        })

        case 'CLASSIFYTOOGLE': return Object.assign({}, state, {
            classifyUp: !state.classifyUp
        })

        default: return state
    }
}

export default reducer