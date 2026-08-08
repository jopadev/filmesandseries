using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FilmesSeriesAPI.Migrations
{
    /// <inheritdoc />
    public partial class CriarTabelaCatalogo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Catalogos",
                columns: table => new
                {
                    ItemCatalogoId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Titulo = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Tipo = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Genero = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ImagemUrl = table.Column<string>(type: "TEXT", nullable: false),
                    DataLancamento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Duracao = table.Column<string>(type: "TEXT", maxLength: 30, nullable: true),
                    JaAssistiu = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Catalogos", x => x.ItemCatalogoId);
                });

            migrationBuilder.InsertData(
                table: "Catalogos",
                columns: new[] { "ItemCatalogoId", "DataLancamento", "Duracao", "Genero", "ImagemUrl", "JaAssistiu", "Tipo", "Titulo" },
                values: new object[] { new Guid("f8c95008-e667-4ec8-b596-dcc3ed7d32cd"), new DateTime(2019, 5, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "03h02m", "Ação", "https://media.fstatic.com/bbDnPrCkQfkez98V3PQjPAHSGPo=/220x330/smart/filters:format(webp)/media/movies/covers/2019/03/d1nmwmgvaaajv5mjpg-large_4c7c.jpg", true, "Filme", "Vingadores: Ultimato" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Catalogos");
        }
    }
}
