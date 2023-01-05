import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Contents } from 'pages/faq';

import { arrayBuffer } from 'stream/consumers';

interface Props {
  data: Contents[];
  tabNumber: number;
  tabCompNumber?: number;
}

const FaqInfomation = ({ data, tabNumber, tabCompNumber }: Props) => {
  const [open, setOpen] = useState<boolean[]>(
    Array.from({ length: data.length }, () => false),
  );
  console.log(open, 'open 25번줄');
  const handleClick = (id: number) => {
    let temp = [...open];
    temp[id] = !temp[id];
    setOpen(temp);
  };

  useEffect(() => {
    setOpen([false]);
  }, [tabNumber, tabCompNumber]);

  return (
    <div>
      {data?.map((list) => (
        <div key={list.id}>
          {/* Close */}
          <ItemButton
            onClick={() => {
              handleClick(list.id);
            }}
          >
            <QText>Q</QText>
            <ListItemText primary={list.name} />
            {open[list.id] ? (
              <Image src={DownArrow} alt="down_arrow" />
            ) : (
              <Image src={UpArrow} alt="up_arrow" />
            )}
          </ItemButton>
          {/* Open */}
          <Collapse in={open[list.id]} timeout="auto" unmountOnExit>
            <List disablePadding>
              <ItemText>
                <p>{list.text}</p>
              </ItemText>
            </List>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default FaqInfomation;

const ItemButton = styled(ListItemButton)`
  border-bottom: 0.75pt solid ${colors.gray};
  padding: 0px 16px;
  font-weight: 400;
  font-size: 12pt;
  line-height: 12pt;
  & span {
    padding: 15pt 0;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const ItemText = styled(ListItemText)`
  margin-top: 0;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  background: #f3f4f7;
  border-bottom: 0.75pt solid ${colors.gray};
  padding: 12.5pt 5.25pt 12pt 12pt;
`;

const QText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  text-align: center;
  line-height: 12pt;
  color: #5221cb;
  padding-right: 12pt;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;

/*
import Q from 'public/images/Q.png'
<IconWrap>
<Image src={Q} />
</IconWrap>
const IconWrap = styled.div`
  @media (max-width: 899.25pt ) {
  display: none;
}
`
*/
