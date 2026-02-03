import { Relation } from "typeorm";
import { Group } from "../group/group.entity.js";
import { User } from "../user/user.entity.js";
export declare class Message {
    id: string;
    room: Relation<Group> | null;
    sender: Relation<User>;
    receiver: Relation<User> | null;
    type: "text" | "media";
    content: string | null;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
//# sourceMappingURL=message.entity.d.ts.map