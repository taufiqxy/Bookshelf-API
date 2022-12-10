const { add_book_handler } = require('./handler');

// routes
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: add_book_handler,
    },

];

// export routes
module.exports = { routes };