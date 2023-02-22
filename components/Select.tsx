import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import Image from 'next/image';
import downArrow from 'public/images/downArrow.png';
import checkImg from 'public/images/check-main1-img.png';
import { Charger } from './mypage/as/AsRequestWrite';
import { Products } from 'componentsCompany/MyProductList/ProductList';

type FontSize = 'small' | 'medium' | 'large';
type Props = {
  placeholder: string;
  value: string;
  option?: string[];
  asOption?: Charger[];
  productOption?: Products[];
  onClickCharger?: (item: string, name: string, index: number) => void;
  onClickEvent?: (item: string) => void;
  onClickAs?: (data: Charger) => void;
  onClickProject?: (data: string, idx: number) => void;
  name?: string;
  index?: number;
  fontSize?: FontSize;
};

const SelectComponents = ({
  placeholder,
  value,
  onClickCharger,
  onClickEvent,
  onClickAs,
  onClickProject,
  option,
  asOption,
  productOption,
  name,
  index,
  fontSize = 'medium',
}: Props) => {
  const selectRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const HandleOption = () => setIsOpen((prev) => !prev);

  const onClickOtion = async (item: string) => {
    if (onClickCharger) {
      onClickCharger(item, name!, index!);
    }
    if (onClickEvent) {
      onClickEvent(item);
    }
    await HandleOption();
  };
  // AS 온클릭
  const onClickAsOption = async (data: Charger) => {
    if (onClickAs) {
      onClickAs(data);
    }
    await HandleOption();
  };
  // product 온클릭
  const onClickProjectOption = async (data: Products) => {
    if (onClickProject) {
      onClickProject(data.modelName, data.chargerProductIdx);
    }
    await HandleOption();
  };

  const handleCloseSelect = (e: any) => {
    if (
      isOpen === true &&
      (!selectRef.current || !selectRef.current.contains(e.target))
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseSelect);
    return () => {
      window.removeEventListener('click', handleCloseSelect);
    };
  });

  return (
    <Wrapper>
      <SelectBox onClick={HandleOption} ref={selectRef}>
        <Input
          fontSize={fontSize}
          type={'text'}
          isOpen={isOpen}
          readOnly
          placeholder={placeholder}
          value={value}
        />
        <SelectIcon isOpen={isOpen}>
          <Image src={downArrow} alt="down-arrow" layout="fill" />
        </SelectIcon>
      </SelectBox>
      {isOpen && (
        <Ul>
          {/* 특수 케이스 (내제품 리스트) */}
          {productOption &&
            productOption?.map((item, index) => (
              <Li
                isSelected={value === item.modelName ? true : false}
                key={index}
                onClick={() => onClickProjectOption(item)}
                fontSize={fontSize}
              >
                {item.modelName}
                {value === item.modelName && (
                  <span className="img-box">
                    <Image src={checkImg} alt="check-img" layout="fill" />
                  </span>
                )}
              </Li>
            ))}
          {/* 특수 케이스 (AS) */}
          {asOption &&
            asOption?.map((item, index) => (
              <Li
                isSelected={value === item.projectName ? true : false}
                key={index}
                onClick={() => onClickAsOption(item)}
                fontSize={fontSize}
              >
                {item.projectName}
                {value === item.projectName && (
                  <span className="img-box">
                    <Image src={checkImg} alt="check-img" layout="fill" />
                  </span>
                )}
              </Li>
            ))}
          {/* 일반 */}
          {option &&
            option?.map((item, index) => (
              <Li
                isSelected={value === item ? true : false}
                key={index}
                onClick={() => onClickOtion(item)}
                fontSize={fontSize}
              >
                {item}
                {value === item && (
                  <span className="img-box">
                    <Image src={checkImg} alt="check-img" layout="fill" />
                  </span>
                )}
              </Li>
            ))}
        </Ul>
      )}
    </Wrapper>
  );
};

export default SelectComponents;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  width: 100%;
`;
const SelectBox = styled.div`
  width: 100%;
`;
const Input = styled.input<{
  isOpen: boolean;
  fontSize: FontSize;
}>`
  width: 100%;
  padding-top: 13.5pt;
  padding-bottom: 13.5pt;
  padding-left: 12.75pt;
  padding-right: 12.75pt;
  height: 39pt;
  outline: none;
  box-sizing: border-box;
  border-radius: 6pt;
  border: 0.75pt solid ${colors.gray};
  /* border: 0.75pt solid #e2e5ed; */

  cursor: pointer;
  font-weight: 400;
  font-size: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  ${({ fontSize }) =>
    fontSize === 'small' &&
    css`
      font-size: 10pt;
    `}
  ${({ fontSize }) =>
    fontSize === 'medium' &&
    css`
      font-size: 12pt;
    `}
  ${({ fontSize }) =>
    fontSize === 'large' &&
    css`
      font-size: 14pt;
    `}
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-top-left-radius: 6pt;
      border-top-right-radius: 6pt;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Ul = styled.ul`
  width: 100%;
  list-style: none;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 39pt;
  border: 0.75pt solid ${colors.gray};
  z-index: 99;
  background-color: ${colors.lightWhite};
  border-bottom-left-radius: 6pt;
  border-bottom-right-radius: 6pt;
`;
const Li = styled.li<{ fontSize: FontSize; isSelected: boolean }>`
  padding-left: 12pt;
  padding-right: 12pt;
  margin: 0;
  height: 39pt;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 400;
  font-size: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${({ isSelected }) => (isSelected ? colors.main : colors.main2)};
  :hover {
    color: ${colors.main1};
  }
  ${({ fontSize }) =>
    fontSize === 'small' &&
    css`
      font-size: 10pt;
    `}
  ${({ fontSize }) =>
    fontSize === 'medium' &&
    css`
      font-size: 12pt;
    `}
  ${({ fontSize }) =>
    fontSize === 'large' &&
    css`
      font-size: 14pt;
    `}
  /* ${({ isSelected }) => isSelected && css``} */
    .img-box {
    position: relative;
    width: 9.375pt;
    height: 6.2475pt;
  }
`;
const SelectIcon = styled.span<{ isOpen: boolean }>`
  width: 18pt;
  height: 18pt;
  color: ${colors.dark} !important;
  position: absolute;
  top: 10.5pt;
  right: 10.5pt;
  transform: ${({ isOpen }) => isOpen && 'rotate(180deg)'};
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${colors.lightWhite};
`;
