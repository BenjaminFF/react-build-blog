let fs = require('fs')
fm = require('front-matter')
let path = require('path')

let filePath = path.resolve('./public/posts')

//调用文件遍历方法
let filePaths = []
getReversedFilePaths(filePath)
filePaths.forEach((path) => {
    let url = "." + path.split('public')[1].replace(/\\/g, '/')
    console.log(url)
})

fs.readFile(filePaths[6], 'utf8', function (err, data) {
    if (err) throw err

    var content = fm(data)

    console.log(content)
})

// readMultipleFiles(new Set(filePaths)).subscribe({
//     next(data) {
//         var content = fm(data)
//         console.log(content)
//     },
//     complete() {
//         console.log('Successfully read all files.');
//     }
// })




function getReversedFilePaths(filePath) {
    //根据文件路径读取文件，返回文件列表
    let files = fs.readdirSync(filePath)
    files.forEach((filename) => {
        let filedir = path.join(filePath, filename)
        let stats = fs.statSync(filedir)
        let isFile = stats.isFile()
        let isDir = stats.isDirectory()
        if (isFile) {
            filePaths.push(filedir)
        }
        if (isDir) {
            getReversedFilePaths(filedir)
        }
    })
}