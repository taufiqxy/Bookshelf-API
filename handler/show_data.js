// import modules
const { books } = require('../books');

// handler show books
const showData = (request, h) => {
    // get query if sent by client
    const { name, reading, finished } = request.query;

    if (!(name === undefined)) {
        const book = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));

        const booksChopeProperties = book.map(({ id, name, publisher }) => {
            const newBook = { id, name, publisher };
            return newBook;
        });

        const response = h.response({
            status: 'success',
            data: {
                books: booksChopeProperties,
            },
        });
        response.code(200);
        return response;
    }

    if (!(reading === undefined) && ((reading === '0') || (reading === '1'))) {
        let isReading;
        if (reading === '0') {
            isReading = false;
        } else if (reading === '1') {
            isReading = true;
        }

        const book = books.filter((b) => b.reading === isReading);

        const booksChopeProperties = book.map(({ id, name, publisher }) => {
            const newBook = { id, name, publisher };
            return newBook;
        });

        const response = h.response({
            status: 'success',
            data: {
                books: booksChopeProperties,
            },
        });
        response.code(200);
        return response;
    }

    if (!(finished === undefined) && ((finished === '0') || (finished === '1'))) {
        let isFinished;
        if (finished === '0') {
            isFinished = false;
        }
        else if (finished === '1') {
            isFinished = true;
        }

        const book = books.filter((b) => b.finished === isFinished);

        const booksChopeProperties = book.map(({ id, name, publisher }) => {
            const newBook = { id, name, publisher };
            return newBook;
        });

        const response = h.response({
            status: 'success',
            data: {
                books: booksChopeProperties,
            },
        });
        response.code(200);
        return response;
    }

    // show all books
    // create new books with only have id, name, and publisher
    const booksChopeProperties = books.map(({ id, name, publisher }) => {
        const newBook = { id, name, publisher };
        return newBook;
    });

    const response = h.response({
        status: 'success',
        data: {
            books: booksChopeProperties,
        },
    });
    response.code(200);
    return response;
};

// export
module.exports = { showData };
