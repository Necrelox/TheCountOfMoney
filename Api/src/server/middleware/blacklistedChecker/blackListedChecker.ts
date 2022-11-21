import { Request, Response, NextFunction } from 'express';
import { ITokenFKUser } from '../../models';
import { Token } from '../../services';
import { MessageError } from '../../enum/messageError';

export async function blackListedChecker(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1] as string;
        const [tokenFKUser]: Pick<ITokenFKUser, 'isBlackListed'>[] = await Token.getFKUser({
            token: bearerToken
        }, {
            isBlackListed: true
        });
        if (!tokenFKUser)
            throw {
                code: 500,
                message: MessageError.TOKEN_FK_USER_NOT_FOUND
            };
        if (tokenFKUser.isBlackListed)
            throw {
                code: 403,
                message: MessageError.USER_IS_BLACKLISTED
            };
        next();
    } catch (error) {
        res.status(403).send({
            content: error
        });
    }
}

