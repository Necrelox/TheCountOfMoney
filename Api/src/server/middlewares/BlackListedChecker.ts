/**
 * Local Modules
 */
import { ITokenFKUser } from '@/models';
import { Token } from '@/services/actions';
import { ErrorEntity, MessageError, errorManager } from '@/utils';

/**
 * Dependencies
 */
import { Request, Response, NextFunction } from 'express';

export async function blackListedChecker(req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
        const [tokenFKUser]: Pick<ITokenFKUser, 'isBlackListed'>[] = await Token.getFKUser({
            token: bearerToken
        }, {
            isBlackListed: true
        });
        if (!tokenFKUser)
            throw new ErrorEntity(MessageError.CLIENT_TOKEN_NOT_FOUND);
        if (tokenFKUser.isBlackListed)
            throw new ErrorEntity(MessageError.CLIENT_USER_IS_BLACKLISTED);
        next();
    } catch (error) {
        errorManager(error, res);
    }
}

