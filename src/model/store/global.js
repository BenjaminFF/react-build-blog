import { observable, computed, runInAction, action } from 'mobx';
import { act } from 'react-dom/test-utils';

class Global {
    @observable tags = []
    @observable categories = []
    @observable posts = []

    @observable siteName = "BENJAMIN'S BLOG"

    @observable navItems = [
        { title: 'HOME', routeUrl: '/', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header1.jpg' },
        { title: 'TAGS', routeUrl: '/tags', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header2.jpg' },
        { title: 'CATEGORIES', routeUrl: '/categories', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header3.jpg' },
        { title: 'ABOUT', routeUrl: '/about', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header4.jpg' }
    ]

    @observable pageSize = 5

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