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
    ){
    }

    async findAll() : Promise<Insideoutinfo[]>{
        const result = await this.infoLogic.findAll()
        console.log(result);
        return result;
    }



    async findOneById(id: number): Promise<Insideoutinfo> {
        const result = await this.infoLogic.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException(`ID가 ${id}인 레코드를 찾을 수 없습니다.`);
        }
        return result;
    }



    async create( infoLogic : CreateContent, img : string) : Promise<Insideoutinfo> {
        let { whiskey_text } = infoLogic
        return await this.infoLogic.create({
            nick_name: "nick_name", whiskey_text, whiskey_image:img
        })
    }

    async update(id: number,updateContent:UpdateContent): Promise<Insideoutinfo> {
        const record = await this.findOneById(id);
        if(!record){
            throw new Error(`ID가 ${id}인 레코드를 찾을 수 없습니다.`);
        }
        const updatedRecord = await record.update(updateContent);
        return updatedRecord;
    }
}
