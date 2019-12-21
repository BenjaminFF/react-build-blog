import React, { Component } from 'react'
import styles from './index.module.scss'
import { inject, observer } from 'mobx-react'
import { Visible, Hidden } from 'react-grid-system'
import cx from 'classnames'
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
            menuVisible: false
        }
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
        const { siteName, navItems } = this.props.global, { menuVisible, imgUrl } = this.state
        return (
            <div className={styles.Header} style={{ backgroundImage: `url("${imgUrl}")` }}>
                <div className={styles.toolBar}>
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
                        <i className="iconfont be-menu" style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'white', marginRight: '-1rem', padding: '1rem' }}
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
            </div >
        )
    }
}

export default withRouter(Header)