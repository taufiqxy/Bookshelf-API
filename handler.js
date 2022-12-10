// import modoles
const { nanoid } = require('nanoid');
const { books } = require('./books');
const { failed_response, success_response } = require('./response');

// handler adding book
const add_book_handler = (request, h) => {
    // get data from client
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // validation client data
    // check availability property name
    if(name === undefined){
        return failed_response(h, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', 400);
    }
    // make sure reading page not greater than num of page
    if(readPage > pageCount){
        return failed_response(h, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', 400);
    } 

    // get book_id, insertedAt, upadateAt
    const id = nanoid(16);
    const now = new Date();
    const insertedAt = now.toISOString();
    const updatedAt = insertedAt;

    // get finished value
    if(pageCount === readPage){
        finished = true;
    }else{
        finished = false;
    };

    // new book
    const new_book = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    // push book into array
    books.push(new_book);

    // check push status success/failed
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    // if failed adding book
    if(isSuccess === false){
        return failed_response(h, 'fail', 'Buku gagal ditambahkan', 500);
    };

    // if success adding book
    if(isSuccess === true){
        return success_response(h, 'success', 'Buku berhasil ditambahkan', 201, id);
    };
}

// handler show all books

module.exports = { add_book_handler };