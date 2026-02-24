const RandomStringGenerator = (len=20) => {
    let str = ""
    const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < len; i++) {
        const randomIdx = Math.ceil(Math.random()* (char.length - 1))        
        const randomStr = char[randomIdx]
        str += randomStr
    }
    
    return str
}

module.exports = RandomStringGenerator