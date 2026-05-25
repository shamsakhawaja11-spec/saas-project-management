"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const workspace_entity_1 = require("../workspaces/entities/workspace.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'saas_db',
    entities: [user_entity_1.User, workspace_entity_1.Workspace],
    synchronize: true,
    logging: true,
};
//# sourceMappingURL=database.config.js.map