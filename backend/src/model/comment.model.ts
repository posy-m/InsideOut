import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { QnA } from "./qn-a.model";
import { Ccomment } from "./ccomment.model";

@Table({
    timestamps: true,
    tableName: "Comments",
    paranoid: true,
})

export class Comment extends Model {
    // @HasMany(() => Ccomment)
    // ccomments?: Ccomment[];

    // @ForeignKey(() => QnA)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    qna_id: number;

    // @BelongsTo(() => QnA)
    // qna: QnA;

    // @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nick_name: string;

    // @BelongsTo(() => User)
    // user?: User;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    qna_content?: string;
}