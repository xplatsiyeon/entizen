import styled from '@emotion/styled';

export const AdminBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3pt;
  padding: 5px 5px;
  height: 26px;
  background: #e2e5ed;
  border: 1px solid #747780;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  text-align: center;
`;

export const DetailWrapper = styled.div`
  position: absolute;
`;

export const DarkAdminBtn = styled.button<{ margin?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //border-radius: 3pt;
  padding: 5px 17px;
  height: 26px;
  width: 64px;
  background: #464646;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  outline: none;
  color: white;
  margin: ${({ margin }) => (margin ? margin : '0 auto')};
`;

export const GrayBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px 17px;
  height: 26px;
  width: 64px;
  background: #747780;
  //border: 1px solid #464646;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  outline: none;
  color: white;
`;
