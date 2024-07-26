import { Model, Column, Table, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Comment } from "./comment.model";
import { User } from "./user.model";


@Table({
    timestamps: true,
    tableName: "QnAs"
})

export class QnA extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nick_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    qna_title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    qna_content: string;

    @HasMany(() => Comment)
    Comments: Comment[];

    @BelongsTo(() => User)
    Users: User;
}