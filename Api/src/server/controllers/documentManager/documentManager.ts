/**
 * Dependencies
 */
import { IRouter, Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';
import { UploadedFile } from 'express-fileupload';

/**
 * Local modules
 */
import { bearerToken, blackListedChecker } from '../../middleware';
// import bindings from 'bindings';

/**
 * DocumentManagerController class : is the controller of the account module
 */
export class DocumentManager {

    /**
     * Get router
     * @private
     * @type {IRouter}
     * @memberof AccountController
     * @readonly
     */
    private _router: IRouter = Router();

    // private _Orchestrateur = bindings('../prod/addons/build/Release/Orchestrateur.node');

    /**
     * Creates an instance of DocumentManagerController and initialize router
     * @memberof DocumentManagerController
     * @constructor
     * @public
     */
    constructor() {
        this.initializeDocumentManager();
    }

    /**
     * Initialize route of the account module
     * @private
     * @memberof AccountController
     * @return {void}
     */
    private initializeDocumentManager() {
        this._router.post('/',
            check('file').custom((_value, { req }) => {
                return !!req.files?.file;
            }).withMessage('file is required').bail(),
            bearerToken, blackListedChecker, this.postSendDocument);
    }


    /**
     * Route to send a document
     * @param req
     * @param res
     * @private
     */
    private async postSendDocument(req: Request, res: Response) {
        try {
            // const bearerToken : string = req.headers.authorization?.split(' ')[1] as string;
            validationResult(req).throw();

            const file: UploadedFile = req.files?.file as UploadedFile;

            console.log(file.tempFilePath);
            res.status(200).send({
                code: 'OK',
                message: 'Send document successfully.',
            });
        } catch (error) {
            res.status(500).send({
                error
            });
        }
    }


    public getRouter() {
        return this._router;
    }
}

