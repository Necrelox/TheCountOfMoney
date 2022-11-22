import { Server } from './server/server';

/**
 * Main entry point for the application
 */
try {
    new Server().run();
} catch (error) {
    console.log(error);
}
