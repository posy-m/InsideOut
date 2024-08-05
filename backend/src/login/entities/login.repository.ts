import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSignUpRepository {
  // 여기에 데이터베이스 상호작용 로직을 추가하세요
  // 예: 유저 생성, 유저 조회 등

  async createUser(uid: string, upw: string, nick_name: string, isAdmin: boolean): Promise<any> {
    // 유저를 생성하는 로직을 여기에 구현하세요
    // 데이터베이스 호출을 시뮬레이션합니다.
    return { uid, upw, nick_name };
  }

  async findUserById(uid: string): Promise<any> {
    // 주어진 uid로 유저를 조회하는 로직을 여기에 구현하세요
    // 데이터베이스 호출을 시뮬레이션합니다.
    return { uid, upw: 'password', nick_name: 'nickname', isAdmin: false };
  }
}