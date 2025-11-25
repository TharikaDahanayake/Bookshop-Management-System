using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BookshopBackend.Data;
using BookshopBackend.Controllers;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddDbContext<BookshopContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection")!,
        new MySqlServerVersion(new Version(8, 4, 0))
    ));

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000") // Ensure this matches your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();

// Apply the CORS policy here
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.Run();
