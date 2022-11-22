/** Local Modules */
import { IURole } from './IURole';
import { IRole, IRoleModule, IModule } from '../permission';

/** TABLE NAME: USER_ROLE FOREIGN KEY ROLE FOREIGN KEY ROLE_MODULE FOREIGN KEY MODULE */
export interface IURoleFKRoleFKRoleModuleFKModule extends IURole, IRole, IRoleModule, IModule {}
