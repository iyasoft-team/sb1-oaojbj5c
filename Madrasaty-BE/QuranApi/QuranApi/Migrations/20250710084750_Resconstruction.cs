using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class Resconstruction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SessionPlanings",
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
                    table.PrimaryKey("PK_SessionPlanings", x => x.Id);
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
                name: "LastProgresses",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    SurahNumber = table.Column<int>(type: "int", nullable: false),
                    AyahNumber = table.Column<int>(type: "int", nullable: false),
                    PageNumber = table.Column<int>(type: "int", nullable: false),
                    WordIndex = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LastProgresses", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_LastProgresses_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
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
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    SessionScheduleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParticipationTemplate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParticipationTemplate_SessionPlanings_SessionScheduleId",
                        column: x => x.SessionScheduleId,
                        principalTable: "SessionPlanings",
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
                name: "Sessions",
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
                    ModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_SessionPlanings_SessionScheduleId",
                        column: x => x.SessionScheduleId,
                        principalTable: "SessionPlanings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sessions_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Participation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    SessionId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participation_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Participation_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasmii",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    ParticipationId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasmii", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasmii_Participation_ParticipationId",
                        column: x => x.ParticipationId,
                        principalTable: "Participation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Tasmii_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AyahEval",
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
                    table.PrimaryKey("PK_AyahEval", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AyahEval_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AyahEval_Tasmii_TasmiiId",
                        column: x => x.TasmiiId,
                        principalTable: "Tasmii",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
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
                        name: "FK_TajweedEval_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TajweedEval_Tasmii_TasmiiId",
                        column: x => x.TasmiiId,
                        principalTable: "Tasmii",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AyahEval_StudentId",
                table: "AyahEval",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_AyahEval_TasmiiId",
                table: "AyahEval",
                column: "TasmiiId");

            migrationBuilder.CreateIndex(
                name: "IX_Participation_SessionId",
                table: "Participation",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_Participation_StudentId",
                table: "Participation",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipationTemplate_SessionScheduleId",
                table: "ParticipationTemplate",
                column: "SessionScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_ParticipationTemplate_StudentId",
                table: "ParticipationTemplate",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_SessionScheduleId",
                table: "Sessions",
                column: "SessionScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_StudentId",
                table: "Sessions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_StudentId",
                table: "TajweedEval",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TajweedEval_TasmiiId",
                table: "TajweedEval",
                column: "TasmiiId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasmii_ParticipationId",
                table: "Tasmii",
                column: "ParticipationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasmii_StudentId",
                table: "Tasmii",
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
                name: "ParticipationTemplate");

            migrationBuilder.DropTable(
                name: "TajweedEval");

            migrationBuilder.DropTable(
                name: "Tasmii");

            migrationBuilder.DropTable(
                name: "Participation");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "SessionPlanings");

            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
