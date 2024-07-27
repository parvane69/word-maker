import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductPurchaseTable1721796911486 implements MigrationInterface {
  name = 'ProductPurchaseTable1721796911486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "price" integer NOT NULL, "title" character varying NOT NULL, "description" character varying, "accessLevel" character varying NOT NULL, "restrictedAccessLevels" text, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "orderId" character varying NOT NULL, "token" character varying NOT NULL, "payload" character varying NOT NULL, "packageName" character varying, "state" character varying NOT NULL, "time" integer NOT NULL, "originalJson" character varying, "dataSignature" character varying, "user_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a"`,
    );
    await queryRunner.query(`DROP TABLE "purchases"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
