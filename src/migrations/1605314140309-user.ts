import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1605314140309 implements MigrationInterface {
  name = 'createUser1605314140309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(50) NOT NULL, `lastName` varchar(50) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
  }
}
