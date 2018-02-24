import React from 'react'
import { connect } from 'react-redux'
import store from '../../redux/store'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import injectTapEventPlugin from 'react-fastclick'  // tap点击事件库

import me from '../me/me'

/*
    CSS
*/
import './downOrUp.scss'

// 调用第三方事件库
injectTapEventPlugin()

/* ===============
    头部
   =============== */
const Header = () => {
    return (
        <me.header
            title={'传输列表'}
            isBack={true}
        >
            <span className="more-btn iconfont icon-msnui-more"></span>
        </me.header>
    )
}

/* ===============
    内容
   =============== */
const ListTab = (props) => {
    const { downOrUp, onDownOrUp } = props
    return (
        <section className="list-tab">
            <ul>
                <li
                    className={(downOrUp === 0) ? "active" : undefined}
                    onTouchEnd={() => onDownOrUp('DOWNTAB')}
                ><p>下载列表</p></li>
                <li
                    className={(downOrUp === 1) ? "active" : undefined}
                    onTouchEnd={() => onDownOrUp('UPTAB')}
                ><p>上传列表</p></li>
            </ul>
            {(downOrUp === 0) && <p className="doc-dirname">文件下载至：/storage/ldldl/123</p>}
        </section>
    )
}
class DownloadWrap extends React.Component {
    render() {
        const { progressType, downOrUp } = this.props

        const type = downOrUp ? '上传' : '下载'

        const typeChooseP = [
            (
                <p className="downloading-p-wrap">
                    <span className="download-progress">40MB/50MB</span>
                    <span className="download-tips">暂停{type}</span>
                </p>
            ),
            (
                <p>
                    <span className="download-size">50MB</span>
                    <span className="download-time">2018-01-08 19:31:02</span>
                </p>
            )
        ]

        return (
            <div className="download-wrap">
                <p>{progressType === 0 ? '正在' + type : type + '完成'}(1)</p>
                <ul className="downloading-list">
                    <li>
                        <span className="doc-picture">DOC</span>
                        <div className="doc-info-wrap">
                            <h4>文件名</h4>
                            {typeChooseP[progressType]}
                        </div>

                        {/* 暂停icon：icon-zanting  */}
                        {progressType === 0 && <span className="iconfont icon-iconset0481 download-toogle-icon"></span>}
                    </li>
                </ul>
            </div>
        )
    }
}
// 列表切换高阶
// const DownUpList = (list) => {
//     return list.map((item, i) => {
//         return <CSSTransition
//             classNames="slide"
//             timeout={{ enter: 100, exit: 200 }}
//         >
//             <DownloadWrap
//                 progressType={0}    // 0为未完成
//                 downOrUp={item}
//             />
//             <DownloadWrap
//                 progressType={1}    // 1为已完成
//                 downOrUp={item}
//             />
//         </CSSTransition >
//     })
// }
class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0
        }
    }

    render() {
        const { onDownOrUp, downOrUp } = this.props

        return (
            <section className="search-content">
                <ListTab
                    onDownOrUp={onDownOrUp}
                    downOrUp={downOrUp}
                />
                <DownloadWrap
                    progressType={0}    // 0为未完成
                    downOrUp={downOrUp}
                />
                <DownloadWrap
                    progressType={1}    // 1为已完成
                    downOrUp={downOrUp}
                />
            </section>
        )
    }

    switchTab = (n) => {

    }
}
// connect Content
const ContentWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ContentWrap />
            </div>
        )
    }
}

// connect
function mapStateToProps(state) {
    return state.downOrUp
}

function mapDispatchToProps(dispatch) {
    return {
        onDownOrUp: (type) => store.dispatch({ type: type })
    }
}

export default App