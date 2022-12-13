// import modules
const { add_data } = require('./handler/add_data');
const { show_data } = require('./handler/show_data');
const { get_specific } = require('./handler/get_specific');
const { update_data } = require('./handler/update_data');
const { delete_data } = require('./handler/delete_data');

// routes
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: add_data,
    },
    {
        method: 'GET',
        path: '/books',
        handler: show_data,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: get_specific,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: update_data,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: delete_data,
    },

];

// export routes
module.exports = { routes };