import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class SignUpPipe implements PipeTransform{
    name : string = null
    constructor(name : string){
        this.name = name;
    }
    transform(value: any, metadata: ArgumentMetadata) {

        if (!value || typeof value !== 'object') {
            throw new BadRequestException('Invalid input format.');
        }

        const { uid, upw } = value;

        if(!uid || !upw){
            throw new BadRequestException('아이디 또는 비밀번호를 잘 입력해줘');
        }
        if (uid.length < 2 || uid.length > 15) { // Adjust length as necessary
            throw new BadRequestException(`UID는 최소 2자, 최대 15자까지 써줘`);
        }

        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(upw)){
            console.log('비밀번호 한글 제외, 영대소문자,숫자,특수문자 1개이상 포함')
            if((upw.length >= (this.name || 8)) && (upw.length <= (this.name || 15))){
                console.log('비밀번호 값이 8자 이상, 15자 이하로 잘 적었습니다.')
                return value
            }else{
                throw new BadRequestException(`비밀번호를 최소 8자이상, 최대 15자까지 써줘`);
            }
        }else{
            throw new BadRequestException(`비밀번호를 한글제외, 영대소문자,숫자,특수문자 포함 1개 이상으로 써줘`);
        }
    }
}

export class LoginPipe implements PipeTransform {
    private readonly minLength: number;
    private readonly maxLength: number;

    constructor(minLength: number = 8, maxLength: number = 15) {
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value || typeof value !== 'object') {
            throw new BadRequestException('Invalid input format.');
        }

        const { uid, upw } = value;

        if (!uid || !upw) {
            throw new BadRequestException('아이디 또는 비밀번호를 잘 입력해줘');
        }

        // Validate `uid` if needed
        if (uid.length < 2 || uid.length > this.maxLength) { // Adjust length as necessary
            throw new BadRequestException(`UID는 최소 2자, 최대 15자까지 써줘`);
        }

        // Validate `upw`
        const isValidFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(upw);
        if (!isValidFormat) {
            throw new BadRequestException(`${upw} must contain at least one letter, one number, and one special character.`);
        }

        if (upw.length < this.minLength || upw.length > 60) {
            throw new BadRequestException(`${upw} must be between ${this.minLength} and ${this.maxLength} characters.`);
        }

        return value;
    }
}




export class UserLoginObjectPipe implements PipeTransform {
    // 객체의 형태를 생성자에서 받고
    // ZodSchema == z.object로 만든 객체가 맞는지 타입 검증
    constructor(private userDTOBody : ZodSchema){

    }
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            // parse : 전달한 값을 객체로 변환하는 작업
            // 반환되는 데이터 타입이 Object 객체
            const parseValue = this.userDTOBody.parse(value);
            return parseValue;
        } catch (error) {
            throw new BadRequestException('user login DTO error');
        }
    }
}