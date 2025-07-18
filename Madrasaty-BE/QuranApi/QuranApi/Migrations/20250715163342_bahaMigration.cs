using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class bahaMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SessionSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeacherId = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ToEndOfYear = table.Column<bool>(type: "bit", nullable: false),
                    Recurrence = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionSchedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SessionDays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeacherId = table.Column<int>(type: "int", nullable: false),
                    SessionScheduleId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionDays_SessionSchedules_SessionScheduleId",
                        column: x => x.SessionScheduleId,
                        principalTable: "SessionSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParticipationTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    SessionScheduleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParticipationTemplate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParticipationTemplate_SessionSchedules_SessionScheduleId",
                        column: x => x.SessionScheduleId,
                        principalTable: "SessionSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParticipationTemplate_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recitations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    StartSurah = table.Column<int>(type: "int", nullable: false),
                    StartAyah = table.Column<int>(type: "int", nullable: false),
                    ScheduledSurah = table.Column<int>(type: "int", nullable: false),
                    ScheduledAyah = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recitations_SessionDays_SessionId",
                        column: x => x.SessionId,
                        principalTable: "SessionDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Recitations_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AyahEvals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TasmiiId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    SurahNumber = table.Column<int>(type: "int", nullable: false),
                    AyahNumber = table.Column<int>(type: "int", nullable: true),
                    RecitationStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AyahEvals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AyahEvals_Recitations_TasmiiId",
                        column: x => x.TasmiiId,
                        principalTable: "Recitations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_AyahEvals_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                    TasmiiId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TajweedEval", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TajweedEval_Recitations_TasmiiId",
                        column: x => x.TasmiiId,
                        principalTable: "Recitations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TajweedEval_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AyahEvals_StudentId",
                table: "AyahEvals",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_AyahEvals_TasmiiId",
                table: "AyahEvals",
                column: "TasmiiId");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipationTemplate_SessionScheduleId",
                table: "ParticipationTemplate",
                column: "SessionScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipationTemplate_StudentId",
                table: "ParticipationTemplate",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Recitations_SessionId",
                table: "Recitations",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Recitations_StudentId",
                table: "Recitations",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionDays_SessionScheduleId",
                table: "SessionDays",
                column: "SessionScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_StudentId",
                table: "TajweedEval",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_TasmiiId",
                table: "TajweedEval",
                column: "TasmiiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AyahEvals");

            migrationBuilder.DropTable(
                name: "ParticipationTemplate");

            migrationBuilder.DropTable(
                name: "TajweedEval");

            migrationBuilder.DropTable(
                name: "Recitations");

            migrationBuilder.DropTable(
                name: "SessionDays");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "SessionSchedules");
        }
    }
}
