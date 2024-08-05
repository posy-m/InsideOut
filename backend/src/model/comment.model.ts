import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { QnA } from "./qn-a.model";
import { Ccomment } from "./ccomment.model";

@Table({
    timestamps: true,
    tableName: "Comments"
})

export class Comment extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    qna_comment: string;

    @HasMany(() => Ccomment, {
        sourceKey: "id",
        foreignKey: "qna_comment_id"
    })
    Ccomments: Ccomment[];

    @ForeignKey(() => User)
    @Column
    nick_name: string;

    @BelongsTo(() => User)
    Users: User;

    @ForeignKey(() => QnA)
    @Column
    qna_id: number

    @BelongsTo(() => QnA)
    QnAs: QnA

}