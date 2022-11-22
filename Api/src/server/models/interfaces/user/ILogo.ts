/**
 * TABLE NAME: USER_LOGO
 */
export interface ILogo {
    path: string;
    createdAt: Date;
    seed: number;
    sizeMo: number;
    active: boolean;
    userUuid: Buffer;
    uuid: Buffer;
}
