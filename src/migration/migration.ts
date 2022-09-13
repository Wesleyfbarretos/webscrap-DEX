import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DatabaseStartup implements MigrationInterface {
  name?: string;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("test", true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
