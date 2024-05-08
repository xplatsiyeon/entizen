import classes from "./CheckBox.module.scss";

import React, {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useMemo,
  useState,
} from "react";
import { FaStarOfLife } from "react-icons/fa";

interface InputType {
  type?: HTMLInputTypeAttribute; // input type
  title?: string; // 상단 제목
  label: string; // item의 라벨
  isLeft?: boolean; // item 라벨의 좌우위치 여부
  isDisabled?: boolean;
  require?: boolean; // 필수값 여부 (*)
  value: boolean; // 값
  name: string; // 명칭 (form, label에 사용)
  onChange: (value: any) => void; // 값 변경 이벤트 핸들러
  errMsg?: string;
}

const CheckBox = ({
  type = "checkbox",
  title,
  label,
  isLeft = false,
  isDisabled = false,
  require,
  name,
  value,
  onChange,
  errMsg,
}: InputType) => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange((prev: boolean) => !prev);
  };
  // ref핸들러
  const refHandler = () => {
    onChange((prev: boolean) => !prev);
  };

  return (
    <div className={classes.checkbox}>
      {title && (
        <label htmlFor={name}>
          {require && <FaStarOfLife color="red" size={8} />}
          {title}
        </label>
      )}
      <div>
        {isLeft && (
          <div onClick={() => isDisabled || refHandler()}>{label}</div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          checked={value}
          onChange={onChangeHandler}
          disabled={isDisabled}
        />
        {isLeft || (
          <div onClick={() => isDisabled || refHandler()}>{label}</div>
        )}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-semibold mt-1">{errorMsg}</p>
      )}
    </div>
  );
};

export default CheckBox;
