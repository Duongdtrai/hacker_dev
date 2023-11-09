import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const _tableName = 'users';
export class CreateFiledUsersTable1592555965809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      _tableName,
      new TableColumn({
        name: 'count',
        type: 'tinyInt', // Kiểu dữ liệu của cột (integer)
        isNullable: false, // Cho phép giá trị trong cột có thể null hay không (false nếu không cho phép null)
        default: 0, // Giá trị mặc định của cột (ở đây mặc định là 0)
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(_tableName, 'count');
  }
}
