import React, { Component } from 'react'
import styles from './index.module.scss'
import { ScreenClassRender } from 'react-grid-system'
import { CSSTransition } from 'react-transition-group'
import fadeTransition from './fadeTransition.module.css'

class Rocket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rocketVisible: false
        }
    }

    componentWillMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.setState({
            rocketVisible: scrollTop > 700
        })
    }

    scrollToTop() {
        window.scrollTo(0, 0)
    }

    render() {
        const { rocketVisible } = this.state
        return (
            <CSSTransition timeout={200} in={rocketVisible} unmountOnExit classNames={fadeTransition}>
                <ScreenClassRender render={screenClass => (
                    <div style={{ right: ['md', 'xl', 'lg'].includes(screenClass) ? '20rem' : '1rem' }} className={styles.rocket} onClick={this.scrollToTop.bind(this)}>
                        <i className="iconfont be-rocket">
                        </i>
                    </div>
                )} />
            </CSSTransition>
        )
    }
}

export default Rocket