using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//JSON Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                                           .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

//Shows UseCors with CorsPolicyBuilder
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});


app.Run();
