import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Contents } from 'pages/faq';

interface Props {
  data: Contents[];
}

const FaqInfomation = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean[]>(
    Array.from({ length: data.length }, () => false),
  );

  const handleClick = (id: number) => {
    let temp = [...open];
    temp[id] = !temp[id];
    setOpen(temp);
  };

  return (
    <div>
      {data?.map((list) => (
        <div key={list.id}>
          {/* Close */}
          <ItemButton onClick={() => handleClick(list.id)}>
            <ListItemText primary={list.name} />
            {open ? (
              <Image src={UpArrow} alt="up_arrow" />
            ) : (
              <Image src={DownArrow} alt="down_arrow" />
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
