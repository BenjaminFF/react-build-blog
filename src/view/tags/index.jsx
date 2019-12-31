import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import { Row, Col } from 'react-grid-system'
import _ from 'lodash'
@inject('global')
@observer
class Tags extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        const { tags, tagedPosts } = this.props.global
        return (
            <div style={{ width: '100%', padding: '1rem 0' }}>
                <Row style={{ width: '100%', margin: 0 }}>
                    <Col xl={3.5} sm={0} xs={0}>
                    </Col>
                    <Col xl={5} sm={12} xs={12}>
                        <div className={styles.tags}>
                            {tags && tags.map((tag, index) => (
                                <p className={styles.tag} key={index}>{tag}</p>
                            ))}
                        </div>
                        <div className={styles.tagedPosts}>
                            {
                                tagedPosts && _.shuffle(tagedPosts).map((item, index) => (
                                    <div key={index}>
                                        <div className={styles.tag}>
                                            <i className="iconfont be-tag" style={{ marginRight: '0.5rem' }}></i>{item.tag}
                                        </div>
                                        {
                                            item && item.posts.map((post, index) => (
                                                <div key={index} className={styles.postContainer}>
                                                    <div className={styles.title}>{post.title}</div>
                                                    <div className={styles.discription}>{post.description}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                    <Col xl={3.5} sm={0} xs={0}>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default Tags