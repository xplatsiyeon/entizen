import classes from "./RadioGroup.module.scss";

import React, { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

interface ItemType {
  name: string;
  value: string;
  isDisabled?: boolean;
}
interface InputType {
  title?: string; // 상단 제목
  isLeft?: boolean; // item 라벨의 좌우위치 여부
  require?: boolean; // 필수값 여부 (*)
  defaultValue?: string; // 초기 checked의 상태유무결정
  onChange: (value: string) => void; // 값 변경 이벤트 핸들러
  items: Array<ItemType>; // 사용될 아이템목록
  isColumn?: boolean; //정렬여부
}

const RadioGroup = ({
  title,
  isLeft = false,
  require,
  onChange,
  defaultValue,
  items,
  isColumn = false,
}: InputType) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string | null>(
    defaultValue || null,
  );

  //radiobox 핸들러
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectValue = e.target.value;
    setCurrentValue(selectValue);
    onChange(selectValue);
  };
  // 텍스트 핸들러
  const refHandler = (value: string) => {
    if (!value) return;
    const selectValue = value;
    setCurrentValue(selectValue);
    onChange(selectValue);
  };

  useLayoutEffect(() => {
    if (!defaultValue) return;
    setCurrentValue(defaultValue);
    onChange(defaultValue);

    // eslint-disable-next-line
  }, [defaultValue]);

  return (
    <div className={classes.radioButton}>
      {title && (
        <label htmlFor={title}>
          {require && <FaStarOfLife color="red" size={8} />}
          {title}
        </label>
      )}
      <div className={isColumn ? classes.columnWrapper : classes.rowWrapper}>
        {items.map((item) => (
          <div key={item.value}>
            {isLeft && (
              <div onClick={() => item.isDisabled || refHandler(item.value)}>
                {item.name}
              </div>
            )}
            <input
              id={item.value}
              name={item.value}
              type="radio"
              value={item.value}
              checked={currentValue === item.value}
              onChange={onChangeHandler}
              disabled={item.isDisabled}
            />
            {isLeft || (
              <div onClick={() => item.isDisabled || refHandler(item.value)}>
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-semibold mt-1">{errorMsg}</p>
      )}
    </div>
  );
};

export default RadioGroup;
