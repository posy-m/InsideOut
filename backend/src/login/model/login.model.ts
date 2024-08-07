
import { Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { whiskyTip } from 'src/whiskytip/model/whisky_Tip.model';

@Table({
    tableName: "userDB",
    timestamps: true,
    paranoid: false
})
export class UserSignUp extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    uid: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    upw: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    nick_name: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isAdmin: boolean


}