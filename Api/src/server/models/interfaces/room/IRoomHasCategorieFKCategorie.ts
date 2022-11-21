/**
 * Local Modules
 */
import { ICategorie } from './ICategorie';
import { IRoomHasCategorie } from './IRoomHasCategorie';

/**
 * TABLE NAME: ROOM_HAS_CATEGORIE FOREIGN KEY CATEGORIE
 */
export interface IRoomHasCategorieFKCategorie extends IRoomHasCategorie, ICategorie {}
