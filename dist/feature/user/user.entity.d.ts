import { Message } from "../chat/message.entity.js";
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    sentMessages: Message[];
}
//# sourceMappingURL=user.entity.d.ts.map