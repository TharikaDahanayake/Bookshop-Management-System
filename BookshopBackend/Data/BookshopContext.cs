using Microsoft.EntityFrameworkCore;


namespace BookshopBackend.Data
{
    public class BookshopContext : DbContext
    {
        public BookshopContext(DbContextOptions<BookshopContext> options) : base(options)
        {
        }

        // DbSet for each table
        public DbSet<Admin> admins { get; set; }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Book> books { get; set; } // Correctly references the Book entity

       
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional: Seed initial data (example for admins)
            modelBuilder.Entity<Admin>().HasData(
                new Admin { Id = 1, Username = "admin", Password = "admin123" }
            );

            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, Username = "tharika", Password = "tharika123" }
            );
        }
    }
}