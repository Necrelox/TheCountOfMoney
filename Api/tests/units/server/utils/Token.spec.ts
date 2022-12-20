/**
 * Local Modules
 */
import { DatabaseKnex } from '../../../../src/server/services';
import { IRole, IToken, IUser } from '../../../../src/server/models';
import { Token } from '../../../../src/server/utils';
import { User } from '../../../../src/server/services/actions';

/**
 * Dependencies
 */
import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
import Transaction = Knex.Transaction;

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
            const [role]: Pick<IRole, 'id'>[] = await knex.select('id').from('ROLE').where('name', 'guest').transacting(trx);
            if (!role) {
                throw new Error('Role not created');
            }
            await knex.insert([
                {
                    roleId: role.id,
                    userUuid: user.uuid
                }
            ]).into('USER_ROLE').transacting(trx);
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

    test('Token check if generateToken should return a token and salt', async () => {
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

    const date: Date = new Date();
    const basicTestToken = async () => {
        const [user]: Pick<IUser, 'uuid' | 'username'>[] = await knex.select().from('USER').where(userReflect);
        expect(user).toBeInstanceOf(Object);
        expect(user).toMatchObject({
            uuid: expect.any(Buffer),
            username: expect.any(String)
        });
        const token: Pick<IToken, 'token' | 'salt'> = await Token.generateToken(user as IUser, date);
        expect(token).toBeInstanceOf(Object);
        expect(token).toMatchObject({
            token: expect.any(String),
            salt: expect.any(Buffer)
        });
        return token;
    };

    test('Token check if generateToken should return a good header', async () => {
        const token: Pick<IToken, 'token' | 'salt'> = (await basicTestToken());
        const header: string = token.token.split('.')[0] || '';
        expect(typeof (header)).toBe('string');
        const headerDecoded: {alg: string, exp: string} = JSON.parse(Buffer.from(header, 'base64').toString('utf8'));
        expect(headerDecoded).toMatchObject({
            alg: expect.any(String),
            exp: expect.any(String)
        });
        expect(new Date(headerDecoded.exp)).toBeInstanceOf(Date);
        expect(new Date(headerDecoded.exp).getTime()).toBe(date.getTime());
        expect(headerDecoded.alg).toBe('sha512');
    });

    test('Token check if generateToken should return a good payload', async () => {
        const token: Pick<IToken, 'token' | 'salt'> = (await basicTestToken());
        const payload: string = token.token.split('.')[1] || '';
        expect(typeof (payload)).toBe('string');
        const payloadDecoded: {
            username: string,
            roles: {
                [key: string]: string[]
            }
        } = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
        expect(payloadDecoded).toMatchObject({
            username: expect.any(String),
            roles: expect.any(Object)
        });
        expect(payloadDecoded.username).toBe(userReflect.username);
        expect(payloadDecoded.roles).toMatchObject({
            guest: expect.any(Array),
        });
    });

    test('Token checkk if signatureChecker should return true', async () => {
        const token: Pick<IToken, 'token' | 'salt'> = (await basicTestToken());
        expect(Token.signatureChecker(token.token, token.salt)).toBe(true);
    });
});
