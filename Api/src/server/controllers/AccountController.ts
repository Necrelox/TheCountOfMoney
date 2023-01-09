/**
 * Local modules
 */
import { IToken, IUser } from '@/models';
import { bearerToken, blackListedChecker, permissionChecker } from '@/middlewares';
import { AccountService } from '@/services';
import { errorManager, Mailer, PasswordEncrypt } from '@/utils';

/**
 * Dependencies
 */
import { Router, IRouter, Request, Response } from 'express';
import { body, check, oneOf, validationResult } from 'express-validator';

/**
 * AccountService class : is the controller of the account module
 */
export class AccountController {

    /**
     * Get router
     * @private
     * @type {IRouter}
     * @memberof AccountService
     * @readonly
     */
    private _router: IRouter = Router();

    /**
     * Creates an instance of AccountService and initialize router
     * @memberof AccountService
     * @constructor
     * @public
     */
    constructor() {
        this.initializeAccountController();
    }

    /**
     * Initialize route of the account
     * @private
     * @memberof AccountService
     * @return {void}
     */
    private initializeAccountController() {
        this._router.post('/signup',
            body('email')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Email is required.').bail()
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('Email is not valid.').bail()
                .isEmail().withMessage('Email is not valid').bail()
                .custom(async (value) => {
                    await Mailer.checkEmailIsTemporary(value);
                }).withMessage('Email is temporary mail.').bail(),
            body('username')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Username is required.').bail()
                .matches(/^\w+$/).withMessage('Username is not valid.').bail()
                .isLength({
                    min: 4,
                    max: 20
                }).withMessage('Username must be between 4 and 20 characters.').bail(),
            body('password')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Password is required.').bail()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one capital letter and one number.').bail()
                .isLength({
                    min: 6,
                    max: 32
                }).withMessage('Password must be between 6 and 32 characters.').bail(),
            this.postMethodSignup);


        this._router.post('/login',
            oneOf([
                check('email')
                    .exists({
                        checkNull: true,
                        checkFalsy: true,
                    }).withMessage('Email is required.').bail()
                    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('Email is not valid.').bail()
                    .isEmail().withMessage('Email is not valid.').bail(),
                check('username')
                    .exists({
                        checkNull: true,
                        checkFalsy: true,
                    }).withMessage('Username is required.').bail()
                    .matches(/^\w+$/).withMessage('Username is not valid.').bail()
                    .isLength({
                        min: 4,
                        max: 20
                    }).withMessage('Username must be between 4 and 20 characters.').bail(),
            ]),
            body('password')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Password is required.').bail()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one capital letter and one number.').bail()
                .isLength({
                    min: 6,
                    max: 32
                }).withMessage('Password must be between 6 and 32 characters.').bail(),
            this.postMethodLogin);


        this._router.post('/login-cli',
            oneOf([
                check('username')
                    .exists({
                        checkNull: true,
                        checkFalsy: true,
                    }).withMessage('Username is required.').bail()
                    .matches(/^\w+$/).withMessage('Username is not valid.').bail()
                    .isLength({
                        min: 4,
                        max: 20
                    }).withMessage('Username must be between 4 and 20 characters.').bail(),
                check('email')
                    .exists({
                        checkNull: true,
                        checkFalsy: true,
                    }).withMessage('Email is required.').bail()
                    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('Email is not valid.').bail()
                    .isEmail().withMessage('Email is not valid').bail(),
            ]),
            body('password')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Password is required.').bail()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one capital letter and one number.').bail()
                .isLength({
                    min: 6,
                    max: 32
                }).withMessage('Password must be between 6 and 32 characters.').bail(),
            body('ip')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Ip is required.').bail()
                .matches(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/).withMessage('Ip is not valid.').bail(),
            body('deviceType')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Device type is required.').bail(),
            body('macAddress')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('Mac address is required.').bail()
                .matches(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/).withMessage('Mac address is not valid.').bail(),
            this.postMethodLoginCli);

        this._router.post('/logout', bearerToken, this.postMethodLogout);

        this._router.get('/me', bearerToken, blackListedChecker, permissionChecker(['admin', 'account', 'account.read']), this.getMethodMe);

        this._router.put('/me',
            body('email')
                .optional()
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('Email is not valid.').bail()
                .isEmail().withMessage('Email is not valid').bail(),
            body('username')
                .optional()
                .matches(/^\w+$/).withMessage('Username is not valid.').bail()
                .isLength({
                    min: 4,
                    max: 20
                }).withMessage('Username must be between 4 and 20 characters.').bail(),
            body('password')
                .optional()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).withMessage('Password must contain at least one capital letter and one number.').bail()
                .isLength({
                    min: 6,
                    max: 32
                }).withMessage('Password must be between 6 and 32 characters.').bail(),
            body('activityMessage')
                .optional()
                .isLength({
                    min: 1,
                    max: 120
                }).withMessage('Activity message must be between 1 and 120 characters.').bail(),
            bearerToken, blackListedChecker, permissionChecker(['admin', 'account', 'account.write']), this.putMethodMe);

    }

    /**
     * Route to signup a new user
     * @param req
     * @param res
     */
    private async postMethodSignup(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            await AccountService.createAccountTransaction({
                email: req.body.email,
                username: req.body.username,
                password: PasswordEncrypt.encrypt(req.body.password)
            });
            res.status(201).send({
                code: 'OK',
                message: 'User created successfully.',
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    /**
     * Route to login a user
     * @param req
     * @param res
     * @private
     */
    private async postMethodLogin(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            const userReflect: Pick<IUser, 'email' | 'username' | 'password'> = req.body;
            const token: Pick<IToken, 'token' | 'expireAt'> = await AccountService.loginAndGetTokenTransaction(userReflect, req.body.password);
            res.status(200).send({
                code: 'OK',
                message: 'User has logged in.',
                token: token.token,
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    /**
     * Route to login a user with information from a client
     * @param req
     * @param res
     * @private
     */
    private async postMethodLoginCli(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            const userReflect: Pick<IUser, 'email' | 'username' | 'password'> = req.body;
            const token: Pick<IToken, 'token' | 'expireAt'> = await AccountService.loginAndGetTokenTransaction(userReflect, req.body.password, {
                ip: req.body.ip,
                device: req.body.deviceType,
                macAddress: req.body.macAddress
            });
            res.status(200).send({
                code: 'OK',
                message: 'User has logged in.',
                token: token.token,
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    /**
     * Route to logout a user
     * @param req
     * @param res
     * @private
     */
    private async postMethodLogout(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await AccountService.logoutUserTransaction(bearerToken);
            res.status(200).send({
                code: 'OK',
                message: 'User logout successfully.',
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    /**
     * Route to get information of a user
     * @param req
     * @param res
     * @private
     */
    private async getMethodMe(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            res.status(200).send({
                code: 'OK',
                message: 'User information.',
                userInfo: await AccountService.getUserInfoTransaction(bearerToken),
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    /**
     * Route to put information of a user
     * @param req
     * @param res
     * @private
     */
    private async putMethodMe(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await AccountService.updateUserInfoTransaction(bearerToken, req.body);
            res.status(200).send({
                code: 'OK',
                message: 'User updated.',
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    public getRouter() {
        return this._router;
    }
}

