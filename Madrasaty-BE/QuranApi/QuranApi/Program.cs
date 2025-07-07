using Microsoft.EntityFrameworkCore;
using QuranApi.Contexts;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<QuranDbCtx>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("QuranDb")));


builder.Services.AddDbContext<SchoolDbCtx>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SchoolDb")));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();
