import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.scss'
@inject('global')
@observer
class About extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        const { tags, categories, posts } = this.props.global
        return (
            <div>
                <div>About</div>
            </div>
        )
    }
}

export default About