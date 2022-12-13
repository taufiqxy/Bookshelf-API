// import modules
const { books } = require('../books');

// Delete Books
const delete_data = (request, h) => {
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

// export
module.exports = { delete_data }