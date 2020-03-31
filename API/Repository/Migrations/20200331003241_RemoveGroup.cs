using Microsoft.EntityFrameworkCore.Migrations;

namespace Angular.API.Repository.Migrations
{
    public partial class RemoveGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Events");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
