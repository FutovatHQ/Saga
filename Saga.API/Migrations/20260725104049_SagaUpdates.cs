using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Saga.API.Migrations
{
    /// <inheritdoc />
    public partial class SagaUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapter_Sagas_SagaDataId",
                table: "Chapter");

            migrationBuilder.DropForeignKey(
                name: "FK_Quest_Chapter_ChapterId",
                table: "Quest");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Chapter");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Quest",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Chapter",
                newName: "Content");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Sagas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CompletionBonusPoints",
                table: "Sagas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Sagas",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "ChapterId",
                table: "Quest",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SagaDataId",
                table: "Chapter",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Chapter_Sagas_SagaDataId",
                table: "Chapter",
                column: "SagaDataId",
                principalTable: "Sagas",
                principalColumn: "SagaDataId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quest_Chapter_ChapterId",
                table: "Quest",
                column: "ChapterId",
                principalTable: "Chapter",
                principalColumn: "ChapterId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chapter_Sagas_SagaDataId",
                table: "Chapter");

            migrationBuilder.DropForeignKey(
                name: "FK_Quest_Chapter_ChapterId",
                table: "Quest");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Sagas");

            migrationBuilder.DropColumn(
                name: "CompletionBonusPoints",
                table: "Sagas");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Sagas");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Quest",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Chapter",
                newName: "Description");

            migrationBuilder.AlterColumn<int>(
                name: "ChapterId",
                table: "Quest",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "SagaDataId",
                table: "Chapter",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Chapter",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Chapter_Sagas_SagaDataId",
                table: "Chapter",
                column: "SagaDataId",
                principalTable: "Sagas",
                principalColumn: "SagaDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quest_Chapter_ChapterId",
                table: "Quest",
                column: "ChapterId",
                principalTable: "Chapter",
                principalColumn: "ChapterId");
        }
    }
}
