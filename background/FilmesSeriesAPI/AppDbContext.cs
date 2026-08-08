using Microsoft.EntityFrameworkCore;
// Contexto do EF Core
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Catalogo> Catalogos => Set<Catalogo>();

 // Sobrescrita do método para aplicar configurações customizadas via Fluent API
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurações da entidade Tarefa
        modelBuilder.Entity<Catalogo>(entity =>
        {
            // Define o nome explícito da tabela no SQLite
            entity.ToTable("Catalogos");

            // Define a chave primária
            entity.HasKey(t => t.ItemCatalogoId);

            entity.Property(c => c.ItemCatalogoId).ValueGeneratedOnAdd();

            // Torna o Título obrigatório e define limite de caracteres
            entity.Property(t => t.Titulo)
                  .IsRequired()
                  .HasMaxLength(255);

            // Torna o Título Url da Imagem obrigatória
            entity.Property(t => t.ImagemUrl)
                  .IsRequired();

            entity.Property(c => c.Tipo)
                  .IsRequired()
                  .HasMaxLength(50);

            entity.Property(c => c.Genero)
                  .IsRequired()
                  .HasMaxLength(100);

            entity.Property(c => c.Duracao)
                  .HasMaxLength(30);
            
            entity.Property(c => c.DataLancamento)
                  .IsRequired();

            // Define um valor padrão no banco para a coluna Concluido (SQLite aceita 0 para falso)
            entity.Property(t => t.JaAssistiu)
                  .HasDefaultValue(false);

           
        });
    }
}