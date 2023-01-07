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
import { body } from 'express-validator';

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

        this._router.get('/preference', bearerToken, blackListedChecker, permissionChecker(['admin', 'crypto-preference']), this.getMethodActuRss);
        this._router.post('/preference', bearerToken, blackListedChecker, permissionChecker(['admin', 'crypto-preference']), this.getMethodActuRss);
        this._router.delete('/preference', bearerToken, blackListedChecker, permissionChecker(['admin', 'crypto-preference']), this.getMethodActuRss);
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

    private async getMethodPreference(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                preference: await CryptoService.getPreference()
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async postMethodPreference(_req: Request, res: Response) {
        try {
            res.status(200).send({
                code: 'OK',
                message: 'Preference added'
            });
        } catch (error) {
            errorManager(error, res);
        }
    }

    private async deleteMethodPreference(_req: Request, res: Response) {
        try {
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
