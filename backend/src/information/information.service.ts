import { Injectable, NotFoundException } from '@nestjs/common';
import { Insideoutinfo } from './models/inside-out-info.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from 'src/inside-out-info/dto/inside-out.user.dto';
import { CreateContent } from 'src/inside-out-info/dto/information-dto';
import { UpdateContent } from './dto/information.dio';

@Injectable()
export class InformationService {
    constructor(@InjectModel(Insideoutinfo)
        private readonly infoLogic : typeof Insideoutinfo
    ){}

    async findAll() : Promise<Insideoutinfo[]>{
        const result = await this.infoLogic.findAll({ order: [['createdAt', 'DESC']] });
        // console.log(result);
        return result;
    }

    async findOneById(id: number): Promise<Insideoutinfo> {
        const result = await this.infoLogic.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException(`ID가 ${id}인 레코드를 찾을 수 없습니다.`);
        }
        return result;
    }

    async create( createContent : UpdateContent, img : string) : Promise<Insideoutinfo> {
        const { whiskey_text, whiskey_name }= createContent
        console.log("#############################################",whiskey_text);
        
        return await this.infoLogic.create({
            nick_name: "nick_name" , w_name:whiskey_name, w_info:whiskey_text, img
        })
    }

    async update(id: number, updateContent:UpdateContent, img : string): Promise<Insideoutinfo> {
        const record = await this.findOneById(id);
        if(!record){
            throw new NotFoundException(`ID가 ${id}인 레코드를 찾을 수 없습니다.`);
        }
        const { whiskey_text, whiskey_name }= updateContent
        console.log("gh",  whiskey_text);
        
        const updatedRecord = await record.update({
            whiskey_name, w_info:whiskey_text, img
        });
        return updatedRecord;
    }

    async delete(id: number){
        try {
            const data = await this.infoLogic.destroy({where : { id }});
            return data;
        } catch (error) {
            throw new Error(`ID가 ${id}인 레코드를 찾을 수 없습니다.`);
        }
    }
}
