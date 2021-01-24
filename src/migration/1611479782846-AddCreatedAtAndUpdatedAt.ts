import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedAtAndUpdatedAt1611479782846
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tables = ["users", "posts", "comments"];
    await Promise.all(
      tables.map((tableName) =>
        queryRunner.addColumns(tableName, [
          new TableColumn({
            name: "created_at",
            type: "time",
            isNullable: false,
            default: "now()",
          }),
          new TableColumn({
            name: "updated_at",
            type: "time",
            isNullable: false,
            default: "now()",
          }),
        ])
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tables = ["users", "posts", "comments"];
    await Promise.all(
      tables.map((tableName) => queryRunner.dropColumn(tableName, "created_at"))
    );
    await Promise.all(
      tables.map((tableName) => queryRunner.dropColumn(tableName, "updated_at"))
    );
  }
}
