import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import injectTapEventPlugin from 'react-fastclick'  // tap点击事件库
// import PropTypes from 'prop-types'  // 声明上下文类型
import { /*BrowserRouter as Router, Route,*/ Link } from 'react-router-dom'
import store from '../../redux/store'

/*
    CSS
*/
import './main.scss'

// 调用第三方事件库
injectTapEventPlugin()
/* ===============
    头部
   =============== */
const ClassifyTab = (props) => {
    const classifyArry = ['图片', '文档', '视频', 'BT种子', '音乐', '应用', '其他']

    const items = classifyArry.map((item, i) => {
        return <li key={i + 'classify-tab'}>
            <span className="tab-picture"></span>
            <span className="tab-name">{item}</span>
        </li>
    })

    return (
        <div
            className="shadow"
            onTouchEnd={(e) => {
                e.stopPropagation()
                props.onClassifyToogle()
            }}
        >
            <ul
                className="classify-tab"
                onTouchEnd={e => e.stopPropagation()}
            >
                {items}
            </ul>
        </div>
    )
}
class HeaderTab extends React.Component {
    render() {
        const iconArry = [
            {
                class: 'icon-fenlei1',
                name: '分类',
                fn: this.props.onClassifyToogle
            },
            {
                class: 'icon-icon--',
                name: '上传'
            },
            {
                class: 'icon-sort_icon',
                name: '传输列表',
                link: 'downOrUp'
            }
        ]

        const items = iconArry.map((item, i) => {
            let html = <div>
                            <span className={'iconfont tab-icon ' + item.class}></span>
                            <span className="tab-name">{item.name}</span>
                        </div>

            html = item.link ? <Link to={item.link || '/main'}>{ html }</Link> : html

            return (
                <li
                    key={i + 'content-tab'}
                    onTouchEnd={() => {
                        item.fn && item.fn()
                    }}
                >
                    { html }
                </li>
            )
        })

        return (
            <ul className="header-tab">
                {items}
            </ul>
        )
    }
}
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: null
        }
    }

    render() {
        const { classifyUp, onClassifyToogle } = this.props
        console.log('3', window.localStorage.getItem('name'))
        return (
            <header className="index-header">
                <div className="header-bar">
                    <img className="avatar" src="#" alt="" />
                    <p className="user-name">{ window.localStorage.getItem('name') }</p>
                </div>
                <HeaderTab onClassifyToogle={onClassifyToogle} />
                {classifyUp ? <ClassifyTab onClassifyToogle={onClassifyToogle} /> : ''}
            </header>
        )
    }
    componentWillUpdate() {
        this.setState({ userName: window.localStorage.getItem('name') })
    }
    componentWillMount() {
        console.log('2', window.localStorage.getItem('name'))
    }
    componentDidMount() {
        console.log('4', window.localStorage.getItem('name'))
    }
}
// connect
const HeaderWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

/* ===============
    内容区
   =============== */

