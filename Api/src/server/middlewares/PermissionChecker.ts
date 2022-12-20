/**
 * Local modules
 */
import { MessageError, ErrorEntity, errorManager } from '@/utils';

/**
 * Dependencies
 */
import { Request, Response, NextFunction } from 'express';

export function permissionChecker(permissionsToSearch: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const bearerToken: string = req.headers.authorization?.split(' ')[1] as string;
            const payload: string = bearerToken.split('.')[1] as string;
            const payloadJson: Required<{
                username: string,
                roles: {
                    [key: string]: string[]
                }
            }> = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
            let hasPermission = false;
            for (const item of permissionsToSearch) {
                const roles = Object.keys(payloadJson.roles);
                for (const role of roles) {
                    const permissionsOfRoles = payloadJson.roles[role];
                    if (Array.isArray(permissionsOfRoles) && permissionsOfRoles.includes(item)) {
                        hasPermission = true;
                        break;
                    }
                }
            }
            if (!hasPermission)
                throw new ErrorEntity(MessageError.CLIENT_PERMISSION_DENIED);
            next();
        } catch (error) {
            errorManager(error, res);
        }
    };
}
