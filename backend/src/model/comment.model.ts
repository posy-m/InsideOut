import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { QnA } from "./qn-a.model";
import { Ccomment } from "./ccomment.model";

@Table({
    timestamps: true,
    tableName: "Comments",
    modelName: "Comment",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
})

export class Comment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id: Number;

    @HasMany(() => Ccomment)
    ccomments!: Ccomment[];

    @ForeignKey(() => QnA)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    qna_id!: number;

    @BelongsTo(() => QnA)
    qna!: QnA;

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
    qna_content!: string;
}