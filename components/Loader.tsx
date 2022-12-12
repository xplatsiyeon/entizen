import styled from '@emotion/styled';
import { memo } from 'react';
import ReactLoading from 'react-loading';
import colors from 'styles/colors';

type Props = {
  type?: string | 'images';
};

const Loader = ({ type }: Props) => {
  if (type === 'images') {
    return (
      <LoaderBox>
        <ReactLoading type="spin" color={colors.main} />
      </LoaderBox>
    );
  }

  return (
    <LoaderWrap className={type ? 'images' : ''}>
      <ReactLoading type="spin" color={colors.main} />
    </LoaderWrap>
  );
};
export default memo(Loader);

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  z-index: 999;
  height: 100%;
  width: 100%;
  .images {
    border: 1px solid red;
    background-color: red;
    width: 100%;
    height: 100%;
  }
`;

const LoaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15pt auto;
`;
