var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from "typeorm";
import { Group } from "../group/group.entity.js";
import { User } from "../user/user.entity.js";
let Message = class Message {
    id;
    room;
    sender;
    receiver;
    type;
    content;
    isRead;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Group, { nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "room", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false }),
    __metadata("design:type", Object)
], Message.prototype, "sender", void 0);
__decorate([
    ManyToOne(() => User, { nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "receiver", void 0);
__decorate([
    Column({ type: "varchar", default: "text" }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "content", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isRead", void 0);
__decorate([
    CreateDateColumn({ name: "created_at" }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at" }),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at" }),
    __metadata("design:type", Object)
], Message.prototype, "deletedAt", void 0);
Message = __decorate([
    Entity({ name: "messages" })
], Message);
export { Message };
//# sourceMappingURL=message.entity.js.map