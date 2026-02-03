import { Relation } from "typeorm";
import { User } from "../user/user.entity.js";
export declare class Group {
    id: string;
    admin: Relation<User>;
    members: Relation<User[]>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
//# sourceMappingURL=group.entity.d.ts.map