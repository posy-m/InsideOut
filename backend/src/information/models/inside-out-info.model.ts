
import { AllowNull, Column, DataType, Model,Table } from "sequelize-typescript";



@Table({
    tableName: "insideoutinfo",
    timestamps: true,
    paranoid: true
})

export class Insideoutinfo extends Model{
@Column({
    type: DataType.STRING(30),
    allowNull: false,
})
nick_name:string;

@Column({
    type: DataType.STRING(30)
})
w_name:string;

@Column({
    type: DataType.TEXT
})
w_info:string;

@Column({
    type: DataType.STRING(255)
})
img:string;


}