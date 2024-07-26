import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Comment } from "./comment.model";

@Table({
    timestamps: true,
    tableName: "CComments",
    paranoid: true,
})

export class Ccomment extends Model {
    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    QnA_comment_ID: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nick_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    qna_com_comment: string;

    @BelongsTo(() => User)
    Users: User;

    // @BelongsTo(() => Comment)
    // Comments: Comment;

}