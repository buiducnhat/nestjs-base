import {MigrationInterface, QueryRunner} from "typeorm";

export class db1632401642769 implements MigrationInterface {
    name = 'db1632401642769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
    }

}
