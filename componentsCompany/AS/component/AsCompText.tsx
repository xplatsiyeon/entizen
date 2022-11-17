import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import colors from "styles/colors";
import fileImg from 'public/mypage/file-icon.svg';
import Image from "next/image";
import { Button } from "@mui/material";

const AsCompText = ()=>{
    //dummy text


  const [modalOpen, setModalOpen] = useState<boolean>();
  // 파일 다운로드 함수

  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);



    return( 
        <>
        <Wrapper>
          <ReceiptTitle>접수내용</ReceiptTitle>
          <SecondList>
            <Items>
              <span className="name">제목</span>
              <span className="value">
                100kW 충전기의 충전 건이 파손되었습니다.
              </span>
            </Items>
            <Items>
              <span className="name">요청내용</span>
              <span className="value">
                사용자의 실수로 충전 건이 파손되었습니다. 수리 또는 교체 해주세요.
              </span>
            </Items>
            <Items>
              <span className="name">접수일자</span>
              <span className="value">2022.05.17 18:13 </span>
            </Items>
            <Items>
              <div className="name">첨부파일</div>
              <div className="value">
                <FileBox>
                    <FileBtn onClick={DownloadFile}>
                    <Image src={fileImg} alt="file-icon" />
                    충전건 1.jpg
                    </FileBtn>
                    <FileBtn onClick={DownloadFile}>
                    <Image src={fileImg} alt="file-icon" />
                    충전건 2.jpg
                    </FileBtn>
                </FileBox>
              </div>
            </Items>
          </SecondList>
          <ReceiptTitle>접수확인</ReceiptTitle>
          <SecondList>
            <Items>
              <span className="name">내용</span>
              <span className="value">
                파손 정도 파악 및 수리/교체를 위해 금주 중 방문하도록 하겠습니다.
              </span>
            </Items>
            <Items>
              <span className="name">답변일자</span>
              <span className="value">2022.05.18 20:21 </span>
            </Items>
          </SecondList>
          <ReceiptTitle>A/S결과</ReceiptTitle>
          <SecondList>
            <Items>
              <span className="name">내용</span>
              <span className="value">충전 건 교체</span>
            </Items>
            <Items>
              <span className="name">A/S일자</span>
              <span className="value">2022/05.20 14:52</span>
            </Items>
            <Items>
              <div className="name">첨부파일</div>
              <div className="value">
                <FileBox>
                <FileBtn onClick={DownloadFile}>
                  <Image src={fileImg} alt="file-icon" />
                  DSFJEIFKSL.jpg
                </FileBtn>
                </FileBox> 
              </div>
            </Items>
          </SecondList>
        </Wrapper>
      </>
    )
}

export default AsCompText;


const Wrapper = styled.div`
  padding-top: 21pt;
`;

const ReceiptTitle = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const SecondList = styled.ul`
  margin-top: 12pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: 1px solid #E9EAEE;;
`;

const Items = styled.li`
  display: flex;
  gap: 26.5pt;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    width: 20%;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    width: 80%;
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
    position: relative;
  }
`;

const FileBox = styled.div`
`

const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  /* margin-top: 15pt; */
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
  margin-bottom: 7.5pt;
`;