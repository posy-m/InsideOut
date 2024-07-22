import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment.model";

@Table({
    timestamps: true,
    tableName: "CComments",
    modelName: "CComent",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
})

export class Ccomment extends Model {
    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    QnA_comment_ID: number;

    @BelongsTo(() => Comment)
    comment!: Comment;

    // @ForeignKey(() => User)
    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    nick_name: string;

    // @BelongsTo(() => User)
    // user!: User;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    QnA_com_comment: string;
}