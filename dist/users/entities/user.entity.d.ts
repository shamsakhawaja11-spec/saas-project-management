import { Workspace } from "../../workspaces/entities/workspace.entity";
import { Comment } from "../../comments/entities/comment.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    workspace: Workspace[];
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
}
//# sourceMappingURL=user.entity.d.ts.map