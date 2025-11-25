using Microsoft.AspNetCore.Mvc;
using BookshopBackend.Data;
using System.Linq;

namespace BookshopBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookshopContext _context;

        public BooksController(BookshopContext context)
        {
            _context = context;
        }

        // GET: api/books
        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _context.books.ToList();
            return Ok(books);
        }

        // GET: api/books/{id}
        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _context.books.FirstOrDefault(b => b.BookID == id);
            if (book == null)
            {
                return NotFound(new { message = "Book not found." });
            }
            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public IActionResult CreateBook([FromBody] Book book)
        {
            if (book == null || string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author) || book.Price <= 0)
            {
                return BadRequest(new { message = "Invalid book data." });
            }

            _context.books.Add(book);
            _context.SaveChanges();

            return Ok(book); // Return the created book
        }


        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            Console.WriteLine($"Attempting to update book with ID: {id}");

            var existingBook = _context.books.FirstOrDefault(b => b.BookID == id);
            if (existingBook == null)
            {
                Console.WriteLine($"Book with ID {id} not found.");
                return NotFound(new { message = "Book not found." });
            }

            if (book == null || string.IsNullOrWhiteSpace(book.Title) || string.IsNullOrWhiteSpace(book.Author) || book.Price <= 0)
            {
                Console.WriteLine("Invalid book data received.");
                return BadRequest(new { message = "Invalid book data." });
            }

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Price = book.Price;

            _context.SaveChanges();

            Console.WriteLine($"Book with ID {id} updated successfully.");
            return Ok(existingBook);
        }




        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
            public IActionResult DeleteBook(int id)
            {
                Console.WriteLine($"Attempting to delete book with ID: {id}"); // Debug log

                // Find the book by ID
                var book = _context.books.FirstOrDefault(b => b.BookID == id);
                if (book == null)
                {
                    Console.WriteLine($"Book with ID {id} not found."); // Debug log for troubleshooting
                    return NotFound(new { message = "Book not found." });
                }

                // Remove the book from the database
                _context.books.Remove(book);
                _context.SaveChanges();

                Console.WriteLine($"Book with ID {id} deleted successfully."); // Debug log for confirmation
                return Ok(new { message = "Book deleted successfully." });
            }
    }
}