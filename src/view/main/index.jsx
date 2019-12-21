import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
import Header from '@components/Header'
@inject('global')
@observer
class Main extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        
    }

    render() {
        const { tags, categories, posts } = this.props.global
        return (
            <div>
                <Header></Header>
                <div>
                    {posts && posts.map((post, index) => (
                        <div key={index}>
                            <p>{post.url}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Main