import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointment1599426249159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false,

            },
            {
              name: 'date',
              type: 'timestamp',
              isNullable: false,
              default: 'now()'

            }
          ]
        })
      );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
