import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { QnA } from "./qn-a.model";
import { Ccomment } from "./ccomment.model";

@Table({
    timestamps: true,
    tableName: "Comments",
    paranoid: true,
})

export class Comment extends Model {
    @ForeignKey(() => QnA)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    qna_id: number

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
    qna_comment: string;

    @HasMany(() => Ccomment)
    Ccomments: Ccomment[];

    @BelongsTo(() => User)
    Users: User;

    @BelongsTo(() => QnA)
    QnAs: QnA

}