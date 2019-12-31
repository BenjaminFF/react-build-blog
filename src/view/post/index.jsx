import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { autorun } from 'mobx'
import styles from './index.module.scss'
import { withRouter } from "react-router-dom"
import fm from 'front-matter'
import marked from 'marked'
import { Row, Col, Visible, Hidden } from 'react-grid-system'
import hljs from 'highlight.js'
@inject('global')
@observer
class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: this.props.match.params.postId
        }
    }


    componentWillMount() {
        autorun((reaction) => {
            let { postId } = this.state, { getPostContent, posts } = this.props.global
            if (posts.length >= 1) {
                getPostContent(postId)
                reaction.dispose()
            }
        })

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
        autorun(reaction => {
            let { loadingPost, postContent, posts } = this.props.global
            if (!loadingPost && posts.length >= 1) {
                let renderedMD = this.getRenderedMD(fm(postContent).body)
                this.setState({
                    renderedMD
                })
                this.hashLinkScroll()
                reaction.dispose()
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
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

    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.setState({
            scrollTop
        })
    }

    getRenderedMD(content) {
        let renderer = new marked.Renderer(), index = 1, tocArr = []
        renderer.heading = (text, level, raw) => {
            index++
            tocArr.push({ text, level, index })
            return `<h${level} id="heading${index}">
                      ${raw}
                    </h${level}>`
        }
        renderer.code = function (code, language) {
            language = language || 'js'
            return '<pre><code class="' + language + '">' +
                hljs.highlight(language, code).value +
                '</code></pre>';
        };
        let renderedMD = marked(content, {
            renderer, gfm: true
        })
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
        root.style.listStyle = 'none'
        let el = document.createElement('li'), a = document.createElement('a')
        el.style.listStyle = 'none'
        a.href = `#heading${tocArr[0].index}`
        a.style.color = 'gray'
        a.style.fontSize = '0.9rem'
        a.innerHTML = tocArr[0].text
        el.appendChild(a)
        p.appendChild(el)
        curEL = el
        for (let i = 1; i < tocArr.length; i++) {
            let el = document.createElement('li'), p = curEL.parentNode, a = document.createElement('a')
            el.style.listStyle = 'none'
            a.style.color = 'gray'
            a.style.fontSize = '0.9rem'
            a.href = `#heading${tocArr[i].index}`
            a.innerHTML = tocArr[i].text
            el.appendChild(a)
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
        document.getElementsByClassName('toc').length > 0 && document.getElementsByClassName('toc')[0].appendChild(root)
    }

    render() {
        const { renderedMD, scrollTop } = this.state
        return (
            <div className={styles.postContainer}>
                <Row style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', margin: 0 }}>
                    <Col xl={3.5} sm={0} xs={0}></Col>
                    <Col xl={5} sm={12} xs={12} style={{ position: 'relative', paddingBottom: '6rem', padding: '3rem 1rem', margin: 0, width: '100%' }}>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: renderedMD }}></div>
                        </div>
                    </Col>
                    <Col xl={3.5} sm={0} xs={0}>
                        <Visible md lg xl>
                            <div className='toc' style={{ position: scrollTop > 620 ? 'fixed' : 'relative', top: '4.5rem', borderLeft: '1px solid rgb(236, 236, 236)' }}>
                                <span style={{ fontWeight: 'bold', marginLeft: '1rem' }}>Content</span>
                            </div>
                        </Visible>
                        <Hidden md lg xl><div></div></Hidden>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Post)