import React from 'react'
import me from '../me/me'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-fastclick'  // tap点击事件库
import PropTypes from 'prop-types'  // 声明上下文类型
import { /*BrowserRouter as Router, Route, Link,*/ Redirect } from 'react-router-dom'
import store from '../../redux/store'
import axios from 'axios' // ajax
/*
    CSS
*/
import './login.scss'

// 调用第三方事件库
injectTapEventPlugin()

// 登录表单
class Inp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDwon: false,
            value: ''
        }
    }

    render() {
        const { data, hasLogined, isLogin, onInpValue } = this.props,
            { type, name, icon, ph } = data,
            that = this
            
        let block = '',
            siderClass = "me-sider iconfont " + icon

        siderClass += this.state.isDwon ? ' inverse' : ''
        // 判断是否需要加下拉框
        if (hasLogined && this.state.isDwon) {
            const loginedUser = [],
                  s = window.localStorage
            
            for (let key in s) {
                if ('u' + s[key] === key) {
                    loginedUser.push(s[key])
                }
            }
            block = loginedUser.map(function (item, i) {
                return <li key={i}>
                    <p
                        onTouchEnd={() => that.insetInpValue(item, name, onInpValue)}
                    >{item}
                    </p>
                    <span
                        onTouchEnd={(e) => that.delLoginedUser(item)}
                    >X
                            </span>
                </li>
            })
            block = <ul className="down-block">{block}</ul>
        }

        const downPopIcon = <span
            className={siderClass}
            onTouchEnd={that.toggleDown} >
        </span>

        return (
            <div className="me-input-wrap">
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={ph}
                    value={that.state.value}
                    onChange={(e) => this.inpChange(e, name, onInpValue)} />
                {isLogin && downPopIcon}
                {isLogin && block}
            </div>
        )

    }

    componentDidMount() {
        // 点击其他去除弹框
        if (this.props.hasLogined) {
            document.addEventListener('click', this.setDown)
        }
    }

    componentWillUnmount() {
        // 组件移除时，去除document的touchend事件
        document.removeEventListener('click', this.setDown)
    }

    delLoginedUser = (item) => {
        delete window.localStorage.removeItem('u' + item)
    }

    insetInpValue = (item, name, onInpValue) => {
        const { toggleDown } = this
        this.setState({ value: item })
        toggleDown()
        // 改变store里的用户信息，以备上传
        onInpValue(name, item)
    }

    setDown = (e) => {
        if (e.target && (e.target.matches('span') || e.target.matches('ul') || e.target.matches('input'))) {
            return;
        }
        this.setState({ isDwon: false })
    }

    toggleDown = () => {
        this.setState({ isDwon: !this.state.isDwon })
    }

    inpChange = (e, name, onInpValue) => {
        const value = e.target.value
        this.setState({
            value: value
        })
        // 改变store里的用户信息，以备上传
        onInpValue(name, value)
    }
}
//
const InpWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Inp)

class Loginform extends React.Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            direct: false
        }
    }

    render() {
        const that = this,
              { onInpText, inpText, isLogin, name, user, password } = that.props,
              { direct } = this.state

        const data = [
                        {
                            type: 'text',
                            name: 'user',
                            icon: 'icon-xiala',
                            ph: '账号'
                        },
                        {
                            type: 'password',
                            name: 'password',
                            icon: '',
                            ph: '密码'
                        }
                    ]

        // 如果是注册，添加用户名inp
        if (!isLogin) {
            data.unshift({
                type: 'text',
                name: 'name',
                icon: '',
                ph: '用户名'
            })
        }
        // 组装inp
        const formHtml = data.map(function (item, i) {
            const hasLogined = item.type === 'text' ? true : false
            return <InpWrap
                data={item}
                key={i}
                hasLogined={hasLogined}
                onInpText={hasLogined ? onInpText : undefined}
                inpText={inpText}
                isLogin={isLogin}
            />
        })
        
        const word = this.props.isLogin ? '登录' : '注册'
        return (
            <section className="login-form">
                {formHtml}
                <span 
                    className="login-btn"
                    onTouchEnd={() => {
                        if (isLogin) {
                            that.login(user, password)
                        } else {
                            that.register(name, user, password )
                        }
                    }}
                >{word}</span>
                { direct && <Redirect to="/main" /> }
            </section>
        )
    }

    componentWillUnmount() {
        // 取消请求
        this.axiosCancelReq()
    }

    axiosCancelReq = () => {
        const CancelToken = axios.CancelToken,
              source = CancelToken.source()
        source.cancel('Operation canceled by the user.')
    }

    login = async (user, password) => {
        if ((user === '' || user === null) || (password ==='' || password === null)) {
            alert('用户名或密码不可为空')
            return false
        }

        const that = this
        this.props.onLoadingToggle()
        const response = await axios.post('http://localhost:3001/login', {
                                            user: user,
                                            password: password
                                        })
        // 设置响应
        try {
            const { code, msg, name } = response.data
            switch (code) {
                case 3: // 登陆成功
                    const { user } = that.props
                    that.setState({
                        direct: true
                    })
                    // 将登陆过的账户存入本地
                    window.localStorage.setItem('u'+user,user)
                    // 用户名存储在本地
                    window.localStorage.setItem('name', name)
                    console.log(1, window.localStorage.getItem('name'))
                    break;

                case 2: // 密码错误
                    alert(msg)
                    break;

                case 1: // 账号不存在
                    alert(msg)
                    break;

                default:
                    alert('登陆出错，请重试')
            }

            that.props.onLoadingToggle()
            
        } catch(err) {
            console.log(err, 'cuowu')
        }
    }

    register = async (name, user, password) => {
        if ((user === '' || user === null) || (password ==='' || password === null)) {
            alert('用户名或密码不可为空')
            return false
        }

        const that = this
        this.props.onLoadingToggle()
        const response = await axios.post('http://localhost:3001/register', {
                                            name: name,
                                            user: user,
                                            password: password
                                        })
        // 设置响应
        try {
            const { code, msg } = response.data
            switch (code) {
                case 2: // 注册成功
                    const { user } = that.props
                    that.setState({
                        direct: true
                    })
                    // 将登陆过的账户存入本地
                    window.localStorage.setItem('u'+user,user)
                    // 用户名存储在本地
                    window.localStorage.setItem('name', name)
                    break;

                case 1: // 账户已存在
                    alert(msg)
                    break;

                default:
                    alert('登陆出错，请重试')
            }

            that.props.onLoadingToggle()
            
        } catch(err) {
            console.log(err, 'cuowu')
        }
    }

}

// 
const LoginformWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loginform)

// 
const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(me.header)


class Main extends React.Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            isLogin: true
        }
        context.redux = props
    }

    render() {
        const { isLoading } = this.props,
            { isLogin } = this.state,
            rightWord = isLogin ? '注册' : '登录'

        return (
            <div>
                <Header
                    rightWord={rightWord}
                    isBack={false}
                    title={'登录百度云网盘'}
                    rightFn={this.switchIsLogin} />
                <img className="baidu-logo" src={require("../../img/logo.png")} alt="" />
                <LoginformWrap isLogin={isLogin} />
                <me.loading display={isLoading} />
            </div>
        )
    }

    switchIsLogin = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }
}
// 
const MainWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)


function mapStateToProps(state) {
    return state.login
}

function mapDispatchToProps(dispatch) {
    return {
        onInpValue: (name, value) => store.dispatch({ type: 'INPVALUE', name: name, value: value }),
        onLoadingToggle: () =>  store.dispatch({ type: 'TOGGLELOAD' })
    }
}

export default MainWrap
