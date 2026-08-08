using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FilmesSeriesAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Catalogos",
                keyColumn: "ItemCatalogoId",
                keyValue: new Guid("f8c95008-e667-4ec8-b596-dcc3ed7d32cd"));

            migrationBuilder.InsertData(
                table: "Catalogos",
                columns: new[] { "ItemCatalogoId", "DataLancamento", "Duracao", "Genero", "ImagemUrl", "JaAssistiu", "Tipo", "Titulo" },
                values: new object[] { new Guid("0178c6d3-0216-41b3-82ea-a801c4d47412"), new DateTime(2019, 5, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "03h02m", "Ação", "https://media.fstatic.com/bbDnPrCkQfkez98V3PQjPAHSGPo=/220x330/smart/filters:format(webp)/media/movies/covers/2019/03/d1nmwmgvaaajv5mjpg-large_4c7c.jpg", true, "Filme", "Vingadores: Ultimato" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Catalogos",
                keyColumn: "ItemCatalogoId",
                keyValue: new Guid("0178c6d3-0216-41b3-82ea-a801c4d47412"));

            migrationBuilder.InsertData(
                table: "Catalogos",
                columns: new[] { "ItemCatalogoId", "DataLancamento", "Duracao", "Genero", "ImagemUrl", "JaAssistiu", "Tipo", "Titulo" },
                values: new object[] { new Guid("f8c95008-e667-4ec8-b596-dcc3ed7d32cd"), new DateTime(2019, 5, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "03h02m", "Ação", "https://media.fstatic.com/bbDnPrCkQfkez98V3PQjPAHSGPo=/220x330/smart/filters:format(webp)/media/movies/covers/2019/03/d1nmwmgvaaajv5mjpg-large_4c7c.jpg", true, "Filme", "Vingadores: Ultimato" });
        }
    }
}
