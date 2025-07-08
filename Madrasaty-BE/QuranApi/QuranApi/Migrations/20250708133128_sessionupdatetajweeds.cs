using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class sessionupdatetajweeds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EndAyah",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EndSurah",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OverallRating",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartAyah",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StartSurah",
                table: "Sessions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "AyahNumber",
                table: "AyahEval",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "TajweedEval",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surah = table.Column<int>(type: "int", nullable: false),
                    Ayah = table.Column<int>(type: "int", nullable: false),
                    WordIndex = table.Column<int>(type: "int", nullable: false),
                    TStart = table.Column<int>(type: "int", nullable: false),
                    TEnd = table.Column<int>(type: "int", nullable: false),
                    TRule = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Evaluation = table.Column<int>(type: "int", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TajweedEval", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TajweedEval_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TajweedEval_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_SessionId",
                table: "TajweedEval",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_StudentId",
                table: "TajweedEval",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TajweedEval");

            migrationBuilder.DropColumn(
                name: "EndAyah",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "EndSurah",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "OverallRating",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "StartAyah",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "StartSurah",
                table: "Sessions");

            migrationBuilder.AlterColumn<int>(
                name: "AyahNumber",
                table: "AyahEval",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
