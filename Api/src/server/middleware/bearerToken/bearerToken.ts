import { NextFunction, Request, Response } from 'express';
import { MessageError } from '../../enum/messageError';
import { Token } from '../../services';
import { IToken, ITokenFKUser } from '../../models';
import { Token as tokenTools } from '../../tools';

async function verifyExpiration(bearerToken: string) {
    const [token]: Pick<ITokenFKUser, 'expireAt' | 'userUuid' | 'username'>[] = await Token.getFKUser({
        token: bearerToken
    }, {
        expireAt: true,
        userUuid: true,
        username: true,
    });
    if (!token)
        throw {
            code: 400,
            message: MessageError.TOKEN_NOT_FOUND
        };
    if (token.expireAt < new Date()) {
        const expireAt = new Date(Date.now() + (1000 * 60 * 60));
        const tokenGenerated: Pick<IToken, 'token' | 'salt'> = await tokenTools.generateToken({
            uuid: token.userUuid,
            username: token.username
        }, expireAt);
        await Token.create({
            token: tokenGenerated.token,
            salt: tokenGenerated.salt,
            userUuid: token.userUuid,
            expireAt,
        });
        throw {
            code: 400,
            message: MessageError.TOKEN_EXPIRED,
            token: tokenGenerated.token,
            expireAt,
        };
    }
}

async function verifySignature(bearerToken: string) {
    const [token]: Pick<IToken, 'salt'>[] = await Token.get({
        token: bearerToken
    }, {
        salt: true
    });
    if (!token)
        throw {
            code: 400,
            message: MessageError.TOKEN_NOT_FOUND
        };
    if (!tokenTools.signatureChecker(bearerToken, token.salt))
        throw {
            code: 400,
            message: MessageError.TOKEN_INVALID_SIGNATURE
        };
}

async function checkIfAuthorizationExistAndNotEmpty(req: Request) {
    if (!('authorization' in req.headers)  || req.headers.authorization === undefined || req.headers.authorization === '')
        throw {
            code: 400,
            message: MessageError.TOKEN_NOT_GIVEN
        };
}

export async function bearerToken(req: Request, res: Response, next: NextFunction) {
    try {
        await checkIfAuthorizationExistAndNotEmpty(req);
        const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
        await verifySignature(bearerToken);
        await verifyExpiration(bearerToken);
        next();
    } catch (error: any) {
        res.status(error.code || 401).send({
            content: error
        });
    }
}
