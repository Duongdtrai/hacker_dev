import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const _tableName = 'users';
export class CreateFiledUsersTable1592555965809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      _tableName,
      new TableColumn({
        name: 'count',
        type: 'tinyInt',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(_tableName, 'count');
  }
}
