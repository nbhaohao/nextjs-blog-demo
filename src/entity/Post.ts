import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  title: string;
  @Column("text")
  content: string;
  @ManyToOne("User", "posts")
  @JoinColumn({ name: "author_id" })
  author: User;
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
