// import modules
const { nanoid } = require('nanoid');
const { books } = require('../books');
const { failedResponse, successResponse } = require('./response');

// handler adding book
const addData = (request, h) => {
    // get data from client
    const {
         name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    // check availability property name and make sure data type sent by client is string
    if (name === undefined || !(typeof (name) === 'string') || name === '') {
        return failedResponse(h, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', 400);
    }
    // make sure reading page not greater than num of page
    if (readPage > pageCount) {
        return failedResponse(h, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
    }

    // get book_id, insertedAt, upadateAt
    const id = nanoid(16);
    const now = new Date();
    const insertedAt = now.toISOString();
    const updatedAt = insertedAt;

    // get finished value
    let finished = '';
    if (pageCount === readPage) {
        finished = true;
    } else {
        finished = false;
    }

    // compile new book in object type
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    // push book into array
    books.push(newBook);

    // check push status success/failed
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    // if success adding book
    if (isSuccess === true) {
        return successResponse(h, 'success', 'Buku berhasil ditambahkan', 201, id);
    }

    return failedResponse(h, 'fail', 'Buku gagal ditambahkan', 500);
};

// export
module.exports = { addData };
