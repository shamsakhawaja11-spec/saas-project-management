"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const workspace_entity_1 = require("../workspaces/entities/workspace.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const board_entity_1 = require("../boards/entities/board.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'saas_db',
    entities: [user_entity_1.User, workspace_entity_1.Workspace, project_entity_1.Project, board_entity_1.Board, task_entity_1.Task],
    synchronize: false,
    logging: true,
};
//# sourceMappingURL=database.config.js.map