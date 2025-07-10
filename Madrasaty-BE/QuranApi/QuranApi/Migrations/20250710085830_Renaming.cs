using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuranApi.Migrations
{
    /// <inheritdoc />
    public partial class Renaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AyahEval_Students_StudentId",
                table: "AyahEval");

            migrationBuilder.DropForeignKey(
                name: "FK_AyahEval_Tasmii_TasmiiId",
                table: "AyahEval");

            migrationBuilder.DropForeignKey(
                name: "FK_LastProgresses_Students_StudentId",
                table: "LastProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Participation_Sessions_SessionId",
                table: "Participation");

            migrationBuilder.DropForeignKey(
                name: "FK_ParticipationTemplate_SessionPlanings_SessionScheduleId",
                table: "ParticipationTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_SessionPlanings_SessionScheduleId",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Students_StudentId",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SessionPlanings",
                table: "SessionPlanings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LastProgresses",
                table: "LastProgresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AyahEval",
                table: "AyahEval");

            migrationBuilder.RenameTable(
                name: "Sessions",
                newName: "SessionDays");

            migrationBuilder.RenameTable(
                name: "SessionPlanings",
                newName: "SessionSchedules");

            migrationBuilder.RenameTable(
                name: "LastProgresses",
                newName: "LastProgress");

            migrationBuilder.RenameTable(
                name: "AyahEval",
                newName: "AyahEvals");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_StudentId",
                table: "SessionDays",
                newName: "IX_SessionDays_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_Sessions_SessionScheduleId",
                table: "SessionDays",
                newName: "IX_SessionDays_SessionScheduleId");

            migrationBuilder.RenameIndex(
                name: "IX_AyahEval_TasmiiId",
                table: "AyahEvals",
                newName: "IX_AyahEvals_TasmiiId");

            migrationBuilder.RenameIndex(
                name: "IX_AyahEval_StudentId",
                table: "AyahEvals",
                newName: "IX_AyahEvals_StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SessionDays",
                table: "SessionDays",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SessionSchedules",
                table: "SessionSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LastProgress",
                table: "LastProgress",
                column: "StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AyahEvals",
                table: "AyahEvals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AyahEvals_Students_StudentId",
                table: "AyahEvals",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AyahEvals_Tasmii_TasmiiId",
                table: "AyahEvals",
                column: "TasmiiId",
                principalTable: "Tasmii",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_LastProgress_Students_StudentId",
                table: "LastProgress",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Participation_SessionDays_SessionId",
                table: "Participation",
                column: "SessionId",
                principalTable: "SessionDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParticipationTemplate_SessionSchedules_SessionScheduleId",
                table: "ParticipationTemplate",
                column: "SessionScheduleId",
                principalTable: "SessionSchedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionDays_SessionSchedules_SessionScheduleId",
                table: "SessionDays",
                column: "SessionScheduleId",
                principalTable: "SessionSchedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SessionDays_Students_StudentId",
                table: "SessionDays",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AyahEvals_Students_StudentId",
                table: "AyahEvals");

            migrationBuilder.DropForeignKey(
                name: "FK_AyahEvals_Tasmii_TasmiiId",
                table: "AyahEvals");

            migrationBuilder.DropForeignKey(
                name: "FK_LastProgress_Students_StudentId",
                table: "LastProgress");

            migrationBuilder.DropForeignKey(
                name: "FK_Participation_SessionDays_SessionId",
                table: "Participation");

            migrationBuilder.DropForeignKey(
                name: "FK_ParticipationTemplate_SessionSchedules_SessionScheduleId",
                table: "ParticipationTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionDays_SessionSchedules_SessionScheduleId",
                table: "SessionDays");

            migrationBuilder.DropForeignKey(
                name: "FK_SessionDays_Students_StudentId",
                table: "SessionDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SessionSchedules",
                table: "SessionSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SessionDays",
                table: "SessionDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LastProgress",
                table: "LastProgress");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AyahEvals",
                table: "AyahEvals");

            migrationBuilder.RenameTable(
                name: "SessionSchedules",
                newName: "SessionPlanings");

            migrationBuilder.RenameTable(
                name: "SessionDays",
                newName: "Sessions");

            migrationBuilder.RenameTable(
                name: "LastProgress",
                newName: "LastProgresses");

            migrationBuilder.RenameTable(
                name: "AyahEvals",
                newName: "AyahEval");

            migrationBuilder.RenameIndex(
                name: "IX_SessionDays_StudentId",
                table: "Sessions",
                newName: "IX_Sessions_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_SessionDays_SessionScheduleId",
                table: "Sessions",
                newName: "IX_Sessions_SessionScheduleId");

            migrationBuilder.RenameIndex(
                name: "IX_AyahEvals_TasmiiId",
                table: "AyahEval",
                newName: "IX_AyahEval_TasmiiId");

            migrationBuilder.RenameIndex(
                name: "IX_AyahEvals_StudentId",
                table: "AyahEval",
                newName: "IX_AyahEval_StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SessionPlanings",
                table: "SessionPlanings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sessions",
                table: "Sessions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LastProgresses",
                table: "LastProgresses",
                column: "StudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AyahEval",
                table: "AyahEval",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AyahEval_Students_StudentId",
                table: "AyahEval",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AyahEval_Tasmii_TasmiiId",
                table: "AyahEval",
                column: "TasmiiId",
                principalTable: "Tasmii",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LastProgresses_Students_StudentId",
                table: "LastProgresses",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Participation_Sessions_SessionId",
                table: "Participation",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParticipationTemplate_SessionPlanings_SessionScheduleId",
                table: "ParticipationTemplate",
                column: "SessionScheduleId",
                principalTable: "SessionPlanings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_SessionPlanings_SessionScheduleId",
                table: "Sessions",
                column: "SessionScheduleId",
                principalTable: "SessionPlanings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Students_StudentId",
                table: "Sessions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id");
        }
    }
}
