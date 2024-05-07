import classes from "./CheckGroup.module.scss";

import React, { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import CheckBox from "./CheckBox";

interface checkItems {
  label: string; // 아이템 라벨
  name: string; // 고유식별값
  isDefault?: boolean; // 각 아이템의 최초 check여부
  isLeft?: boolean; // 각 아이템의 라벨 위치 여부
  isDisabled?: boolean; //각 아이템의 활성화여부
  onChange?: (value: string) => void; // 각 아이템의 추가 콜백
}

interface CheckBoxType {
  title?: string; // 상단 제목
  require?: boolean; // 필수값 여부 (*)
  items: Array<checkItems>; // checkgroup에 사용될 아이템들
  isLeft?: boolean; //라벨의 좌우여부
  onChange: (value: Array<string>) => void; // 값 변경 이벤트 핸들러
  isAll?: boolean;
}

const CheckGroup = ({
  title,
  require,
  onChange,
  items,
  isLeft = false,
  isAll = true,
}: CheckBoxType) => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  // 그룹 체크박스의 default값및 현재값의 상태관리
  const [checkItems, setCheckItems] = useState<Array<string>>([]);
  const [groupCheck, setGroupCheck] = useState<boolean>(false);

  // cheeckbox item 선택 핸들러
  const onChangeHandler = (value: string) => {
    if (checkItems?.includes(value)) {
      const filterValues = checkItems?.filter((item) => item !== value);
      setCheckItems(filterValues);
    } else {
      if (!checkItems || checkItems.length === 0) return setCheckItems([value]);
      else setCheckItems([...checkItems, value]);
    }
  };

  // 전체선택 함수
  const onChangeAllSelect = () => {
    const useItems = items.filter((item) => !item.isDisabled);
    const names = useItems.map((item: checkItems) => item.name);
    if (checkItems.length === useItems.length) {
      setCheckItems([]);
    } else {
      setCheckItems(names);
    }
  };

  // checkItems를 기반으로 onChang에 상태값 전달
  useEffect(() => {
    if (!checkItems) return;
    const useItems = items.filter((item) => !item.isDisabled);

    if (useItems.length === checkItems.length) {
      setGroupCheck(true);
    } else {
      setGroupCheck(false);
    }

    onChange(checkItems);
    // eslint-disable-next-line
  }, [checkItems]);

  // 초기선택값이 true인 아이템에 대해 상태값처리
  useEffect(() => {
    if (!items) return;
    const defaultItems = items.filter((item) => item.isDefault === true);
    const names = defaultItems.map((item) => item.name);

    setCheckItems(names);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.checkGroup}>
      {title && (
        <label htmlFor={title}>
          {require && <FaStarOfLife color="red" size={8} />}
          {title}
        </label>
      )}
      {isAll && (
        <div>
          <input
            id={"all"}
            name={"all"}
            type={"checkbox"}
            value={"all"}
            checked={groupCheck}
            onChange={onChangeAllSelect}
          />
          <div onClick={() => onChangeAllSelect()}>전체선택</div>
        </div>
      )}
      <div>
        {items.map((item: checkItems) => (
          <div key={item.name}>
            <CheckBox
              label={item.label}
              defaultChecked={item.isDefault ? item.isDefault : false}
              onChange={onChangeHandler}
              value={item.name}
              name={item.name}
              isGroup={true}
              isLeft={isLeft}
              isDisabled={item.isDisabled || false}
              groupValues={checkItems}
            />
          </div>
        ))}
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-semibold mt-1">{errorMsg}</p>
      )}
    </div>
  );
};

export default CheckGroup;
