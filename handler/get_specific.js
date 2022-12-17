// import modules
const { books } = require('../books');

// get specific book handler
const getSpecific = (request, h) => {
    const { bookId } = request.params; // get params sent by client
    const book = books.filter((b) => b.id === bookId)[0]; // check availabiltiy book

    // if available
    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    // if not available
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// export
module.exports = { getSpecific };
