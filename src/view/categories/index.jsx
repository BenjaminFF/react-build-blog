import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
@inject('global')
@observer
class Categories extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const { tags, categories, posts } = this.props.global
        return (
            <div>
                <div>Categories</div>
            </div>
        )
    }
}

export default Categories