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
const get_all_books_handler = (request, h) => {
    // create new books with only have id, name, and publisher
    books_chope_properties = books.map(({id, name, publisher}) => {
        let new_book = {id: id, name: name, publisher: publisher};
        return new_book
      });
    
    const response = h.response({
        status: 'success',
        data: {
            books: books_chope_properties,
        },
    });
    response.code(200);
    return response;
}

// get specific book handler
const get_specific_book_handler = (request, h) => {
    const { bookId } = request.params; // get params sent by client
    const book = books.filter((b) => b.id === bookId)[0]; // check availabiltiy book

    //if available
    if (book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                books,
            }
        });
        response.code(200);
        return response;
    }

    // if not available
    const response = h.response({
        status: 'fail',
        message: 'Buku Tidak Ditemukan',
    });
    response.code(404);
    return response;
}

// update book
const update_book_handler = (request, h) => {
    // load data from client
    const {bookId} = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const updatedAt = new Date().toISOString();

    // handle failed response
    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    // check availability bookId
    const index = books.findIndex((a_book) => a_book.id === bookId);
    if(index === -1){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    // if success
    if(index !== -1){
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading,
            updatedAt,
        };

        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }    
}

// Delete Books
const delete_book_handler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((a_book) => a_book.id === bookId);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }

   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = { 
    add_book_handler,
    get_all_books_handler,
    get_specific_book_handler,
    update_book_handler,
    delete_book_handler,
};