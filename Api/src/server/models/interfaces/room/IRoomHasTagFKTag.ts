/**
 * Local Modules
 */
import { IRoomHasTag } from './IRoomHasTag';
import { ITag } from './ITag';

/**
 * TABLE NAME: ROOM_HAS_TAG FOREIGN KEY TAG
 */
export interface IRoomHasTagFKTag extends IRoomHasTag, ITag {}
