using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("customers")] // <-- your table name
public class Customer
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("username")]
    public required string Username { get; set; }  // Add `required` keyword

    [Column("password")]
    public required string Password { get; set; }  // Add `required` keyword
}
