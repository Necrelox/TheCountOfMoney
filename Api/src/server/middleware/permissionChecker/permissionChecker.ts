/**
 * Local modules
 */
import { MessageError } from '../../enum/messageError';

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
            for (const item of permissionsToSearch) {
                const roles = Object.keys(payloadJson.roles);
                console.log(roles);
                let hasPermission = false;
                for (const role of roles) {
                    const permissionsOfRoles = payloadJson.roles[role];
                    if (Array.isArray(permissionsOfRoles) && permissionsOfRoles.includes(item)) {
                        hasPermission = true;
                        break;
                    }
                }
                if (!hasPermission)
                    throw {
                        code: 403,
                        message: MessageError.PERMISSION_DENIED
                    };
            }
            next();
        } catch (error: any) {
            res.status(error.code || 401).send({
                content: error
            });
        }
    };
}
