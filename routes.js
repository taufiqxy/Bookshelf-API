// import modules
const { addData } = require('./handler/add_data');
const { showData } = require('./handler/show_data');
const { getSpecific } = require('./handler/get_specific');
const { updateData } = require('./handler/update_data');
const { deleteData } = require('./handler/delete_data');

// routes
const routes = [
    {
        method: 'POST',
    path: '/books',
        handler: addData,
    },
    {
        method: 'GET',
        path: '/books',
        handler: showData,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getSpecific,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateData,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteData,
    },

];

// export routes
module.exports = { routes };
