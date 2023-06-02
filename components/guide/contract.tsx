import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import colors from 'styles/colors';
import { useState } from 'react';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import ItemImg1 from 'public/guide/contract-item-1.svg';
import ItemImg2 from 'public/guide/contract-item-2.svg';
import ItemImg3 from 'public/guide/contract-item-3.svg';
import ItemImg4 from 'public/guide/contract-item-4.svg';
import ItemImg5 from 'public/guide/contract-item-5.svg';
import ItemImg6 from 'public/guide/contract-item-6.svg';

interface List {
  id: number;
  name: string;
  img: string;
  contetns: string;
  notice?: string;
}
const list: List[] = [
  {
    id: 0,
    name: '구독기간',
    img: ItemImg1,
    contetns:
      '24, 36, 48, 60 개월 중 원하시는 기간을 선택하시면됩니다. 구독 기간에 따른 총 구독료는 조정될 수 있습니다.',
    notice: '*홈 충전기(부분구독)는 구독기간과 무관한 상품입니다.',
  },
  {
    id: 1,
    name: '구독시작',
    img: ItemImg2,
    contetns:
      '충전소 완공 및 확인 후 다음날부터 구독이 시작됩니다. 남은 구독일은 `내 충전소`에서 확인 가능합니다.',
  },
  {
    id: 2,
    name: '구독종료',
    img: ItemImg3,
    contetns:
      '구독 종료일 전 알림을 받을 수 있습니다. 알림을 받고 구독을 연장해보세요.',
  },
  {
    id: 3,
    name: '구독연장',
    img: ItemImg4,
    contetns:
      '구독기간 종료 후에도 충전기 사용을 원하신다면 부분구독 상품으료 구독기간을 연장할 수 있습니다. 구독연장 계약 전 수익지분 조정이 가능합니다.',
  },
  {
    id: 4,
    name: 'A/S',
    img: ItemImg5,
    contetns:
      '상품에 따라 무상서비스 기간이 주어지며, 소비자 과실인 경우 비용부담이 발생할 수 있습니다.',
  },
  {
    id: 5,
    name: '구독계약 파기',
    img: ItemImg6,
    contetns:
      '개인 사정에 의한 구독계약 파기를 요청할 경우, 구독계약에 따른 위약금과 철거비용 등이 청구될 수 있습니다.',
  },
];
const Contract = () => {
  const [open, setOpen] = useState<boolean[]>(
    Array.from({ length: list.length }, () => false),
  );
  const handleClick = (id: number) => {
    let temp = [...open];
    temp[id] = !temp[id];
    setOpen(temp);
  };

  return (
    <Wrapper>
      {list.map((item) => (
        <ListBox key={item.id}>
          {/* Close */}
          <ItemButton onClick={() => handleClick(item.id)}>
            <Image src={item.img} alt="icon" />
            {/* <ItemName primary={item.name} /> */}
            <ItemWrap>
              <ItemName>{item.name}</ItemName>
              {open[item.id] ? (
                <ArrowImg>
                  <Image src={DownArrow} alt="down_arrow" />
                </ArrowImg>
              ) : (
                <ArrowImg>
                  <Image src={UpArrow} alt="up_arrow" />
                </ArrowImg>
              )}
            </ItemWrap>
          </ItemButton>
          <Line />
          {/* Open */}
          <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ItemText primary={item.contetns} sx={{ pl: 6 }} /> */}
              <ItemText>{item.contetns}</ItemText>
              {/* <ItemNotice primary={item.notice} sx={{ pl: 6 }} /> */}
              <ItemNotice>{item.notice}</ItemNotice>
            </List>
          </Collapse>
        </ListBox>
      ))}
    </Wrapper>
  );
};

export default Contract;

const Wrapper = styled.div`
  @media (max-width: 899.25pt) {
    padding-bottom: 180.75pt;
  }
`;
const ListBox = styled.div`
  position: relative;
`;
const ItemButton = styled(ListItemButton)`
  padding-left: 0;
  padding-right: 0;

  & span {
    padding-left: 12px;
  }
`;
const ItemWrap = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// const ItemName = styled(ListItemText)`
const ItemName = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  /* identical to box height, or 100% */

  letter-spacing: -0.02em;

  /* Main2 */

  color: #222222;
`;

// const ItemText = styled(ListItemText)`
const ItemText = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  padding-left: 45pt;
  font-weight: 400 !important;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
// const ItemNotice = styled(ListItemText)`
const ItemNotice = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  padding-left: 45pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  padding-top: 6pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 6pt;
  padding-bottom: 18pt;
`;
const Line = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 45pt);
  border-bottom: 0.75pt solid ${colors.gray};
`;
const ArrowImg = styled.div`
  padding-right: 9.75pt;
`;
