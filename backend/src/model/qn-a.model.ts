import { Model, Column, Table, DataType } from "sequelize-typescript";


@Table({
    timestamps: true,
    tableName: "QnAs",
    paranoid: true,
})

export class QnA extends Model {
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
}