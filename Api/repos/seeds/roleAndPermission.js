const modules = [
  {
    url: '/signup', // register
    id: 1,
  },
  {
    url: '/login', // login
    id: 2,
  },
  {
    url: '/logout', // logout
    id: 3,
  },
  {
    url: '/home', // home
    id: 4,
  },
  {
    url: '/admin', // admin: have acess to all admin pages
    id: 5,
  },
  {
    url: '/document-manager', // document manager (page for upload and manage document)
    id: 6,
  },
  {
    url: '/skillzbox', // skillzbox is a tchat box with room
    id: 7,
  },
  {
    url: '/passwd-manager', // password manager (page for create and manage password)
    id: 8,
  },
  {
    url: '/note', // note (page for create and manage note (like a list of webtoons or series or movies))
    id: 9,
  },
  {
    url: '/mailer-template', // mailer template is a page for create and manage mailer template
    id: 10,
  },
  {
    url: '/stream', // stream is a page for download series or movies in torrent and watch it
    id: 11,
  },
  {
    url: '/mapper-network', // mapper network is link to an process daemon in computer of user for map network
    id: 12,
  },
  {
    url: '/ub', // ub is a page for play to a flip coin game with an 3d animation like deceit
    id: 13,
  },
  {
    url: '/recup-plast', // recup plast is a page for esp project
    id: 14,
  }
];
const roles = [
  {
    name: 'ech',
    id: 1,
  },
  {
    name: 'admin',
    id: 2,
  },
  {
    name: 'famille',
    id: 3,
  },
  {
    name: 'recupPlast',
    id: 4,
  },
  {
    name: 'amis',
    id: 5,
  },
  {
    name: 'msc',
    id: 6,
  },
  {
    name: 'guest',
    id: 7,
  },
];
const rolesModules = [
  /** --- ECH --- */
  {
    roleId: 1,
    moduleId: 1,
  }, // register
  {
    roleId: 1,
    moduleId: 2,
  }, // login
  {
    roleId: 1,
    moduleId: 3,
  }, // logout
  {
    roleId: 1,
    moduleId: 4,
  }, // home
  {
    roleId: 1,
    moduleId: 5,
  }, // admin
  {
    roleId: 1,
    moduleId: 6,
  }, // document manager
  {
    roleId: 1,
    moduleId: 7,
  }, // skillzbox
  {
    roleId: 1,
    moduleId: 8,
  }, // passwd manager
  {

    roleId: 1,
    moduleId: 9,
  }, // note
  {
    roleId: 1,
    moduleId: 10,
  }, // mailer template
  {
    roleId: 1,
    moduleId: 11,
  }, // stream
  {
    roleId: 1,
    moduleId: 12,
  }, // mapper network
  {
    roleId: 1,
    moduleId: 13,
  }, // ub
  {
    roleId: 1,
    moduleId: 14,
  }, // recup plast

  /** --- ADMIN --- */
  {
    roleId: 2,
    moduleId: 2,
  }, // login
  {
    roleId: 2,
    moduleId: 3,
  }, // logout
  {
    roleId: 2,
    moduleId: 4,
  }, // home
  {
    roleId: 2,
    moduleId: 5,
  }, // admin
  {
    roleId: 2,
    moduleId: 6,
  }, // document manager
  {
    roleId: 2,
    moduleId: 7,
  }, // skillzbox
  {
    roleId: 2,
    moduleId: 8,
  }, // passwd manager
  {
    roleId: 2,
    moduleId: 9,
  }, // note
  {
    roleId: 2,
    moduleId: 10,
  }, // mailer template
  {
    roleId: 2,
    moduleId: 11,
  }, // stream

  /** --- FAMILLE --- */
  {
    roleId: 3,
    moduleId: 2,
  }, // login
  {
    roleId: 3,
    moduleId: 3,
  }, // logout
  {
    roleId: 3,
    moduleId: 4,
  }, // home
  {
    roleId: 3,
    moduleId: 6,
  }, // document manager
  {
    roleId: 3,
    moduleId: 7,
  }, // skillzbox
  {
    roleId: 3,
    moduleId: 8,
  }, // passwd manager
  {
    roleId: 3,
    moduleId: 9,
  }, // note
  {
    roleId: 3,
    moduleId: 10,
  }, // mailer template
  {
    roleId: 3,
    moduleId: 11,
  }, // stream

  /** --- RECUPPLAST --- */
  {
    roleId: 4,
    moduleId: 2,
  }, // login
  {
    roleId: 4,
    moduleId: 3,
  }, // logout
  {
    roleId: 4,
    moduleId: 14,
  }, // recup plast

  /** --- AMIS --- */
  {
    roleId: 5,
    moduleId: 2,
  }, // login
  {
    roleId: 5,
    moduleId: 3,
  }, // logout
  {
    roleId: 5,
    moduleId: 4,
  }, // home
  {
    roleId: 5,
    moduleId: 6,
  }, // document manager
  {
    roleId: 5,
    moduleId: 7,
  }, // skillzbox
  {
    roleId: 5,
    moduleId: 8,
  }, // passwd manager
  {
    roleId: 5,
    moduleId: 9,
  }, // note
  {
    roleId: 5,
    moduleId: 10,
  }, // mailer template
  {
    roleId: 5,
    moduleId: 11,
  }, // stream

  /** --- MSC --- */
  {
    roleId: 6,
    moduleId: 2,
  }, // login
  {
    roleId: 6,
    moduleId: 3,
  }, // logout
  {
    roleId: 6,
    moduleId: 4,
  }, // home
  {
    roleId: 6,
    moduleId: 9,
  }, // note
  {
    roleId: 6,
    moduleId: 11,
  }, // stream

  /** --- GUEST --- */
  {
    roleId: 7,
    moduleId: 2,
  }, // login
  {
    roleId: 7,
    moduleId: 3,
  }, // logout
  {
    roleId: 7,
    moduleId: 4,
  }, // home
  {
    roleId: 7,
    moduleId: 9,
  }, // note
  {
    roleId: 7,
    moduleId: 11,
  }, // stream
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex.transaction(async (trx) => {
    await knex.insert(modules).into('MODULE').transacting(trx);
    await knex.insert(roles).into('ROLE').transacting(trx);
    await knex.insert(rolesModules).into('ROLE_MODULE').transacting(trx);
  });
};
