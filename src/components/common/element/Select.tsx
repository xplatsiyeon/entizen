"use client";

import classes from "./Select.module.scss";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export interface SelectValueType {
  value: string;
  name: string;
}

interface SelectType {
  none?: boolean;
  select?: SelectValueType;
  onChange: (select: { value: string; name: string }) => void;
  options: SelectValueType[];
}

const noneValue: SelectValueType = { value: "", name: "선택" };

const Select = ({ none = true, select, onChange, options }: SelectType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const optionSelectHandler = (i: SelectValueType) => {
    onChange(i);
  };

  // 선택 사항이 없고, 초기값이 설정되지 않았을 때만 noneValue를 설정합니다.
  useEffect(() => {
    if (none && !select) {
      onChange(noneValue);
    }
  }, [none, select, onChange]);

  const mergedOptions = none ? [noneValue, ...options] : options;

  return (
    <div className={classes.select} onClick={() => setIsOpen(!isOpen)}>
      <h1 className={select?.value && classes.selectValue}>
        {select?.name || "선택"}
        {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
      </h1>
      <ul className={!isOpen ? classes.hidden : ""}>
        {mergedOptions.map((i) => (
          <li
            className={i.value === select?.value ? classes.selectItem : ""}
            key={i.value}
            value={i.value}
            onClick={() => optionSelectHandler(i)}
          >
            {i.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
