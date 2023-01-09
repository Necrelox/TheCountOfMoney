/**
 * Dependencies
 */
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { config } from 'dotenv';
import rateLimit from 'express-rate-limit';
import fileUpload from 'express-fileupload';
// import { serve, setup } from 'swagger-ui-express';
// import swaggerJSDoc, { OAS3Options } from 'swagger-jsdoc';

/**
 * Local modules
 */
// import Swagger from './swagger.json';
import { DatabaseKnex } from '@/services';
import {
    AccountController,
    CryptoController
} from '@/controllers';

/**
 * Server class : is the main class of the application
 * It is responsible for the initialization of the server, the connection to the database, the routes, the swagger and other.
 */
export class Server {
    /**
     * The express application
     * @type {express.Application}
     */
    private readonly app: express.Express = express();

    /**
     * Creates an instance of Server.
     * Set title of the application, the version and initialize the server.
     * @memberof Server
     * @constructor
     * @public
     */
    constructor() {
        this.app.set('title', 'IOM - API');
        this.app.set('version', '3.0.0');
        this.initializeServer();
    }

    /**
     * Initialize the server module (middlewares, routes, database, etc.)
     * @private
     * @memberof Server
     * @return {void}
     */
    private initializeServer() {
        config();
        this.initDefaultMiddleware();
        this.initializeRoutes();
        DatabaseKnex.initializeDatabasePool();
    }

    /**
     * Initialize the default middlewares
     * @private
     * @memberof Server
     * @return {void}
     */
    private initDefaultMiddleware() {
        this.initMiddlewareCors();
        this.initMiddlewareHelmet();
        this.initMiddlewareExpress();
        this.initMiddlewareSwagger();
        this.initMiddlewareRateLimit();
    }

    /**
     * Initialize the middleware CORS (Cross-Origin Resource Sharing)
     * @private
     * @memberof Server
     * @return {void}
     */
    private initMiddlewareCors() {
        this.app.use(cors({
            origin: '*',
        }));
    }

    /**
     * Initialize the middleware Helmet (helps you secure your Express apps by setting various HTTP headers)
     * @private
     * @memberof Server
     * @return {void}
     */
    private initMiddlewareHelmet() {
        this.app.use(helmet());
    }

    /**
     * Initialize the middleware Express
     * @private
     * @memberof Server
     * @return {void}
     */
    private initMiddlewareExpress() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }));
    }

    /**
     * Initialize the middleware Swagger
     * @private
     * @memberof Server
     * @return {void}
     */
    private initMiddlewareSwagger() {
        // const options: OAS3Options = {
        //     swaggerDefinition: swagger,
        //     apis: ['**/*.ts'],
        // };
        // this.app.use('/api-docs', serve, setup(swaggerJSDoc(options)));
    }

    /**
     * Initialize the middleware Rate Limit
     * @private
     * @memberof Server
     * @return {void}
     */
    private initMiddlewareRateLimit() {
        this.app.use(rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 1000, // limit each IP to 100 requests per windowMs
            statusCode: 429,
            message: 'Too many requests, please try again later.',
        }));
    }

    /**
     * Initialize the Controllers contains the routes of the application
     * @private
     * @memberof Server
     * @return {void}
     */
    private initializeRoutes() {
        this.app.use('/account', new AccountController().getRouter());
        this.app.use('/crypto', new CryptoController().getRouter());
    }

    /**
     * Run the server
     * @private
     * @memberof Server
     * @return {void}
     */
    public run() {
        this.app.listen(process.env.PORT || 3001);
        console.log(`Server is running on port ${process.env.PORT || 3001}`);
    }
}
