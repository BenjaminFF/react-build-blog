import React, { Component } from 'react'
import styles from './index.module.scss'
import { inject, observer } from 'mobx-react'
import { Visible, Hidden, ScreenClassRender } from 'react-grid-system'
import zoomTransition from './zoom.module.css'
import slideVertical from './slideVertical.module.css'
import { CSSTransition } from 'react-transition-group'
import { withRouter } from "react-router-dom"

@inject('global')
@observer
class Header extends Component {
    constructor(props) {
        super(props)

        let { location, global, match } = this.props, imgUrl = "", { navItems, posts, imgUrls } = global, { pathname } = location, { postId } = match.params

        navItems.forEach((navItem) => {
            if (navItem.routeUrl === pathname) imgUrl = navItem.imgUrl
        })

        imgUrl && posts.forEach((post) => {
            if (post.id === postId) imgUrl = post.image
        })

        imgUrl = imgUrl || imgUrls[Math.floor(imgUrls.length * Math.random())]
        this.state = {
            imgUrl,
            preScrollTop: 0,
            menuVisible: false,
            toolBarVisible: false
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentDidMount() {
        setTimeout(() => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            if (scrollTop < 10) {
                this.setState({
                    toolBarVisible: true
                })
            }
        }, 20)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            { preScrollTop, menuVisible } = this.state
        this.setState({
            toolBarVisible: scrollTop < preScrollTop || scrollTop < 10,
            menuVisible: scrollTop < preScrollTop && menuVisible ? false : menuVisible,
            preScrollTop: scrollTop
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
        const { siteName, navItems } = this.props.global, { menuVisible, imgUrl, preScrollTop, toolBarVisible } = this.state
        return (
            <ScreenClassRender render={screenClass => (
                <div className={styles.Header} style={{ height: ['md', 'xl', 'lg'].includes(screenClass) ? '40rem' : '20rem', backgroundImage: `url("${imgUrl}")` }}>
                    <CSSTransition classNames={slideVertical} timeout={preScrollTop > 10 ? 200 : 0} in={toolBarVisible} unmountOnExit>
                        < div className={styles.toolBar} style={{
                            backgroundColor: `rgba(255, 255, 255, ${preScrollTop / 2000})`,
                            borderBottom: `1px solid rgba(211, 211, 211, ${-0.2 + preScrollTop / 1000})`,
                            color: `rgb(${(1 - preScrollTop / 500) * 255}, ${(1 - preScrollTop / 500) * 255}, ${(1 - preScrollTop / 500) * 255}`
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
                                    color: `rgb(${(1 - preScrollTop / 500) * 255}, ${(1 - preScrollTop / 500) * 255}, ${(1 - preScrollTop / 500) * 255}`
                                }}
                                    onClick={() => this.toggleMenu()}>
                                </i>
                            </Hidden>
                        </div>
                    </CSSTransition>
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
                </ div>
            )}>
            </ScreenClassRender>
        )
    }
}

export default withRouter(Header)