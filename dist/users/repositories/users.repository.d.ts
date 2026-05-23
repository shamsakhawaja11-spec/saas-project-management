import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class UsersRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(email: string): Promise<User | null>;
    userExists(email: string): Promise<boolean>;
}
//# sourceMappingURL=users.repository.d.ts.map