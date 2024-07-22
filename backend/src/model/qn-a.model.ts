import { Model, Column, Table, DataType, ForeignKey, HasMany, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Comment } from "./comment.model";


@Table({
    timestamps: true,
    tableName: "QnAs",
    modelName: "QnA",
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
})

export class QnA extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id: number;

    // @ForeignKey(() => User)
    @Column({
        type: DataType.STRING(30),
        allowNull: false
    })
    nickName!: string;

    // @BelongsTo(() => User)
    // user!: User;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    qnatitle!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    qnacontent!: string;

    @HasMany(() => Comment)
    comments!: Comment[];
}