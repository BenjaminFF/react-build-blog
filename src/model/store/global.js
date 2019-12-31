import { observable, computed, action } from 'mobx'

class Global {
    @observable tags = []
    @observable categories = []
    @observable posts = []

    @observable siteName = "BENJAMIN'S BLOG"

    @observable pageSize = 5
    @observable curPage = 0
    @observable postContent = ''
    @observable loadingPost = true


    @observable navItems = [
        { title: 'HOME', routeUrl: '/', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure1.jpg' },
        { title: 'TAGS', routeUrl: '/tags', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure2.jpg' },
        { title: 'CATEGORIES', routeUrl: '/categories', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure3.jpg' },
        { title: 'ABOUT', routeUrl: '/about', imgUrl: 'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure4.jpg' }
    ]

    @observable imgUrls = [
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure1.jpg',
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure2.jpg',
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure3.jpg',
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure4.jpg',
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure5.jpg',
        'https://raw.githubusercontent.com/BenjaminFF/picbed/master/imgs/wide_figure6.jpg'
    ]

    constructor() {
        fetch('/db.json').then((res) => res.json()).then((jsonData) => {
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

    @computed get tagedPosts() {
        let { posts, tags } = this
        let tagedPosts = []
        tags.forEach((tag) => {
            tagedPosts.push({
                tag: tag,
                posts: posts.filter((post) => post.tags.filter((mTag) => mTag === tag).length > 0)
            })
        })
        return tagedPosts
    }

    @action.bound
    goNewerPage() {
        this.curPage--
    }

    @action.bound
    goOlderPage() {
        this.curPage++
    }

    @action.bound
    getPostContent(postId) {
        this.loadingPost = true
        let postUrl = this.posts.filter((post) => post.id === postId)[0].url
        fetch(postUrl, { mode: 'cors' }).then((res) => res.text()).then((data) => {
            this.postContent = data
            this.loadingPost = false
        })
    }
}

export default new Global()