import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { QnA } from "./qn-a.model";
import { Comment } from "./comment.model";
import { Ccomment } from "./ccomment.model";

@Table({
    timestamps: true,
    tableName: "Users"
})

export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    uid: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    upw: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nick_name: string

    @HasMany(() => QnA)
    QnAs: QnA[];

    @HasMany(() => Comment)
    Comments: Comment[];

    // @HasMany(() => Ccomment)
    // Ccomments: Ccomment[];

}