class Response {
    async RESPONSE (status = 0, response = {}, message = "") {
        return { status: status, response: response, message: message }
    }
}

module.exports = Response;