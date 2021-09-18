import {MigrationInterface, QueryRunner} from "typeorm";

export class db1631948308350 implements MigrationInterface {
    name = 'db1631948308350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NOT NULL`);
    }

}
