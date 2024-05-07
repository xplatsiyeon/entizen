import classes from "./CheckBox.module.scss";

import React, {
  ChangeEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
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
  value: any; // 값
  name: string; // 명칭 (form, label에 사용)
  defaultChecked?: boolean; // 초기 checked의 상태유무결정
  onChange: (value: any) => void; // 값 변경 이벤트 핸들러
  /**
   * isGroup,groupValues,isChecked
   * 위의 3가지 props는 group 사용시 행들러구분을 위해 사용되므로 일반적으로는 사용하지 않는다.
   * 결론: 위의 3가지 옵션은 사용할일 없다.
   */
  isGroup?: boolean;
  groupValues?: Array<string>;
  isChecked?: boolean;
}

const CheckBox = ({
  type = "checkbox",
  title,
  label,
  isLeft = false,
  isDisabled = false,
  require,
  value,
  name,
  onChange,
  defaultChecked,
  isGroup = false,
  groupValues,
  isChecked,
}: InputType) => {
  const inputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  // 단일 체크박스의 상태관리
  const [isCheck, setIsCheck] = useState<boolean>(
    defaultChecked ? defaultChecked : false,
  );
  // 단일 체크박스의 default값및 현재값의 상태관리
  const [checkItem, setCheckItem] = useState<string>(
    defaultChecked ? name : "",
  );

  //cheeckbox 핸들러
  const onChangeHandler = (e: any) => {
    setIsCheck((prev) => !prev);
    const currentValue = e.target.name || e.target.value || e.target.id;
    if (isGroup) {
      return onChange(currentValue);
    } else if (!isGroup) {
      if (checkItem === currentValue) {
        setCheckItem("");
      } else {
        setCheckItem(currentValue);
      }
    }
  };
  // ref핸들러
  const refHandler = (ref: HTMLInputElement | null) => {
    setIsCheck((prev) => !prev);
    if (!ref) return;
    const currentValue = ref.name || ref.value || ref.id;
    if (isGroup) {
      return onChange(currentValue);
    } else if (!isGroup) {
      if (checkItem === currentValue) {
        setCheckItem("");
      } else {
        setCheckItem(currentValue);
      }
    }
  };

  useEffect(() => {
    if (!isGroup) {
      onChange(checkItem);
    }
    // eslint-disable-next-line
  }, [checkItem]);

  useLayoutEffect(() => {
    if (!groupValues) return;
    if (groupValues.includes(name)) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
    // eslint-disable-next-line
  }, [groupValues]);
  // console.log(groupValues, "groupValues");
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
          <div onClick={() => isDisabled || refHandler(inputRef.current)}>
            {label}
          </div>
        )}

        <input
          ref={inputRef}
          id={name}
          name={name}
          type={type}
          value={value}
          checked={isCheck}
          onChange={onChangeHandler}
          disabled={isDisabled}
        />

        {isLeft || (
          <div onClick={() => isDisabled || refHandler(inputRef.current)}>
            {label}
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-semibold mt-1">{errorMsg}</p>
      )}
    </div>
  );
};

export default CheckBox;
