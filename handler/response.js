// failed response function
const failedResponse = (h, status, message, code) => {
    const response = h.response({
        status,
        message,
    });
    response.code(code);
    return response;
};

// success response function
const successResponse = (h, status, message, code, id) => {
    const response = h.response({
        status,
        message,
        data: {
            bookId: id,
        },
    });
    response.code(code);
    return response;
};

module.exports = { failedResponse, successResponse };
