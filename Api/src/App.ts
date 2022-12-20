import { Server } from './server/Server';

/**
 * Main entry point for the application
 */
try {
    new Server().run();
} catch (error) {
    console.log(error);
}
