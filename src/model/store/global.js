import { observable, computed, runInAction, action } from 'mobx';
import { act } from 'react-dom/test-utils';

class Global {
    @observable tags = []
    @observable categories = []
    @observable posts = []

    @observable siteName = "BENJAMIN'S BLOG"

    @observable pageSize = 6
    @observable curPage = 0


    @observable navItems = [
        { title: 'HOME', routeUrl: '/', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header1.jpg' },
        { title: 'TAGS', routeUrl: '/tags', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header2.jpg' },
        { title: 'CATEGORIES', routeUrl: '/categories', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header3.jpg' },
        { title: 'ABOUT', routeUrl: '/about', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/blog-header4.jpg' }
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

    @computed get pages() {
        let { posts, pageSize } = this, total = posts.length
        return (total % pageSize === 0) ? total / pageSize : Math.floor(total / pageSize) + 1
    }

    @computed get curPosts() {
        let { posts, pageSize, curPage } = this, total = posts.length, pages = (total % pageSize === 0) ? total / pageSize : Math.floor(total / pageSize) + 1
        return posts.slice(curPage * pageSize, curPage !== pages - 1 ? (curPage + 1) * pageSize : total)
    }

    @action.bound
    goNewerPage() {
        this.curPage--
    }

    @action.bound
    goOlderPage() {
        this.curPage++
    }
}

export default new Global()