import React, { Component } from 'react'
import styles from './index.module.scss'
import { inject, observer } from 'mobx-react'
import { Visible, Hidden } from 'react-grid-system'
import cx from 'classnames'
import zoomTransition from './zoom.module.css'
import { CSSTransition } from 'react-transition-group'

@inject('global')
@observer
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuVisible: false
        }
    }

    toggleMenu() {
        this.setState({
            menuVisible: !this.state.menuVisible
        })
    }

    render() {
        const { siteName, navItems } = this.props.global, { menuVisible } = this.state
        return (
            <div className={styles.Header}>
                <div className={styles.toolBar}>
                    <div className={styles.siteName}>{siteName}</div>
                    <Visible md lg xl>
                        <div className={styles.navContainer}>
                            {navItems && navItems.map((navItem, index) => (
                                <div className={styles.navItem} key={index}>
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
                                <div className={styles.item} key={index}>
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

export default Header