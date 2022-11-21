import { DatabaseKnex } from '../../../../src/server/services/database/DatabaseKnex';
import { IToken, IUser } from '../../../../src/server/models/';
import { Token } from '../../../../src/server/tools';
import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;
import { User } from '../../../../src/server/services';

const userReflect: Partial<IUser> = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: Buffer.from(faker.internet.password(), 'binary')
};

describe('Testing class Token', () => {
    let knex: Knex = DatabaseKnex.getInstance();

    beforeAll(async () => {
        DatabaseKnex.initializeDatabasePool();
        knex = DatabaseKnex.getInstance();
        await knex.transaction(async (trx: Transaction) => {
            await knex.insert(userReflect).into('USER').transacting(trx);
            const [user]: Pick<IUser, 'uuid'>[] = await User.transactionGet({
                email: userReflect.email,
                username: userReflect.username,
            }, {
                uuid: true
            }, trx);
            if (!user) {
                throw new Error('User not created');
            }
            await knex.insert({
                roleId: 7,
                userUuid: user.uuid
            }).into('USER_ROLE').transacting(trx);
        });
    });

    afterAll(async () => {
        await knex.transaction(async (trx: Transaction) => {
            await knex.delete().from('USER').where(userReflect).transacting(trx);
        });
        await knex.destroy();
    });

    test('Token should be a class', () => {
        expect(Token).toBeInstanceOf(Object);
    });

    test('Token should have a generateToken method', () => {
        expect(Token.generateToken).toBeInstanceOf(Function);
    });

    test('Token should have a signatureChecker method', () => {
        expect(Token.signatureChecker).toBeInstanceOf(Function);
    });

    test('Token check if generateToken return a token and salt', async () => {
        const [user]: Pick<IUser, 'uuid' | 'username'>[] = await knex.select().from('USER').where(userReflect);
        expect(user).toBeInstanceOf(Object);
        expect(user).toMatchObject({
            uuid: expect.any(Buffer),
            username: expect.any(String)
        });
        const token: Pick<IToken, 'token' | 'salt'> = await Token.generateToken(user as IUser, new Date());
        expect(token).toBeInstanceOf(Object);
        expect(token).toMatchObject({
            token: expect.any(String),
            salt: expect.any(Buffer)
        });
    });

    test('Token check if generateToken return a good header', async () => {
        const [user]: Pick<IUser, 'uuid' | 'username'>[] = await knex.select().from('USER').where(userReflect);
        expect(user).toBeInstanceOf(Object);
        expect(user).toMatchObject({
            uuid: expect.any(Buffer),
            username: expect.any(String)
        });
        const token: Pick<IToken, 'token' | 'salt'> = await Token.generateToken(user as IUser, new Date());
        expect(token).toBeInstanceOf(Object);
        expect(token).toMatchObject({
            token: expect.any(String),
            salt: expect.any(Buffer)
        });
        const header: string = token.token.split('.')[0] || '';
        expect(typeof (header)).toBe('string');
        const headerDecoded: string = JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
        expect(headerDecoded).toMatchObject({
            alg: expect.any(String),
            exp: expect.any(Date)
        });
    });
});
