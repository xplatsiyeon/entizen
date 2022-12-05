import styled from '@emotion/styled';
import { memo } from 'react';
import ReactLoading from 'react-loading';
import colors from 'styles/colors';

const Loader = () => {
  return (
    <LoaderWrap>
      <Container>
        <ReactLoading type="spin" color={colors.main} />
      </Container>
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
  height: 100vh;
  width: 100vw;
  /* background-color: red; */
`;
const Container = styled.div``;
