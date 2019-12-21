import { observable, computed, runInAction, action } from 'mobx';
import { act } from 'react-dom/test-utils';

class Global {
    @observable tags = []
    @observable categories = []

    @observable posts = []

    @observable siteName = "BENJAMIN'S BLOG"

    @observable navItems = [
        { title: 'HOME', routeUrl: '', imgUrl: '' },
        { title: 'TAGS', routeUrl: '', imgUrl: '' },
        { title: 'CATEGORIES', routeUrl: '', imgUrl: '' },
        { title: 'ABOUT', routeUrl: '', imgUrl: '' }
    ]

    constructor() {
        fetch('./db.json').then((res) => res.json()).then((jsonData) => {
            this.init(jsonData)
        })
    }

    @action.bound
    init(jsonData) {
        let { mCategories, mTags, posts } = jsonData
        this.posts = posts
        this.tags = mTags
        this.categories = mCategories
    }
}

export default new Global()