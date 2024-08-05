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
        allowNull: false,
        unique: true
    })
    nick_name: string

    @HasMany(() => QnA, {
        sourceKey: "nick_name",
        foreignKey: "nick_name"
    })
    QnAs: QnA[];

    @HasMany(() => Comment, {
        sourceKey: "nick_name",
        foreignKey: "nick_name"
    })
    Comments: Comment[];

    @HasMany(() => Ccomment, {
        sourceKey: "nick_name",
        foreignKey: "nick_name"
    })
    Ccomments: Ccomment[];

}

// @Table({
//     timestamps: true,
//     tableName: "Users"
// })

// export class User extends Model {
//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     uid: string

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     upw: string

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     nick_name: string

//     @HasMany(() => QnA)
//     QnAs: QnA[];

//     @HasMany(() => Comment)
//     Comments: Comment[];

//     @HasMany(() => Ccomment)
//     Ccomments: Ccomment[];

// }

// @Table({
//     timestamps: true,
//     tableName: "QnAs"
// })

// export class QnA extends Model {
//     @ForeignKey(() => User)
//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     nick_name: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     qna_title: string;

//     @Column({
//         type: DataType.TEXT,
//         allowNull: false
//     })
//     qna_content: string;

//     @HasMany(() => Comment)
//     Comments: Comment[];

//     @BelongsTo(() => User)
//     Users: User;
// }

// @Table({
//     timestamps: true,
//     tableName: "Comments",
//     paranoid: true,
// })

// export class Comment extends Model {
//     @ForeignKey(() => QnA)
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false
//     })
//     qna_id: number

//     @ForeignKey(() => User)
//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     nick_name: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     qna_comment: string;

//     @HasMany(() => Ccomment)
//     Ccomments: Ccomment[];

//     @BelongsTo(() => User)
//     Users: User;

//     @BelongsTo(() => QnA)
//     QnAs: QnA

// }

// @Table({
//     timestamps: true,
//     tableName: "CComments",
//     paranoid: true,
// })

// export class Ccomment extends Model {
//     @ForeignKey(() => Comment)
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false
//     })
//     QnA_comment_ID: number

//     @ForeignKey(() => User)
//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     nick_name: string;

//     @Column({
//         type: DataType.STRING,
//         allowNull: false
//     })
//     qna_com_comment: string;

//     @BelongsTo(() => User)
//     Users: User;

//     @BelongsTo(() => Comment)
//     Comments: Comment;

// }

// 이렇게 총 4개야

// 나중에 기억나면 이 내용을 블로그에 적기 (오류 해결)
// foreignKey, HasMany, BelongsTo