using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class AddMultipleAyahEvalSupport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AyahEval",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    SurahNumber = table.Column<int>(type: "int", nullable: false),
                    AyahNumber = table.Column<int>(type: "int", nullable: false),
                    RecitationStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AyahEval", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AyahEval_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_AyahEval_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

           
            migrationBuilder.CreateIndex(
                name: "IX_AyahEval_SessionId",
                table: "AyahEval",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_AyahEval_StudentId",
                table: "AyahEval",
                column: "StudentId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AyahEval");

            migrationBuilder.DropTable(
                name: "LastProgresses");

            migrationBuilder.DropTable(
                name: "TajweedErrors");

            migrationBuilder.DropTable(
                name: "SessionEvaluations");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
