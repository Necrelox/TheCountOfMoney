const RolesPermission = require('./RolesPermissions.json');

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex.transaction(async (trx) => {
        const roles = [];
        for (let i = 0; i < RolesPermission.roles.length; ++i) {
            roles.push({
                name: RolesPermission.roles[i],
                id: i + 1,
            });
        }

        const modules = [];
        for (let i = 0; i < RolesPermission.modules.length; ++i) {
            modules.push({
                moduleName: RolesPermission.modules[i],
                id: i + 1,
            });
        }
        await knex.insert(roles).into('ROLE').transacting(trx);
        await knex.insert(modules).into('MODULE').transacting(trx);
        const rolesId = await knex.select().from('ROLE').transacting(trx);
        const modulesId = await knex.select().from('MODULE').transacting(trx);

        for (const role of roles) {
            if (RolesPermission.roleModule[role.name]) {
                const roleModule = [];
                for (const module of RolesPermission.roleModule[role.name]) {
                    const roleId = rolesId.find((r) => r.name === role.name).id;
                    const moduleId = modulesId.find((m) => m.moduleName === module).id;
                    roleModule.push({
                        roleId,
                        moduleId,
                    });
                }
                await knex.insert(roleModule).into('ROLE_MODULE').transacting(trx);
            }
        }

    });
};
