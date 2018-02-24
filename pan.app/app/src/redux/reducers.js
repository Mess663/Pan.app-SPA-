import { combineReducers } from 'redux'

// 引入各个页面的reducer
import login from '../conponets/login/reducer'
import main from '../conponets/main/reducer'
import downOrUp from '../conponets/downOrUp/reducer'


export default combineReducers({
    login: login,
    main: main,
    downOrUp: downOrUp
})