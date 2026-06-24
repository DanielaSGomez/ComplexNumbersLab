using ComplexNumbers.Application.Mappings;
using ComplexNumbers.Application.Services;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOperationsService, OperationsService>();
builder.Services.AddAutoMapper(c => c.AddProfile<ComplexProfile>());

builder.Services.AddCors(options =>
{
    options.AddPolicy("complex", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("complex");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
