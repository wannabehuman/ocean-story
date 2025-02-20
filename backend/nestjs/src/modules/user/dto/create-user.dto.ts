export class CreateUserDto {
    username: string;
    password: string;
    // role은 명시 안 하면 DB에서 default로 2가 들어감(가입시 일반사용자 / db에서 직접 바꾸기로 아니면 수정할게요 ㅎㅎㅎ)
  }  