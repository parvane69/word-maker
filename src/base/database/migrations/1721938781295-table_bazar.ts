import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableBazar1721938781295 implements MigrationInterface {
  name = 'TableBazar1721938781295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bazar" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "access_token" character varying NOT NULL, "refresh_token" character varying NOT NULL, CONSTRAINT "PK_ce4067ffcc83ca6587a45633191" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bazar"`);
  }
}
