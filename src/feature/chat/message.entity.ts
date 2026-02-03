import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Relation,
} from "typeorm";
import { Group } from "../group/group.entity.js";
import { User } from "../user/user.entity.js";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Group, { nullable: true })
  room!: Relation<Group> | null;

  @ManyToOne(() => User, { nullable: false })
  sender!: Relation<User>;

  @ManyToOne(() => User, { nullable: true })
  receiver!: Relation<User> | null;

  @Column({ type: "varchar", default: "text" })
  type!: "text" | "media";

  @Column({ type: "text", nullable: true })
  content!: string | null;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date | null;
}