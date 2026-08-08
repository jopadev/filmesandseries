public class CatalogoDto
{
    public Guid ItemCatalogoId { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public string Genero { get; set; } = string.Empty;
    public string ImagemUrl { get; set; } = string.Empty;
    public DateTime DataLancamento { get; set; }
    public string? Duracao { get; set; }
    public bool JaAssistiu { get; set; }
}
