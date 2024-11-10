import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729073220113 implements MigrationInterface {
    name = 'Init1729073220113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime NOT NULL, \`message\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chat_history\` ADD CONSTRAINT \`FK_1ac2c37b6a37918f4d711afc48c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat_history\` DROP FOREIGN KEY \`FK_1ac2c37b6a37918f4d711afc48c\``);
        await queryRunner.query(`DROP TABLE \`chat_history\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
