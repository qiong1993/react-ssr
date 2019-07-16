const getHashPath = (url) => {
    const a = url.split('#')
    return a.length > 0 ? a.pop() : ''
}

const getHistoryPath = url => url.match(/[A-z]+$/)

export  {
    getHashPath,
    getHistoryPath
}