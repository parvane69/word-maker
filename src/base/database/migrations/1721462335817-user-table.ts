import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1721462335817 implements MigrationInterface {
  name = 'UserTable1721462335817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "phone" character varying NOT NULL, "email" character varying, "confirmation_code" character varying NOT NULL DEFAULT '0', "name" character varying, "family" character varying, "status" character varying NOT NULL DEFAULT 'PENDING', CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
