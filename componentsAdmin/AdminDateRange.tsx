import styled from '@emotion/styled';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import colors from 'styles/colors';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { adminDateFomat } from 'utils/calculatePackage';

type Props = {
  isDate: boolean;
  setIsDate: Dispatch<SetStateAction<boolean>>;
  setPickedDate: Dispatch<SetStateAction<string[] | undefined>>;
  dateState: Range[];
  setDateState: Dispatch<SetStateAction<Range[]>>;
};

export default function AdminDateRange({
  isDate,
  setIsDate,
  setPickedDate,
  dateState,
  setDateState,
}: Props) {
  const dateContainerRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (item: RangeKeyDict) => {
    console.log(item);
    setDateState([item.selection]);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickBackground);

    return () => {
      document.removeEventListener('mousedown', onClickBackground);
    };
  });

  const onClickBackground = useCallback(
    (event: any) => {
      if (!dateContainerRef?.current?.contains(event?.target)) {
        setIsDate(false);
      }
    },
    [dateContainerRef],
  );

  // const onClickConfirmButton = () => {
  //   setIsDate(false)
  //   setPickedDate([
  //     adminDateFomat(item.selection.startDate!),
  //     adminDateFomat(item.selection.endDate!),
  //   ]);
  // }

  return (
    <DateContainer ref={dateContainerRef}>
      <DateBox
        onClick={() => {
          setIsDate((prev) => !prev);
        }}
      >
        {dateState
          ? `${adminDateFomat(dateState[0].startDate!)} ~ ${adminDateFomat(
              dateState[0].endDate!,
            )}`
          : ''}
      </DateBox>
      {isDate && (
        <DateRangeBox>
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateState}
            scroll={{ enabled: true }}
            months={2}
          />
          <button className="DateButton" onClick={() => setIsDate(false)}>
            확인
          </button>
        </DateRangeBox>
      )}
    </DateContainer>
  );
}

const DateContainer = styled.div`
  position: relative;
`;
const DateRangeBox = styled.div`
  position: absolute;
  z-index: 999;
  top: 35px;
  left: 0px;
  display: flex;
  flex-direction: column;
  & > button {
    height: 20px;
  }
  .DateButton {
    height: 40px;
    background-color: rgb(239, 242, 247);
  }
`;
const DateBox = styled.div`
  border: 1px solid ${colors.gray2};
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;
