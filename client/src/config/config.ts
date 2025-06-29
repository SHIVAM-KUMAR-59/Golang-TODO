// Configuration for the application

// API BASE URL

const isProduction = process.env.NODE_ENV === 'production'
const apiProtocol = isProduction ? 'https' : 'http'
const port = isProduction ? 443 : 9090
const host = isProduction ? 'domain-name' : 'localhost'

const API_BASE_URL = `${apiProtocol}://${host}:${port}`

export { API_BASE_URL }
