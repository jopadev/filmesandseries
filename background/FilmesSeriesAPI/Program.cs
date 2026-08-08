using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Scalar.AspNetCore;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// 1. Buscar a string de conexão
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 2. Registrar o DbContext no contêiner de dependências do ASP.NET Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// 3. Define a unique policy name
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 4. Register CORS services with your frontend origin
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // Your frontend URL
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// Adiciona suporte nativo à OpenAPI (.NET 9)
builder.Services.AddOpenApi();
// Isso faz o .NET injetar automaticamente o seu CreateCatalogoValidator
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
// Add services to the container.

var app = builder.Build();


// CRITICAL: Place UseCors after UseRouting (if used) but BEFORE any route mappings
app.UseCors(myAllowSpecificOrigins);

// Ativa o endpoint para expor o JSON da OpenAPI (/openapi/v1.json)
app.MapOpenApi();

app.MapScalarApiReference(); // Adicione esta linha

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

// ---- ENDPOINTS (CRUDS NO SQLITE) ----

var catalogosApi = app.MapGroup("/catalogos");

// GET: Listar todas os items do catalogo do SQLite
catalogosApi.MapGet("/", async (AppDbContext db) =>
{
    var oCatalogoList = await db.Catalogos.ToListAsync();
    return TypedResults.Ok(oCatalogoList.Select(x => x.ToDto()));
});

// GET: Buscar item do catalogo por ID
catalogosApi.MapGet("/{id:Guid}", async Task<Results<Ok<CatalogoDto>, NotFound>> (Guid id, AppDbContext db) =>
{
    var oCatalogo = await db.Catalogos.FindAsync(id);
    return oCatalogo is not null ? TypedResults.Ok(oCatalogo.ToDto()) : TypedResults.NotFound();
});

// POST: Criar novo item do catalogo no banco
catalogosApi.MapPost("/", async Task<Results<Created<Catalogo>, ValidationProblem>> (CreateCatalogoDto catalogoDto, AppDbContext db) =>
{
    var oCatalogo = new Catalogo
    {
        ItemCatalogoId = Guid.NewGuid(),
        Titulo = catalogoDto.Titulo,
        Tipo = catalogoDto.Tipo,
        Genero = catalogoDto.Genero,
        ImagemUrl = catalogoDto.ImagemUrl,
        DataLancamento = catalogoDto.DataLancamento,
        Duracao = catalogoDto.Duracao,
        JaAssistiu = catalogoDto.JaAssistiu
    };

    db.Catalogos.Add(oCatalogo);
    await db.SaveChangesAsync();
    return TypedResults.Created($"/catalogos/{oCatalogo.ItemCatalogoId}", oCatalogo);
})
.AddEndpointFilter<ValidationFilter<CreateCatalogoDto>>();

// PUT: Atualizar item do catalogo existente

catalogosApi.MapPut("/{id:Guid}", async Task<Results<NoContent, NotFound>> (Guid id, CatalogoDto catalogoAtualizado, AppDbContext db) =>
{

    var oCatalogo = await db.Catalogos.FindAsync(id);
    if (oCatalogo is null) return TypedResults.NotFound();

    oCatalogo.Titulo = catalogoAtualizado.Titulo;
    oCatalogo.Tipo = catalogoAtualizado.Tipo;
    oCatalogo.Genero = catalogoAtualizado.Genero;
    oCatalogo.ImagemUrl = catalogoAtualizado.ImagemUrl;
    oCatalogo.DataLancamento = catalogoAtualizado.DataLancamento;
    oCatalogo.Duracao = catalogoAtualizado.Duracao;
    oCatalogo.JaAssistiu = catalogoAtualizado.JaAssistiu;
    // Explicitly mark as modified if tracking fails
    db.Update(oCatalogo);
    var x = await db.SaveChangesAsync();
    return TypedResults.NoContent();
})
.AddEndpointFilter<ValidationFilter<CatalogoDto>>();




// DELETE: Remover item do catalogo do banco
catalogosApi.MapDelete("/{id:Guid}", async Task<Results<NoContent, NotFound>> (Guid id, AppDbContext db) =>
{
    var oCatalogo = await db.Catalogos.FindAsync(id);
    if (oCatalogo is null) return TypedResults.NotFound();

    db.Catalogos.Remove(oCatalogo);
    await db.SaveChangesAsync();
    return TypedResults.NoContent();
});

app.Run();
