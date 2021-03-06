import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import { Row, Col } from 'react-grid-system'
import { withRouter } from "react-router-dom"
@inject('global')
@observer
class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        window.scrollTo(0, 0)
    }

    pushLink(pathname, e) {
        this.props.history.push({ pathname })
        e.stopPropagation()
    }

    render() {
        const { tags, categories, posts, curPosts, pages, curPage, goNewerPage, goOlderPage } = this.props.global
        return (
            <div style={{ width: '100%' }}>
                <Row className={styles.container} style={{ margin: 0 }}>
                    <Col xl={3} sm={0} xs={0}>
                    </Col>
                    <Col xl={4.5} sm={12} xs={12} style={{ padding: '0 2rem', boxSizing: 'border-box' }}>
                        {posts && curPosts.map((post, index) => (
                            <div key={index} className={styles.post} onClick={this.pushLink.bind(this, '/post/' + post.id)}>
                                <div className={styles.title}>{post.title}</div>
                                <div className={styles.description}>{post.description}</div>
                                <div className={styles.date}>Posted on {post.date}</div>
                                <div className={styles.tags}>{post.tags && post.tags.map((tag, index) => (
                                    <p className={styles.tag} key={index} onClick={this.pushLink.bind(this, '/tags/#' + encodeURIComponent(tag))}>{tag}</p>
                                ))}</div>
                            </div>
                        ))}
                        <div className={styles.bottomPaging}>
                            {posts && curPage !== 0 && <div className={styles.button} style={{ position: 'absolute', left: 0 }} onClick={goNewerPage}>
                                <i className="iconfont be-arrow-right" style={{ transform: 'rotate(180deg)', marginRight: '0.2rem' }}>
                                </i>
                                <span>NEWER POST</span>
                            </div>}

                            {posts && curPage !== pages - 1 && <div className={styles.button} style={{ position: 'absolute', right: 0 }} onClick={goOlderPage}>
                                <span>OLDER POST</span>
                                <i className="iconfont be-arrow-right" style={{ marginLeft: '0.2rem' }}>
                                </i>
                            </div>}
                        </div>
                    </Col>
                    <Col xl={1.5} sm={12} xs={12} style={{ marginTop: '2.2rem', padding: '0 1rem', boxSizing: 'border-box' }}>
                        <div style={{ color: 'gray', marginBottom: '0.5rem', fontWeight: 'bold' }}>TAGS</div>
                        <div className={styles.tags}>{tags && tags.map((tag, index) => (
                            <p className={styles.tag} key={index} onClick={this.pushLink.bind(this, '/tags/#' + encodeURIComponent(tag))}>{tag}</p>
                        ))}
                        </div>
                        <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray', marginTop: '2rem' }}></div>
                        {/* <div style={{ color: 'gray', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>CATEGORIES</div>
                        <ul className={styles.categories}>{categories && categories.map((item, index) => (
                            <li className={styles.category} key={index}>{item}</li>
                        ))}
                        </ul> */}
                        {/* <div style={{ width: '100%', height: '1px', backgroundColor: 'lightgray', marginTop: '2rem' }}></div> */}
                    </Col>
                    <Col xl={3} sm={0} xs={0}>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default withRouter(Home)