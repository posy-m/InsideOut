import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Comment } from "./comment.model";

@Table({
    timestamps: true,
    tableName: "Ccomments"
})

export class Ccomment extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    qna_com_comment: string;

    @ForeignKey(() => User)
    @Column
    nick_name: string;

    @BelongsTo(() => User)
    Users: User;

    @ForeignKey(() => Comment)
    @Column
    qna_comment_id: number

    @BelongsTo(() => Comment)
    Comments: Comment;

}