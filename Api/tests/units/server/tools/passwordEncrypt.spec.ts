import { PasswordEncrypt } from '../../../../src/server/tools';
import { faker } from '@faker-js/faker';

describe('Testing class passwordEncrypt', () => {
    test('passwordEncrypt should be a class', () => {
        expect(PasswordEncrypt).toBeInstanceOf(Object);
    });

    test('passwordEncrypt should have a encrypt method', () => {
        expect(PasswordEncrypt.encrypt).toBeInstanceOf(Function);
    });

    test('passwordEncrypt should have a verifyPassword method', () => {
        expect(PasswordEncrypt.verifyPassword).toBeInstanceOf(Function);
    });

    test('passwordEncrypt check if encrypt should return a hash', () => {
        const password: string = faker.internet.password();
        const hash: Buffer = PasswordEncrypt.encrypt(password);
        expect(hash).toBeInstanceOf(Buffer);
    });

    test('passwordEncrypt check if verifyPassword should return true', () => {
        const password: string = faker.internet.password();
        const hash: Buffer = PasswordEncrypt.encrypt(password);
        expect(() => PasswordEncrypt.verifyPassword(password, hash)).not.toThrow();
    });
});
