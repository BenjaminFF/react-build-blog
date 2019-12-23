import React, { Component } from 'react'
import styles from './index.module.scss'
import { inject, observer } from 'mobx-react'
import { Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import zoomTransition from './zoom.module.css'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from "react-router-dom"

@inject('global')
@observer
class Header extends Component {
    constructor(props) {
        super(props)
        let { history, global } = this.props, imgUrl = ""
        global.navItems.forEach((navItem) => {
            if (navItem.routeUrl === history.location.pathname) imgUrl = navItem.imgUrl
        })
        this.state = {
            imgUrl,
            scrollTop: 0,
            menuVisible: false
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }
    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.setState({
            scrollTop
        })
    }

    toggleMenu() {
        this.setState({
            menuVisible: !this.state.menuVisible
        })
    }

    pushLink(url) {
        this.props.history.push(url)
    }

    render() {
        const { siteName, navItems } = this.props.global, { menuVisible, imgUrl, scrollTop } = this.state
        return (
            <ScreenClassRender render={screenClass => (
                <div className={styles.Header} style={{ height: ['md', 'xl', 'lg'].includes(screenClass) ? '40rem' : '20rem', backgroundImage: `url("${imgUrl}")` }}>
                    <div className={styles.toolBar} style={{
                        backgroundColor: `rgba(255, 255, 255, ${scrollTop / 1000})`, color: `rgb(${(1 - scrollTop / 500) * 255}, ${(1 - scrollTop / 500) * 255}, ${(1 - scrollTop / 500) * 255}`,
                        borderBottom: `1px solid rgba(211, 211, 211, ${-0.2 + scrollTop / 1000})`
                    }}>
                        <div className={styles.siteName}>{siteName}</div>
                        <Visible md lg xl>
                            <div className={styles.navContainer}>
                                {navItems && navItems.map((navItem, index) => (
                                    <div className={styles.navItem} key={index} onClick={this.pushLink.bind(this, navItem.routeUrl)}>
                                        {navItem.title}
                                    </div>
                                ))}
                            </div>
                        </Visible>
                        <Hidden md lg xl>
                            <i className="iconfont be-menu" style={{
                                fontSize: '1.2rem', cursor: 'pointer', color: 'white', marginRight: '-1rem', padding: '1rem',
                                color: `rgb(${(1 - scrollTop / 500) * 255}, ${(1 - scrollTop / 500) * 255}, ${(1 - scrollTop / 500) * 255}`
                            }}
                                onClick={() => this.toggleMenu()}>
                            </i>
                        </Hidden>
                    </div>
                    <Visible xs sm>
                        <CSSTransition classNames={zoomTransition} timeout={200} in={menuVisible} unmountOnExit>
                            <div className={styles.collapseBar}>
                                {navItems && navItems.map((navItem, index) => (
                                    <div className={styles.item} key={index} onClick={this.pushLink.bind(this, navItem.routeUrl)}>
                                        {navItem.title}
                                    </div>
                                ))}
                            </div>
                        </CSSTransition>
                    </Visible>
                    <Hidden xs sm><div></div></Hidden>
                </ div >
            )}>
            </ ScreenClassRender>
        )
    }
}

export default withRouter(Header)