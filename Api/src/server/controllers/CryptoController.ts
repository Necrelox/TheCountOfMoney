/**
 * Local Modules
 */
import { bearerToken, blackListedChecker, permissionChecker } from '@/middlewares';
import { CryptoService } from '@/services';

/**
 * Dependencies
 */
import { Router, IRouter, Request, Response } from 'express';
import { errorManager } from '@/utils';
import { body, validationResult } from 'express-validator';

export class CryptoController {
    /**
     * Get router
     * @private
     * @type {IRouter}
     * @memberof AccountService
     * @readonly
     */
    private _router: IRouter = Router();

    /**
     * Creates an instance of CryptoController and initialize router
     * @memberof AccountService
     * @constructor
     * @public
     */
    constructor() {
        this.initializeCryptoController();
    }

    /**
     * Initialize route of the crypto
     * @private
     * @memberof AccountService
     * @return {void}
     */
    private initializeCryptoController() {
        this._router.get('/actu-rss', bearerToken, blackListedChecker, permissionChecker(['admin', 'crypto-actu-rss']), this.getMethodActuRss);

        this._router.post('/preference',
            body('crypto')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('crypto is required').bail()
                .isString().withMessage('crypto must be a string').bail(),
            bearerToken, blackListedChecker, permissionChecker(['admin', 'origin-crypto-preferences.write']), this.postMethodPreference);

        this._router.get('/preference', bearerToken, blackListedChecker, permissionChecker(['admin', 'origin-crypto-preferences.read']), this.getMethodPreference);

        this._router.delete('/preference',
            body('cryptoId')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('cryptoId is required').bail()
                .isString().withMessage('cryptoId must be a string').bail(),
            bearerToken, blackListedChecker, permissionChecker(['admin', 'user-crypto-preferences.delete']), this.deleteMethodPreference);


        this._router.post('/user-preference',
            body('crypto')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('crypto is required').bail()
                .isString().withMessage('crypto must be a string').bail(),
            bearerToken, blackListedChecker, permissionChecker(['admin', 'user-crypto-preferences', 'user-crypto-preferences.write']), this.postMethodUserPreference);

        this._router.get('/user-preference', bearerToken, blackListedChecker, permissionChecker(['admin', 'user-crypto-preferences', 'user-crypto-preferences.read']), this.getMethodUserPreference);

        this._router.delete('/user-preference',
            body('cryptoId')
                .exists({
                    checkNull: true,
                    checkFalsy: true
                }).withMessage('cryptoId is required').bail()
                .isString().withMessage('cryptoId must be a string').bail(),
            bearerToken, blackListedChecker, permissionChecker(['admin', 'user-crypto-preferences', 'user-crypto-preferences.delete']), this.deleteMethodUserPreference);

    }

    /**
     * Route to get flux rss
     * @param _req
     * @param res
     * @private
     */
    private async getMethodActuRss(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                articles: await CryptoService.getActualityRss()
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async postMethodPreference(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            const crypto = JSON.parse(req.body.crypto);
            await CryptoService.addPreference(crypto);
            res.status(200).send({
                code: 'OK',
                message: 'Preference added'
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async getMethodPreference(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                preferences: await CryptoService.getPreference()
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async postMethodUserPreference(req: Request, res: Response) {
        try {
            validationResult(req).throw();
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            const crypto = JSON.parse(req.body.crypto);
            await CryptoService.addUserPreference(crypto, bearerToken);
            res.status(200).send({
                code: 'OK',
                message: 'User Preference added'
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async getMethodUserPreference(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                preferences: await CryptoService.getUserPreference()
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async deleteMethodUserPreference(req: Request, res: Response) {
        try {
            const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            await CryptoService.deleteUserPreference(req.body.cryptoId, bearerToken);
            res.status(200).send({
                code: 'OK',
                message: 'User Preference deleted'
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async deleteMethodPreference(req: Request, res: Response) {
        try {
            await CryptoService.deletePreference(req.body.cryptoId);
            res.status(200).send({
                code: 'OK',
                message: 'Preference deleted'
            });
        } catch (error) {
            errorManager(error, res);
        }
    }


    public getRouter() {
        return this._router;
    }
}
