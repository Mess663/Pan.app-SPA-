/*

一些常用组件的JS 用react封装

*/

/*
    JS & 组件
*/
import React from 'react' 
// import history from 'history/createBrowserHistory' 
import injectTapEventPlugin from 'react-fastclick'  // tap点击事件库
import PropTypes from 'prop-types' 

// 调用第三方事件库
injectTapEventPlugin()
/**
 * Header 头部 ： 必需配置 title(标题)、isBack(是否有返回键)；选择配备rightword(右侧按钮文字)、fn(右侧按钮触发函数)、children(右侧代替按钮)
 */
class Header extends React.Component {
    声明上下文type才能获取从context中获取store
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    render() {
        const { rightFn, rightWord, isBack, title, children } = this.props,
              history = this.context.router.history
        return (
            <header className="me-header">
                <span 
                    className={isBack ? "me-back iconfont icon-fanhui" : 'displayHide'}
                    onTouchEnd={() => history.goBack()}
                ></span>
                { title && <p className="me-h">{title}</p> }
                { children || <span className="me-other-btn" onClick={rightFn}>{rightWord}</span> }
            </header>
        )
    }
}

class Loading extends React.Component {
    render() {
        const { display } = this.props,
              displayClass = display ? 'me-loading-show' : 'me-loading-hide'
        return (
            <section className={"me-loading-wrap " + displayClass} >
                <div>
                    <span className="icon-jiazai me-loading iconfont"></span>
                </div>
            </section>
        )
    } 
}

let me = {
    header: Header,
    loading: Loading
}

export default me 