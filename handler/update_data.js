// import modules
const { books } = require('../books');

// update book
const updateData = (request, h) => {
    // load data from client
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const updatedAt = new Date().toISOString();

    // handle failed response
    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // check availability bookId
    const index = books.findIndex((aBook) => aBook.id === bookId);
    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    // if success
    if (index !== -1) {
        // update finished attribute
        let finished = '';
        if (readPage === pageCount) {
            finished = true;
        } else {
            finished = false;
        }
        // update all attribute
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'General failure!',
    });
    response.code(500);
    return response;
};

// export
module.exports = { updateData };
