import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import Header from '@components/Header'
import { withRouter } from "react-router-dom"
import fm from 'front-matter'
import marked from 'marked'
import { Row, Col } from 'react-grid-system'
@inject('global')
@observer
class Post extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.history)
        this.state = {
            postUrl: this.props.history.location.pathname

        }
    }


    componentWillMount() {
        let { postUrl } = this.state
        console.log('/posts' + postUrl.split('post')[1] + '.md')
        fetch('/posts' + postUrl.split('post')[1] + '.md').then((res) => res.text()).then((data) => {
            this.setState({
                postContent: fm(data).body
            })
        })
    }

    componentDidMount() {
        this.hashLinkScroll()

    }

    hashLinkScroll() {
        const { hash } = window.location
        if (hash !== '') {
            // Push onto callback queue so it runs after the DOM is updated,
            // this is required when navigating from a different page so that
            // the element is rendered on the page before trying to getElementById.
            setTimeout(() => {
                const id = hash.replace('#', '')
                const element = document.getElementById(id)
                if (element) element.scrollIntoView()
            }, 10)
        }
    }

    getRenderedMD(content) {
        let renderer = new marked.Renderer(), index = 1, tocArr = []
        renderer.heading = (text, level, raw) => {
            index++
            tocArr.push({ text, level, index })
            return `<h${level} id="h${index}">
                      ${raw}
                    </h${level}>`
        }
        let renderedMD = marked(content, { renderer })
        this.renderToc(tocArr)
        return renderedMD
    }

    renderToc(tocArr) {
        let root = document.createElement('ul'), p = root, curEL
        for (let i = 0; i < tocArr[0].level - 1; i++) {
            let el = document.createElement('ul')
            p.appendChild(el)
            p = el
        }
        let el = document.createElement('li')
        el.innerHTML = tocArr[0].text
        p.appendChild(el)
        curEL = el
        for (let i = 1; i < tocArr.length; i++) {
            console.log(tocArr[i].level)
            let el = document.createElement('li'), p = curEL.parentNode
            el.innerHTML = tocArr[i].text
            if (tocArr[i].level > tocArr[i - 1].level) {
                let levelGap = tocArr[i].level - tocArr[i - 1].level, tp = curEL
                while (levelGap-- >= 1) {
                    let el = document.createElement('ul')
                    tp.appendChild(el)
                    tp = el
                }
                p = tp
            }
            if (tocArr[i].level < tocArr[i - 1].level) {
                let levelGap = tocArr[i - 1].level - tocArr[i].level
                while (levelGap-- >= 1) {
                    p = p.tagName === 'LI' ? p.parentNode.parentNode : p.parentNode
                }
            }
            p.appendChild(el)
            curEL = el
        }

        document.getElementsByClassName('toc')[0].appendChild(root)
    }

    render() {
        const { postContent } = this.state
        return (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Header></Header>
                <Row style={{ width: '100%' }}>
                    <Col>
                        <div>
                            {postContent && <div dangerouslySetInnerHTML={{ __html: this.getRenderedMD(postContent) }}></div>}
                        </div>
                    </Col>
                    <Col>
                        <div className='toc'></div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default withRouter(Post)