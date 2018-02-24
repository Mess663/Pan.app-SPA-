import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'  // 安装redux-devtools-extension的可视化工具。
import reducers from './reducers'   // 所有reducer

// 将reducer放进store配置里，并配置开发工具
const store = createStore(
    reducers,
    composeWithDevTools()
)

export default store