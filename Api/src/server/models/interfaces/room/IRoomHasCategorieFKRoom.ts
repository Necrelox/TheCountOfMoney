/**
 * Local Modules
 */
import { IRoomHasCategorie } from './IRoomHasCategorie';
import { IRoom } from './IRoom';

/**
 * TABLE NAME: ROOM_HAS_CATEGORIE FOREIGN KEY ROOM
 */
export interface IRoomHasCategorieFKRoom extends IRoomHasCategorie, IRoom {}
