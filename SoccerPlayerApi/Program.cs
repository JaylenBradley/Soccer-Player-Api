global using SoccerPlayerApi.Models;
global using Microsoft.EntityFrameworkCore;
using SoccerPlayerApi.Data.Interfaces;
using SoccerPlayerApi.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<SampleDatabaseContext>(options =>
    options.UseSqlite("Data Source=soccer.db"));

builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.WithOrigins("https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();