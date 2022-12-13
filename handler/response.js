// failed response function
const failed_response = (h, status, message, code) => {
    const response = h.response({
        status: status,
        message: message,
    });
    response.code(code);
    return response;
}

// success response function
const success_response = (h, status, message, code, id) => {
    const response = h.response({
        status: status,
        message: message,
        data: {
            bookId: id,
        },
    });
    response.code(code);
    return response;
}

module.exports = { failed_response, success_response };