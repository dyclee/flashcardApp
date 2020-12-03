const imageUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000"
const baseUrl = `${imageUrl}/api`

module.exports = {
    imageUrl,
    baseUrl
}
