import styled from '@emotion/styled';
import Mypage2_1 from 'components/mypage/request/2-1';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import { useRouter } from 'next/router';

const Mypage2 = () => {
const router = useRouter();

  return (
    <Body>
      <WebHeader num={2} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            <RequestMain page={2} />
          </Wrap1>
          <Wrap2>
            <Wrapper>
              <Input/>
              {
                [].map((a,idx)=>{
                  return(
                    <div key={idx} onClick={()=>router.push('')}>
                    </div>
                  )
                })
              }
              <Btn><span>A/S요청하기</span></Btn>
            </Wrapper>
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Mypage2;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 900pt;
  //width: 281.25pt;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 91.5pt;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 33pt;
border: 2px solid #5221CB;
box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
border-radius: 8px;
`

const Btn = styled.button`
  border: none;
  background: #5221CB;
  color: white;
  padding: 15pt 93pt;
  border-radius: 6pt;
  position: absolute;
  left: 50%;
  margin-top: 75pt;
  transform: translateX(-50%);
`