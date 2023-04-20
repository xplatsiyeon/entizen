// 이메일 유효성 검사
export const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

/**
 * 비밀번호 유효성 검사
 * @param passwords string
 * @returns true | false
 */
export const reg_password = (passwords: string) => {
  const reg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  return reg.test(passwords);
};
