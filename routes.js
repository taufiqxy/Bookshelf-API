const { 
    add_book_handler,
    get_all_books_handler,
    get_specific_book_handler,
    update_book_handler,
    delete_book_handler,
}
= require('./handler');

// routes
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: add_book_handler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: get_all_books_handler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: get_specific_book_handler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: update_book_handler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: delete_book_handler,
    },

];

// export routes
module.exports = { routes };