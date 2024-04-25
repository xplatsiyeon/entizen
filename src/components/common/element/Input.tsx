import classes from "./Input.module.scss";

import React, { HTMLInputTypeAttribute, useState } from "react";
import { FaStarOfLife, FaTimes } from "react-icons/fa";

interface InputType {
  type: HTMLInputTypeAttribute; // input type
  title?: string; // 상단 제목
  require?: boolean; // 필수값 여부 (*)
  value: string; // 값
  name: string; // 명칭 (form, label에 사용)
  placeholder?: string; // 입력값 예시
  maxLength?: number; // 최대 길이
  autoNext?: boolean;
  onChange: (value: string) => void; // 값 변경 이벤트 핸들러
  validation?: "number" | "kor" | "eng" | "email" | "password"; // 정합성 체크 종류
  setIsValid?: (valid: boolean) => void; // 정합성 체크 여부 설정
  enterKey?: () => void; // 엔터키 입력 시 호출 함수
}

const Input = ({
  type,
  title,
  require,
  value,
  name,
  placeholder,
  onChange,
  validation,
  setIsValid,
  enterKey,
  maxLength,
  autoNext,
}: InputType) => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const changeHandler = (e: any) => {
    const newValue = e.target.value;
    onChange(newValue);
    validationCheck(newValue);

    if (autoNext) {
      if (newValue.length === maxLength) {
        e.preventDefault(); // 기본 동작 막기
        const inputs = document.querySelectorAll("input"); // 모든 input 요소 선택

        // 현재 focus된 input 요소 찾기
        const currentInput = document.activeElement;
        const currentIndex = Array.from(inputs).indexOf(
          currentInput as HTMLInputElement
        );

        // 현재 focus된 input 요소의 인덱스를 기반으로 다음 input 요소 찾기
        const nextInputIndex = currentIndex + 1;
        if (nextInputIndex < inputs.length) {
          const nextInput = inputs[nextInputIndex];
          // 다음 input 요소에 대한 작업 수행
          nextInput.focus();
        }
      }
    }
  };

  const validationCheck = (newValue: string) => {
    let reg;
    let msg;
    switch (validation) {
      case "eng":
        reg = /^[a-zA-Z]+$/;
        msg = "영어만 입력 가능합니다.";
        break;
      case "number":
        reg = /^[0-9]+$/;
        msg = "숫자만 입력 가능합니다.";
        break;
      case "kor":
        reg = /^[가-힣]+$/;
        msg = "한글만 입력 가능합니다.";
        break;
      case "email":
        reg = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        msg = "유효한 이메일 형식이 아닙니다.";
        break;
      case "password":
        reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[\w@$!%*#?&]{8,}$/;
        msg = "비밀번호는 특수문자, 영어, 숫자 포함 8자리 이상입니다.";
        break;
      default:
        reg = /.*/;
        msg = "";
        break;
    }
    if (!reg.test(newValue)) {
      // 정합성 실패면 에러메세지 보여주기 및 값 초기화
      setErrorMsg(msg);
      if (setIsValid) setIsValid(false);
    } else {
      if (require && newValue.length < 2) {
        setErrorMsg("최소 2글자 이상 입력 해주세요.");
        if (setIsValid) setIsValid(false);
      } else {
        // 정합성 성공이면 에러메세지 삭제, 값입력, 정합성 true 변경
        setErrorMsg("");
        if (setIsValid) setIsValid(true);
      }
    }
  };

  const clearHandler = () => {
    if (setIsValid) setIsValid(false);
    setErrorMsg("");
    onChange("");
  };

  const focusHandler = (e: any) => {
    e.target.select();
  };

  const keyHandler = (e: any) => {
    if (e.key === "Enter") {
      if (enterKey) enterKey();
    }
  };

  return (
    <div className={classes.input}>
      {title && (
        <label htmlFor={name}>
          {require && <FaStarOfLife color="red" size={8} />}
          {title}
        </label>
      )}
      <div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={changeHandler}
          onFocus={focusHandler}
          onKeyUp={keyHandler}
        />
        {value && <FaTimes onClick={clearHandler} />}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-semibold mt-1">{errorMsg}</p>
      )}
    </div>
  );
};

export default Input;
