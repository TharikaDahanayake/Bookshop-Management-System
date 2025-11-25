using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("books")]
public class Book
{
    [Key]
    [Column("BookID")]
    public int BookID { get; set; } // Auto-Increment Primary Key

    [Column("Title")]
    public required string Title { get; set; } // Book Title (Required)

    [Column("Author")]
    public required string Author { get; set; } // Book Author (Required)

    [Column("Price")]
    public decimal Price { get; set; } // Price as Decimal (Required)
}