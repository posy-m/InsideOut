import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment.model";

@Table({
    timestamps: true,
    tableName: "CComments",
    paranoid: true,
})

export class Ccomment extends Model {

    // @BelongsTo(() => Comment)
    // comment!: Comment;

    // @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nick_name: string;

    // @BelongsTo(() => User)
    // user!: User;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    QnA_com_comment: string;
}