class Docnew extends React.Component {
    render() {
        return (
            <div className="shadow-block">
                <div>
                    <h3>新建我文件夹</h3>
                    <div className="input-wrap">
                        <span className="doc-picture">DOC</span>
                        <input ref="docInp" type="text" name="new-doc" id="new-doc" placeholder=" 新建文件夹" autoFocus={this.props.docNewUp} />
                    </div>
                    <div className="btn-wrap">
                        <span
                            className="btn-cancel"
                            onTouchEnd={this.props.onDocNewToogle}
                        >取消</span>
                        <span className="btn-sure">创建</span>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const that = this
        // 弹出时inp获取焦点
        setTimeout(() => {
            ReactDom.findDOMNode(that.refs.docInp).focus()
        }, 50);
    }
}
class ContentList extends React.Component {
    render() {
        let arr = [
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ]

        const items = arr.map((item, i) => {
            return (
                <li key={i}>
                    <span className="doc-picture">DOC</span>
                    <div>
                        <p className="doc-title">文件文件夹名称文件夹名称文件夹名称文件夹名称文件夹名称文件夹名称夹名称</p>
                        <span className="doc-time">2017-03-15 15:00</span>
                    </div>
                </li>
            )
        })

        return (
            <ul className="content-list">
                {items}
            </ul>
        )
    }
}
const Sortblock = (props) => {
    const sortTabArr = [
        {
            name: '按文件名称排序',
            active: true
        },
        {
            name: '按时间倒序排序',
            active: false
        }
    ]

    const items = sortTabArr.map((item, i) => {
        return <li key={i + 'sort-tab'} className={item.active ? 'active' : ''}>{item.name}</li>
    })

    return (<CSSTransition
        classNames="example"
        timeout={{ enter: 100, exit: 200 }}>
        <ul className="sort-tab">
            {items}
        </ul>
    </CSSTransition>)
}
class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortUp: false
        }
    }

    render() {
        const that = this,
            { onDocNewToogle, docNewUp } = that.props

        return (
            <section className="index-content">
                <ul className="content-tab">
                    <li onTouchEnd={that.sortUp} >
                        <span className="iconfont icon-paixujiang tab-icon"></span>
                        <TransitionGroup>
                            {that.state.sortUp && Sortblock()}
                        </TransitionGroup>
                    </li>
                    <li onTouchEnd={onDocNewToogle}>
                        <span className="iconfont icon-addfile tab-icon">
                        </span>
                    </li>
                    <li>
                        <span className="iconfont icon-sousuo tab-icon"></span>
                    </li>
                </ul>
                {docNewUp && <Docnew onDocNewToogle={onDocNewToogle} docNewUp={docNewUp} />}
                <ContentList />
            </section>
        )

    }

    componentDidMount() {
        // 点击其他去除弹框
        document.addEventListener('touchstart', this.sortDown)
    }

    componentWillUnmount() {
        // 组件移除时，去除document的touchend事件
        document.removeEventListener('touchstart', this.sortDown)
    }

    sortUp = (e) => {
        this.setState({
            sortUp: true
        })
    }

    sortDown = (e) => {
        // 定点阻止事件冒泡到document
        if (e.target &&
            (e.target.matches('.content-tab li:nth-child(1)') ||
                e.target.matches('.content-tab li:nth-child(1) span'))) {
            return
        }
        this.setState({
            sortUp: false
        })
    }

    docNewUp = () => {
        const docNew = this.state.docNewUp
        this.setState({
            docNewUp: !docNew
        })
    }
}
// connect Content
const ContentWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)


/* ===============
    底部导航
   =============== */

class Footer extends React.Component {
    render() {
        const tabArr = [
            {
                class: 'icon-yunyunpan',
                name: '网盘',
                active: true
            },
            {
                class: 'icon-fenxiang',
                name: '分享'
            },
            {
                class: 'icon-yanjing',
                name: '看吧'
            },
            {
                class: 'icon-msnui-more',
                name: '更多'
            },
        ]

        const items = tabArr.map((item, i) => {
            return (
                <li key={i + 'footer-tab'}
                    className={item.active ? ' active' : ''}>
                    <span className={'iconfont tab-icon ' + item.class}></span>
                    <span className="tab-name">{item.name}</span>
                </li>
            )
        })

        return (
            <footer className="index-footer">
                <ul className="footer-tab">
                    {items}
                </ul>
            </footer>
        )
    }
}


// 主容器
class App extends React.Component {
    render() {
        return (
            <div className="flex-wrap">
                <HeaderWrap />
                <ContentWrap />
                <Footer />
            </div>
        )
    }
    
    routerWillEnter(last) {
        console.log(1111111111111111111)
    }
}

// connect
function mapStateToProps(state) {
    return state.main
}

function mapDispatchToProps(dispatch) {
    return {
        onDocNewToogle: (e) => store.dispatch({ type: 'DOCNEWTOOGLE' }),
        onClassifyToogle: () => store.dispatch({ type: 'CLASSIFYTOOGLE' }),
    }
}

export default App