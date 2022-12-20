/**
 * Local Modules
 */
import { IToken, ITokenFKUser } from '@/models';
import { Token } from '@/services/actions';
import { Token as tokenTools, MessageError, ErrorEntity, errorManager } from '@/utils';
/**
 * Dependencies
 */
import { NextFunction, Request, Response } from 'express';

async function verifyExpiration(bearerToken: string) {
    const [token]: Pick<ITokenFKUser, 'expireAt' | 'userUuid' | 'username'>[] = await Token.getFKUser({
        token: bearerToken
    }, {
        expireAt: true,
        userUuid: true,
        username: true,
    });
    if (!token)
        throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);
    if (token.expireAt < new Date()) {
        const expireAt = new Date(Date.now() + (1000 * 60 * 60));
        const tokenGenerated: Pick<IToken, 'token' | 'salt'> = await tokenTools.generateToken({
            uuid: token.userUuid,
            username: token.username
        }, expireAt);

        await Token.update({
            token: tokenGenerated.token,
            salt: tokenGenerated.salt,
            expireAt
        }, {
            userUuid: token.userUuid
        });
        throw new ErrorEntity(MessageError.CLIENT_TOKEN_EXPIRED);
    }
}

async function verifySignature(bearerToken: string) {
    const [token]: Pick<IToken, 'salt'>[] = await Token.get({
        token: bearerToken
    }, {
        salt: true
    });
    if (!token)
        throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);
    if (!tokenTools.signatureChecker(bearerToken, token.salt))
        throw new ErrorEntity(MessageError.CLIENT_TOKEN_INVALID_SIGNATURE);
}

function checkBearerExists(authorization: string) {
    const bearerToken: string = authorization?.split(' ')[1] as string;
    if (!bearerToken)
        throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);
}

export async function bearerToken(req: Request, res: Response, next: NextFunction) {
    try {
        checkBearerExists(req.headers.authorization as string);
        await verifySignature(req.headers.authorization?.split(' ')[1] as string);
        await verifyExpiration(req.headers.authorization?.split(' ')[1] as string);
        next();
    } catch (error) {
        errorManager(error, res);
    }
}
