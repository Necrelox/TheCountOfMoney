import { UuidTransform } from '../../../../src/server/utils';

describe('Testing class uuidTransform', () => {
    test('uuidTransform should be a class', () => {
        expect(UuidTransform).toBeInstanceOf(Object);
    });
    test('uuidTransform should have a toBinaryUUID method', () => {
        expect(UuidTransform.toBinaryUUID).toBeInstanceOf(Function);
    });
    test('uuidTransform should have a fromBinaryUUID method', () => {
        expect(UuidTransform.fromBinaryUUID).toBeInstanceOf(Function);
    });
    test('toBinaryUUID should return a Buffer', () => {
        expect(UuidTransform.toBinaryUUID('00000000-0000-0000-0000-000000000000')).toBeInstanceOf(Buffer);
    });
    test('fromBinaryUUID should return a string', () => {
        expect(typeof (UuidTransform.fromBinaryUUID(Buffer.from('00000000000000000000000000000000')))).toBe('string');
    });
});
