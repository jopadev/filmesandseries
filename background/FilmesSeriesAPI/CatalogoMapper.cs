public static class CatalogoMapper
{
    public static CatalogoDto ToDto(this Catalogo catalogo)
    {
        return new CatalogoDto
        {
            ItemCatalogoId = catalogo.ItemCatalogoId,
            Titulo = catalogo.Titulo,
            Tipo = catalogo.Tipo,
            Genero = catalogo.Genero,
            ImagemUrl = catalogo.ImagemUrl,
            DataLancamento = catalogo.DataLancamento,
            Duracao = catalogo.Duracao,
            JaAssistiu = catalogo.JaAssistiu
        };
    }
    public static Catalogo ToEntity(this CreateCatalogoDto createCatalogoDto)
    {
        return new Catalogo
        {
            ItemCatalogoId = Guid.NewGuid(),
            Titulo = createCatalogoDto.Titulo,
            Tipo = createCatalogoDto.Tipo,
            Genero = createCatalogoDto.Genero,
            ImagemUrl = createCatalogoDto.ImagemUrl,
            DataLancamento = createCatalogoDto.DataLancamento,
            Duracao = createCatalogoDto.Duracao,
            JaAssistiu = createCatalogoDto.JaAssistiu
        };
    }
}