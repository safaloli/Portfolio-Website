const slugify = require('slugify')

const slugGenerator = (fullName) => {
    return slugify(fullName, {
        lower: true,
        strict: true,
    })
}


module.exports = slugGenerator