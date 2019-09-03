const fs = require('fs')

const moveFile = (path) => {
    const pathArray = path.split('/')
    const lastItem = pathArray.length - 1
    const fileName = pathArray[lastItem]
    pathArray.splice(lastItem, 1)
    const newp = pathArray.join('/')
    const newPath = `${newp}/public/tickets/${fileName}`
    let good = false
    fs.rename(path, newPath, (error) => {
        if (error) good = false
        good = true
    })
    return good
}

module.exports = moveFile