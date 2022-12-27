export enum MessageError {
    CRYPTO_FAVORITES = 'Error while loading favorites.',
    CRYPTO_GRAPH_DATA = 'Error while loading graph data.',
    CRYPTO_DATA = 'Error while loading crypto data.',
    CRYPTO_NO_DATA_FOUND = 'Data not found.',
    CANDLEGRAPH_NO_FAVORITES = 'Favorites state is null.',
    CANDLEGRAPH_NO_EVENT_TARGET_VALUE = 'Event target value is missing.',
}

export class ErrorEntity extends Error {
    /**
     * The code of the error
     * @type number
     */
    private readonly code: number;
    /**
     * Collection of error messages
     */
    private readonly MessageAndCode = {
        [MessageError.CRYPTO_FAVORITES]: 400,
        [MessageError.CRYPTO_GRAPH_DATA]: 400,
        [MessageError.CRYPTO_DATA]: 400,
        [MessageError.CRYPTO_NO_DATA_FOUND]: 400,
        [MessageError.CANDLEGRAPH_NO_FAVORITES]: 400,
        [MessageError.CANDLEGRAPH_NO_EVENT_TARGET_VALUE]: 400,
    };

    private static createBetterSqlMessageError(sqlCode: string, sqlMessage: string): string {
        if (sqlCode === 'ER_DUP_ENTRY') {
            const messageSplit = sqlMessage.split('\'');
            const value = messageSplit[1];
            const column = (messageSplit[3]?.split('.')[1])?.split('_')[0];
            return `This ${column} : ${value} is already used.`;
        }
        return sqlMessage;
    }

    /**
     * Create an error manager
     * @param message
     * @param sqlMessage
     * @param sqlCode
     */
    constructor(message: MessageError, sqlMessage?: string, sqlCode?: string) {
        super(message);
        this.code = this.MessageAndCode[message];
        if (sqlMessage && sqlCode)
            this.message = ErrorEntity.createBetterSqlMessageError(sqlCode.toString(), sqlMessage);

    }

    public getCode(): number {
        return this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}
