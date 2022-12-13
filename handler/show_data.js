// import modules
const { books } = require('../books');

// handler show all books
const show_data = (request, h) => {
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

// export
module.exports = { show_data }