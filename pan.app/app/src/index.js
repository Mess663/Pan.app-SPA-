/*
    JS & 组件
*/
import React from 'react'
import ReactDom from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './redux/store'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { /*BrowserRouter as Router, Link,*/ Route, HashRouter } from 'react-router-dom'


/*
    载入页面
*/
import main from './conponets/main/main'
import downOrUp from './conponets/downOrUp/downOrUp'
import login from './conponets/login/login'
/**
 * 业务代码
 */
class Index extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="react-div">
                    <Route exact 
                        path="/" 
                        key={0} 
                        component={login} >
                    </Route>
                    <Route 
                        path="/downOrUp" 
                        key={1}
                        component={downOrUp} >
                    </Route>
                    <Route 
                        path="/main" 
                        key={2}
                        component={main} >
                    </Route>
                </div>

                {/* <Route render={({ location }) => {
                    return (
                     )   
                }} /> */}
            </HashRouter >
        )
    }
}
const App = connect(
    // mapStateToProps,
    // mapDispatchToProps
)(Index)

// function mapStateToProps(state) {
//     return state
// }

// function mapDispatchToProps(dispatch) {
//     return {
//     }
// }

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


