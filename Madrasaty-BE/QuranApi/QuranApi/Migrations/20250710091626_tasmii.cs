using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class tasmii : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ScheduledAyah",
                table: "Tasmii",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScheduledSurah",
                table: "Tasmii",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartAyah",
                table: "Tasmii",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartSurah",
                table: "Tasmii",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ScheduledAyah",
                table: "Tasmii");

            migrationBuilder.DropColumn(
                name: "ScheduledSurah",
                table: "Tasmii");

            migrationBuilder.DropColumn(
                name: "StartAyah",
                table: "Tasmii");

            migrationBuilder.DropColumn(
                name: "StartSurah",
                table: "Tasmii");
        }
    }
}
