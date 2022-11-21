/**
 * Local Modules
 */
import { IRoomHasTag } from './IRoomHasTag';
import { IRoom } from './IRoom';

/**
 * TABLE NAME: ROOM_HAS_TAG FOREIGN KEY ROOM
 */
export interface IRoomHasTagFKRoom extends IRoomHasTag, IRoom {}
