import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import { Box, Switch } from '@mui/material';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import term1 from 'public/images/term1.png';
import { useRouter } from 'next/router';

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  nowWidth: number;
};

const Term = ({ setTabNumber, nowWidth }: Props) => {
  const router = useRouter();

  const onClickBack = () => {
    // 로그인 약관에서 라우팅
    if (router.query.setting && router.query.setting === 'true') {
      const {
        query: { userType },
      } = router;
      router.push({
        pathname: 'signUp/Terms',
        query: {
          setting: 'true',
          userType: userType,
        },
      });
      // 다이렉트로 페이지 이동은 router.back()
    } else if (router.query.direct && router.query.direct === 'true') {
      router.back();
      // 설정페이지에서 이동
    } else {
      setTabNumber(0);
    }
  };

  // ①②③④⑤⑥⑦⑧⑨⑩
  return (
    <WebRapper>
      {nowWidth < 1200 && (
        <Header>
          <div className="img-item" onClick={onClickBack}>
            <Image
              style={{
                cursor: 'pointer',
                width: '18pt',
                height: '18pt',
              }}
              src={BackImg}
              alt="btn"
            />
          </div>
          <span className="text">이용 약관</span>
        </Header>
      )}

      <Wrapper>
        <Title>
          <span>엔티즌 플랫폼 서비스 이용약관</span>
        </Title>
        <Subtitle>
          <span>제 1장 환영합니다!</span>
        </Subtitle>
        <SubSubtitle>
          <span>제 1 조 (목적)</span>
        </SubSubtitle>
        <Content>
          저희 엔티즌 서비스 및 제품(이하 통칭하여 ‘서비스’ 또는 ‘엔티즌
          서비스’)을 이용해 주셔서 감사 합니다. 본 약관은 서비스의 이용과
          관련하여 서비스를 제공하는
          <span className="boldText">엘에스일렉트릭(주)</span>(이하 ‘회사’)과
          이를 이용하는 회원 또는 비회원과의 관계를 설명합니다. 뿐만 아니라,
          여러분이 엔티즌을 이용하 는 데 도움이 될 만한 유익한 정보를 포함하고
          있습니다.
          <br />
          <br />
          엔티즌 서비스를 이용하시거나 회원으로 가입하시는 경우 여러분은 본
          약관에 동의하게 되므로, 잠시 시간을 내시어 본 약관의 내용을 살펴봐
          주시기 바랍니다.
        </Content>

        <Subtitle>
          <span>제 2 장 엔티즌 플랫폼 서비스를 즐겨보세요.</span>
        </Subtitle>
        <SubSubtitle>
          <span>제 2 조 (서비스의 제공)</span>
        </SubSubtitle>
        <Content>
          회사는 www.entizen.kr 을 비롯한 엔티즌 도메인의 웹사이트 및 앱을
          통하여 엔티즌 서비스를 제 공하고 있습니다. 엔티즌 플랫폼에서는 전기차
          충전기의 판매, 설치, 운영 및 관련 상품의 구독을 위한 프로젝트를 수행할
          공급자를 구하려는 ‘수요자’와 자신의 프로젝트 수행 경력을 포함한 프로
          필을 등록하거나 수요자에게 상품 및 프로젝트 수행 등의 서비스를
          제공하려는 ‘공급자’가 계약 파트너를 찾을 수 있도록 견적 요청, 정보
          공유 등이 이루어집니다. 이러한 엔티즌 플랫폼 이용에 는 기본적으로 본
          약관이 적용됩니다.
        </Content>
        <SubSubtitle>
          <span>제 3 조 (회원가입)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                여러분은본약관을읽고동의하신후회원가입을신청하실수있습니다.회원의가입신청
                에 대해 회사 정책에 따라 회원 가입 절차가 완료되면 여러분께
                엔티즌 서비스 이용 계정(이 하 ‘계정’)이 부여됩니다. 계정이란
                회원이 엔티즌 서비스에 로그인한 이후 이용하는 각종 서 비스 이용
                이력을 회원 별로 관리하기 위해 설정한 회원 식별 단위를 말합니다.
                개인정보처리방침
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                회원은자신의계정을통해엔티즌서비스를보다편리하게이용할수있습니다.이와관련
                한 상세한 내용은 서비스 내 회원가입 화면을 참조해 주세요.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 4 조 (서비스 이용방법 및 주의점)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                여러분이 무심코 게재한 게시물로 인해 타인의 저작권이 침해되거나
                명예훼손 등 권리 침해 가 발생할 수 있습니다. 여러분은 아래 각
                호에 해당하는 컨텐츠를 포함하여 불법 또는 부적 절한 컨텐츠를
                게시하면 안 됩니다.
                <ul>
                  <FlexWrap2>
                    <li>가.</li>
                    <span>
                      가입신청 또는 변경 시 허위 사실을 기재하거나, 다른 사람의
                      계정 및 비밀번호를 도용, 부정하게 사용하거나, 다른 사람의
                      명의를 사용하거나 명의자의 허락 없이 문자메시지 (SMS) 인증
                      등을 수행하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>나.</li>
                    <span>
                      회사의 동의 없이 서비스 또는 이에 포함된 소프트웨어의
                      일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보 제공하거나
                      타인에게 그 이용을 허락하는 행위와 소프트웨어를 역설계
                      하거나 소스 코드의 추출을 시도하는 등 서비스를 복제, 분해
                      또는 모방하거나 기타 변형 하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>다.</li>
                    <span>
                      상습적으로 프로젝트 진행 의사 없이 견적 및 구현 가능
                      여부를 판단하기 위한 목적으로 서비스를 이용하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>라.</li>
                    <span>
                      구매자가 상습적으로 견적 요청 후 검수 상담만을 진행하고
                      모집은 진행하지 않거나 모 집 중에 요청한 견적의 내용을
                      상습적으로 변경, 조정하는 행위 등 타인이 서비스 이용을
                      방해하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>마.</li>
                    <span>
                      엔티즌 서비스의 취지에 반하여 동일 또는 유사한 내용(비용
                      및 기간을 포함)의 프로젝트 를 반복하여 등록하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>바.</li>
                    <span>허위 또는 과장된 정보를 입력하는 행위</span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>사.</li>
                    <span>
                      회사 및 제3자의 정보를 수집하기 위해 크롤링 하는 행위,
                      또는 엔티즌 서비스를 이용하 여 얻은 정보를 복제 또는
                      유통시키거나 상업적으로 이용하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>아.</li>
                    <span>
                      사전 협의 없이 미팅에 참석하지 않거나 서비스 내에서 체결한
                      계약을 정당한 사유 없이 이행하지 않는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>자.</li>
                    <span>
                      직거래가 금지된 서비스 이용 중 상호(성명), 로고 등 상표,
                      주소, 전화번호, 이메일 주소 등 직접 거래를 유도하거나
                      권유하는 정보를 입력 및 공유하는 행위 또는 사전 협의 없 이
                      회사를 배제하고 직거래를 하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>차.</li>
                    <span>
                      다른 이용자의 개인정보를 수집, 저장, 공개하는 행위
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>카.</li>
                    <span>공공질서 및 미풍양속에 위반되는 내용</span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>타.</li>
                    <span>
                      범죄행위 또는 그와 관련되는 것으로 의심되는 내용
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>파.</li>
                    <span>
                      제 3 자의 권리(초상권, 지식재산권 등)를 침해하는 내용
                    </span>
                  </FlexWrap2>
                  <FlexWrap2>
                    <li>하.</li>
                    <span>
                      기타 법령에 위배되거나 회사의 영업 또는 이익을 저해하는
                      행위
                    </span>
                  </FlexWrap2>
                </ul>
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                회사는이에대한문제해결을위해‘정보통신망이용촉진및정보보호등에관한법률’및
                ‘저작권법’ 등을 근거로 권리침해 주장자의 요청 또는 자체 판단에
                따라, 서면 경고, 게시물 게시 중단, 이용제한, 영구정지, 서비스
                이용계약 해지 등 적절한 조치를 취할 수 있습니다. 다만, 이것이
                회사가 모든 컨텐츠를 검토할 의무가 있다는 것을 의미하지는
                않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                회사는 여러분이 엔티즌 서비스를 마음껏 이용할 수 있도록 여러분께
                엔티즌 서비스에 수반 되는 관련 소프트웨어 사용에 관한 이용
                권한을 부여합니다. 이 경우 여러분의 자유로운 이 용은 회사가
                제시하는 이용 조건에 부합하는 범위 내에서만 허용되며, 회사가
                제공하는 서비 스, 그에 필요한 소프트웨어, 이미지, 마크, 로고,
                디자인, 서비스 명칭, 정보 및 상표 등과 관 련된 지적재산권 및
                기타 권리는 회사에게 있습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>④</li>
              <span>
                여러분은 서비스의 이용 권한, 기타 이용계약상 지위를 타인에게
                양도·증여할 수 없으며, 담 보로 제공할 수 없습니다. 단, 회원이
                기업 또는 단체인 경우, 조직 내 담당 직원의 변경 및 이로 인한
                담당자 정보 변경은 허용됩니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>⑤</li>
              <span>
                혹시라도 여러분이 관련 법령, 회사의 모든 약관 또는 정책을
                준수하지 않는다면, 회사는 여 러분의 위반행위 등을 조사할 수
                있고, 해당 게시물 등을 삭제 또는 임시 삭제하거나 여러분 의
                계정・서비스의 이용을 잠시 또는 계속하여 중단할 수 있습니다.
                다만, 여러분은 이용제한 과 관련하여 조치 결과가 불만족스러울
                경우 고객센터를 통해 이의를 제기할 수 있습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 5 조 (제공되는 서비스)</span>
        </SubSubtitle>
        <Content>
          수요자와 공급자는 엔티즌 플랫폼을 통하여 다음과 같은 서비스를 제공받을
          수 있습니다. 이러한 서비스는 엔티즌 플랫폼을 통하여 무상으로
          제공됩니다.
          <br />
          <p style={{ marginLeft: '20pt', marginTop: '20pt' }}>
            가. 수요자에게 제공되는 서비스
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 전기차 충전기에 대한 종합 가이드북
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 주요 서비스에 대한 간편견적 제공 서비스
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 맞춤형 견적요청 및 수령 기능
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 내 프로젝트 관리 기능
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ A/S 요청 및 관리 기능
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 내 충전소 관리 기능
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 회사 또는 타 회원들과의 채팅 서비스
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 전자계약 체결서비스
          </p>
          <div style={{ marginTop: '50pt' }}>
            <p style={{ marginLeft: '20pt', marginTop: '20pt' }}>
              나. 공급자에게 제공되는 서비스
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ 맞춤형 견적 제출 기능
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ 내 프로젝트 관리 기능
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ A/S 접수 및 결과 등록 기능
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ 내 제품 리스트 등록 및 관리
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ 회사 또는 타 회원들과의 채팅 서비스
            </p>
            <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
              ◼︎ 전자계약 체결서비스
            </p>
          </div>
        </Content>
        <SubSubtitle>
          <span>제 6 조 (회원간 계약체결 중개)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                수요자는 견적을 제출한 공급자에 대하여 현장실사를 진행할 수
                있습니다. 현장실사 후 수요자는 프로젝트를 진행하기로 결정할 수
                있습니다. 이러한 경우, 엔티즌 플랫폼에서 계약 체결 절차를 밟게
                됩니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                전항에 따라 체결하는 계약서의 기초 양식은 회사가 제공합니다.
                계약의 당사자들이 될 수요자와 공급자는 프로젝트 수행에 관한
                구체적인 내용을 상호간의 협의에 따라 결정합니다. 단, 당사자들이
                모두 합의하는 경우에는 어느 일방 당사자가 제공하는 별도의
                양식으로 계약을 체결할 수 있으며, 이 경우 당사자들은 날인된
                계약서를 회사에 제출하거나 플랫폼 내에 등록하여야 합니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                엔티즌회원간체결한계약,수요자와공급자간체결한전항의계약및기타회사와사이에
                체결한 개별 계약은 본 약관에 우선합니다. 당해 개별 계약에서
                정하지 않은 사안에 관하여서는 본 약관이 보충적으로 적용됩니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>④</li>
              <span>
                특별한 사정이 없는 한, 본조 제 1 항의 현장실사 단계에서부터
                당사자들은 엔티즌의 문의사항 및 요청에 대하여 공휴일을 제외하고
                최대 5 일 이내(이하 “확인 기간”)에 응답하여야 합니다. 응답의
                지연으로 인하여 회사가 환불, 취소, 분쟁 해결 절차 착수 등의
                조치에 착수하는 경우, 그에 대한 책임은 지연 당사자에게 있습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>⑤</li>
              <span>
                여러분이 본조에 따라 계약을 체결한다면, 그러한 계약에 따른
                권리와 의무의 주체는 회사나 플랫폼이 아닌 여러분들 즉 당해
                계약서에 당사자로 명시된 자들입니다. 따라서 각 당사자들이 계약
                체결을 위하여 상대방에게 제시하는 사실의 검증의무는 여러분들
                또는 계약 당사자들에게 있지, 회사 또는 플랫폼에게 있는 것이
                아니며 회사 또는 플랫폼이 계약에 따른 결과물을 보장할 수도
                없음을 확인합니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 7 조 (회원간 계약 분쟁해결을 위한 중재)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회사는 회원간 체결한 계약과 관련하여 분쟁이 발생한 경우, 이를
                원만하고 신속하게 해결할 수 있도록 지원합니다. 구체적으로 견적
                산출 및 프로젝트 진행 도중 문제가 발생하는 경우, 당사자 간에
                적극적인 의사소통이 이루어지도록지원합니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                전항의 지원을 통해서도 합의점을 찾지 못하는 경우, 당사자들은
                대한상사중재원에 중재를 신청할 수 있습니다. 대한상사중재원의
                분쟁해결절차는 해당 홈페이지에서 안내 받을 수 있 습니다. (
                <a style={{ cursor: 'pointer' }}>
                  http://www.kcab.or.kr/servlet/main/1000
                </a>
                )
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                회사는본조에따른지원을신청한각회원에대해플랫폼내에서다른회원들이인지할수
                있는 방법으로 분쟁 발생 사실을 표기할 수 있습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 8 조 (권리의 귀속 및 저작물의 이용)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                여러분이 제작하여 게재한 게시물에 대한 지식재산권 등의 권리는
                당연히 여러분에게 있습니 다. 회사는 여러분이 게재한 게시물을
                소중히 보호할 것을 약속드립니다. 게시물은 여러분이 정보 또는
                의견을 표현하기 위한 목적으로 엔티즌 서비스 상에 게재한 부호,
                문자, 음성, 음 향, 그림, 사진, 동영상, 링크 등으로 구성된 각종
                컨텐츠 자체 또는 파일을 말합니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                엔티즌 서비스에 게시물을 게재하는 것은 여러분이 회사에게 이용
                권한(저장, 복제, 수정, 공 중 송신, 전시, 배포, 2 차적 저작물
                작성)을 부여하는 것으로 됩니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                회사는여러분이부여해주신컨텐츠이용권한을저작권법등관련법령이정하는바에따
                라 엔티즌 서비스 내 노출, 서비스 홍보를 위한 활용, 서비스 운영,
                개선 및 새로운 서비스 개발을 위한 연구, 웹 접근성 등 법률상 의무
                준수, 외부 사이트에서의 검색, 수집 및 링크 허용을 위해서만
                행사할 수 있습니다. 만약, 관련법령이나 회사 개인정보처리방침에
                따라 사 전에 여러분께 설명을 드리고 동의를 받아야 하는 경우가
                발생하면 별도로 여러분께 연락을 드릴 것입니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>④</li>
              <span>
                여러분은언제든지자신이게재한게시물을삭제할수있고,이를이용하지말것을회사에
                요청할 수 있습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 9 조 (개인정보의 보호)</span>
        </SubSubtitle>
        <Content>
          회사는 서비스의 원활한 제공을 위하여 회원이 동의한 목적과 범위
          내에서만 개인정보를 수집ᆞ 이용하며, 개인정보 보호 관련 법령에 따라
          안전하게 관리합니다. 우리 회사가 이용자의 개인정보 를 안전하게
          처리하기 위하여 기울이는 노력이나 관련 정책은 개인정보처리방침에서
          확인하실 수 있습니다.
        </Content>
        <Subtitle>
          <span>제 3 장 기타</span>
        </Subtitle>
        <SubSubtitle>
          <span>제 10 조 (손해배상 등)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회사는여러분이엔티즌서비스를이용함에있어회사의고의또는과실로인하여손해를입
                게 될 경우 관련 법령에 따라 여러분의 손해를 배상합니다. 다만,
                천재지변, 국가비상사태, 기 간통신 사업자의 전기통신서비스 제공
                중지, 법령의 개폐, 정부정책의 변경 또는 이에 준하는 불가항력으로
                인하여 회사가 서비스를 제공할 수 없거나 이용자의 고의 또는
                과실로 인하여 서비스를 이용할 수 없어 발생한 손해에 대해서
                회사는 책임을 부담하지 않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                그리고 회사가 손해배상책임을 부담하는 경우에도 통상적으로 예견이
                불가능하거나 특별한 사정으로 인한 특별 손해 또는 간접 손해, 기타
                징벌적 손해에 대해서는 관련 법령에 특별한 규정이 없는 한 책임을
                부담하지 않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                한편,엔티즌서비스를매개로한여러분과다른회원간또는여러분과비회원간의의견
                교환, 거래 등에서 발생한 손해나 여러분이 서비스 상에 게재된
                타인의 게시물 등의 컨텐츠 를 신뢰함으로써 발생한 손해에 대해서도
                회사는 특별한 사정이 없는 한 이에 대해 책임을 부담하지 않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>④</li>
              <span>
                사전에 공지된 서비스용 설비의 보수, 교체, 정기점검, 공사 등
                부득이한 사유로 서비스 제공 이 중단되거나 서비스 이용에 장애가
                발생하는 경우에도 특별한 사정이 없는 한 회사는 이에 대하여
                책임을 부담하지 않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>⑤</li>
              <span>
                회사는엔티즌플랫폼상프로필,업무경력등회원이직접작성하여게시한내용을검증할
                의무를 부담하지 않으며 그 진실성을 보장하지 않습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>⑥</li>
              <span>
                회원이 본 약관 또는 관련법령을 위반함으로써 회사에 피해를
                발생시키는 경우, 회원은 그 손해를 배상하여야 합니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>⑦</li>
              <span>
                회사는 판매자와 구매자 간 체결한 서비스 계약에 따른 결과물에
                대하여 검수 또는 검사할 의무가 없습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 11 조 (이용계약의 해지)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회원은언제든지서비스이용계약해지를신청하여회원탈퇴할수도있습니다.이경우회
                사는 관련 법령 등이 정하는 바에 따라 이를 지체 없이
                처리하겠습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                엔티즌 서비스 이용계약이 해지되면, 관련 법령 및
                개인정보처리방침에 따라 회사가 해당 회 원의 정보를 보유할 수
                있는 경우를 제외하고, 해당 회원 계정에 부속된 게시물 일체를 포함
                한 회원의 모든 데이터는 소멸됨과 동시에 복구할 수 없게 됩니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 12 조 (서비스의 변경 및 종료)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회사는 연중 무휴, 1일 24시간 안정적으로 서비스를 제공하기 위해
                최선을 다하고 있습니다. 그러나 컴퓨터, 서버 등 정보통신설비의
                보수점검, 교체 또는 고장, 통신두절 등 운영상 상당 한 이유가 있는
                경우 부득이 서비스의 전부 또는 일부를 중단할 수 있습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                한편,서비스운영또는개선을위해회사는서비스의전부또는일부를변경하거나종료할
                수도 있습니다. 무료로 제공되는 서비스의 전부 또는 일부를 수정,
                변경 또는 종료하게 된 경 우 특별한 경우가 아니라면 별도의 보상을
                하지 않습니다. 이 경우 회사는 상당기간 전에 이 를 안내하며, 만약
                예측 불가능한 사유로 인한 갑작스러운 변경 및 종료라고 하더라도
                사후 지체 없이 상세히 설명하고 안내 드리겠습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 13 조 (통지및공지)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회사는 서비스 이용에 필요한 주요사항을 적시에 잘 안내해 드릴 수
                있도록 힘쓰겠습니다. 회원에게 통지를 하는 경우 전자메일, 서비스
                내 알림 또는 기타 적절한 전자적 수단을 통해 개별적으로 알려 드릴
                것이며, 다만 회원 전체에 대한 통지가 필요할 경우엔 7 일 이상
                www.entize.kr을 비롯한 엔티즌 도메인의 웹사이트 등에 관련 내용을
                게시하도록 하겠습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                회사는 여러분의 소중한 의견에 귀 기울이겠습니다. 여러분은
                언제든지 고객센터를 통해 서 비스 이용과 관련된 의견이나
                개선사항을 전달할 수 있으며, 회사는 합리적 범위 내에서 가 능한
                그 처리과정 및 결과를 여러분께 전달할 수 있도록 하겠습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 14 조 (약관의 효력 및 변경)</span>
        </SubSubtitle>
        <Content>
          <ul>
            <FlexWrap>
              <li>①</li>
              <span>
                회사는 본 약관의 내용을 여러분이 쉽게 확인할 수 있도록 엔티즌
                서비스에 게시합니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>②</li>
              <span>
                회사는필요한경우본약관,계정및게시물운영정책을개정할수있습니다.변경하는경우
                에도 관련 법령에 따라서 공정한 내용으로 변경할 것이며, 일부
                이용자 및 회원에게 불리할 수 있는 중대한 내용의 약관 변경의
                경우에는 최소 30일 이전에 서비스 내에 공지하거나 개 별적으로
                연락을 드려 통지하도록 하겠습니다.
              </span>
            </FlexWrap>
            <FlexWrap>
              <li>③</li>
              <span>
                회사는 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관
                변경에 대한 여러분의 의견을 기다립니다. 위 기간이 지나도록
                여러분 반대의견을 제출하지 않으면 여러분이 본 약 관에 따라
                서비스를 이용하는 데에 동의하는 것으로 간주됩니다. 만약,
                여러분이 변경된 약관 에 동의하지 않는다면 회사에 알려주시기
                바랍니다. 이러한 경우 추후 서비스의 제공이 불가 능하게 될 수
                있습니다.
              </span>
            </FlexWrap>
          </ul>
        </Content>
        <SubSubtitle>
          <span>제 15 조 (준거법 및 분쟁해결)</span>
        </SubSubtitle>
        <Content>
          본 약관 또는 엔티즌 서비스와 관련된 여러분과 회사와의 관계에는
          대한민국의 법이 적용됩니다. 회사는 그리고 본 약관 또는 엔티즌 서비스와
          관련하여 여러분과 회사 사이에 분쟁이 발생할 경 우, 대한민국의
          민사소송법이 정한 절차에 따라 이를 해결합니다.
          <br />
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 공지 일자: 2023 년 00 월 00 일
          </p>
          <p style={{ marginLeft: '35pt', marginTop: '20pt' }}>
            ◼︎ 시행 일자: 2023 년 1 월 2 일
          </p>
          <br />
          엔티즌 서비스와 관련하여 궁금하신 사항이 있으시면 고객센터(대표번호:
          0000-0000/ 평일 09:00~18:00)로 문의 주시기 바랍니다
        </Content>
        {/* ---------------------------------------------------------------------- */}
        <Title style={{ marginTop: '100pt' }}>
          <span>엔티즌 플랫폼 개인정보처리방침</span>
        </Title>
        <Content>
          <Line />
          <ul>
            <li>1. 개인정보처리방침</li>
            <li>2. 개인정보 수집 및 이용</li>
            <li>3. 개인정보 제공</li>
            <li>4. 개인정보 파기</li>
            <li>5. 개인정보 자동수집 장치의 설치•운영 및 거부에 관한 사항</li>
            <li>6. 기타사항</li>
            <li>7. 개인정보처리방침 변경</li>
          </ul>
          <Line />
        </Content>
        <Subtitle>
          <span>1. 개인정보처리방침</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 개인정보처리방침의  목적'}`}</span>
        </SubSubtitle>
        <Content>
          엘에스일렉트릭(주)(이하 “회사”라고 합니다)는 여러분의 개인정보를
          수집할 때 반 드시 동의를 받고 수집합니다. 이용자 분들 한 분, 한 분의
          권리를 적극적으로 보장하기 위하여 본 개인정보처리방침을 마련하여 모든
          임직원이 준수하고 있 습니다. 회사는 여러분의 개인정보를 소중히 다루며,
          이용자 모두가 안심하고 서비스를 이용할 수 있도록 최선의 노력을 다할
          것을 약속드립니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 회사의 노력'}`}</span>
        </SubSubtitle>
        <Content>
          구체적으로 회사는 개인정보 처리와 관련하여 다음의 노력을 하고
          있습니다.
          <br />• 이용자의 개인정보를 암호화하여 저장합니다. <br />• 해킹이나
          컴퓨터 바이러스로부터 보호하기 위하여 방어 시스템을 갖추고 있 습니다.
          <br />• 회사 직원 중에서도 최소한의 인원만이 이용자의 개인정보에
          접근할 수 있 습니다. <br />• 개인정보에 접근할 수 있는 임직원에게 관련
          교육을 정기적으로 실시하고 있습니다. <br />• 인정보보호 및 방법에 대해
          국내 및 국제 인증 규격을 충족하고 있습니다.
        </Content>
        <Subtitle>
          <span>2. 개인정보 수집 및 이용</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 수집항목'}`}</span>
        </SubSubtitle>
        <Content>
          회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 어플리케이션을
          통해 아래와 같은 서비스를 제공하기 위하여 필요한 최소한의 개인 정보를
          수집하고 있습니다.
          <ImgBox src="/images/term1.png" alt="1" />
          <ImgBox src="/images/term2.png" alt="2" />
        </Content>
        <SubSubtitle>
          <span>{`${'나) 수집  방법'}`}</span>
        </SubSubtitle>
        <Content>
          회사는 다음과 같은 방법을 통해 개인정보를 수집합니다.
          <br />• 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
          동 의를 하고 직접 정보를 입력하는 경우 <br />• 제휴 서비스 또는
          단체로부터 개인정보를 제공받은 경우
        </Content>
        <SubSubtitle>
          <span>{`${'다) 보존 기간'}`}</span>
        </SubSubtitle>
        <Content>
          회사는 이용자의 서비스 마지막 이용일 / 회원 탈퇴 후 1년이 되는 시점
          또는 법령에 따른 보존 기간이 경과되는 시점에 보관하던 해당 이용자의
          모든 개인정 보를 삭제합니다.
        </Content>
        <Subtitle>
          <span>3. 개인정보 제공</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 위탁업체  제공 '}`}</span>
        </SubSubtitle>
        <Content>
          회사의 서비스 제공을 위해 협력하는 외부 위탁업체에게 회사는 업무
          수행을 위하여 필요한 범위내에서 개인정보 처리를 위탁하고 있습니다.
          <ImgBox src="/images/term3.png" alt="3" />
          회사는 서비스 제공의 안정성과 최신 기술을 이용자에게 제공하기 위해
          국외에 개인정보를 위탁하고 있으며, 이용자로부터 취득 또는 생성한
          개인정보를 AWS (Amazon Web Services Inc.)가 보유하고 있는
          데이터베이스(물리적 저장 장소: 일 본)에 저장합니다. AWS는 해당 서버의
          물리적인 관리만을 행하고, 이용자의 개 인정보에 접근할 수 없습니다.
          <ImgBox src="/images/term4.png" alt="4" />
        </Content>
        <SubSubtitle>
          <span>{`${'나) 제3자  제공 '}`}</span>
        </SubSubtitle>
        <Content>
          회사는 제3자에게 개인정보를 제공하지 않습니다. 다만, 이용자에게 별도
          동의 를 받은 경우 또는 법령에 규정된 경우에는 제공할 수 있습니다.
        </Content>
        <Subtitle>
          <span>4. 개인정보 파기</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 이용목적  달성시  파기'}`}</span>
        </SubSubtitle>
        <Content>
          개인정보는 수집 및 이용목적이 달성되면 지체없이 파기합니다. 전자적
          파일 형 태로 보관하던 개인정보는 복구 및 재생되지 않도록 안전하게
          삭제하고, 그 밖 에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나
          소각합니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 법령에 따른 보관'}`}</span>
        </SubSubtitle>
        <Content>
          법령에 따라 일정 기간 보관해야 하는 개인정보 및 해당 법령은 아래 표와
          같 습니다.
          <ImgBox src="/images/term5.png" alt="5" />
        </Content>
        <Subtitle>
          <span>5. 개인정보 자동수집 장치의 설치•운영 및 거부에 관한 사항</span>
        </Subtitle>
        <Content>
          회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의
          정보를 수시로 저장하고 불 러오는 '쿠키(cookie)'를 운용하는 경우가
          있습니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버 가 이용자의
          브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터
          하드디스크에 저장됩니다.
        </Content>
        <SubSubtitle>
          <span>{`${'가) 사용  목적'}`}</span>
        </SubSubtitle>
        <Content>
          이용자가 회사 웹사이트에 방문할 경우 웹사이트 서버는 이용자의
          디바이스에 저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을
          유지하고 맞춤화된 서 비스를 제공하게 됩니다. 물론 이용자는 쿠키 설치에
          대한 선택권을 가지고 있습니다. 이용자는 웹브라우 저에서 옵션을
          설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확 인을
          거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 쿠키  설정  거부  방법'}`}</span>
        </SubSubtitle>
        <Content>
          쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을
          선 택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을
          거치거나, 모 든 쿠키의 저장을 거부하는 방법이 있습니다.
          <br />
          <HowTo style={{ paddingTop: '10pt' }}> [설정방법의 예]</HowTo>
          <HowToTitle>{`${'1) Chrome의  경우'}`}</HowToTitle>
          <HowTo>{`웹  브라우저  우측의  설정  메뉴  >  화면  하단의  고급  설정  표시  >  개인정보
의  콘텐츠  설정  버튼  >  쿠키`}</HowTo>
          <HowToTitle>{`${'2) firefox의  경우'}`}</HowToTitle>
          <HowTo>{`옵션  메뉴  >  개인정보    방문기록-사용자  정의  설정  >  쿠키수준  설정`}</HowTo>
          <HowToTitle>{`${'3) safari의  경우'}`}</HowToTitle>
          <HowTo>{`환경설정  메뉴  >  개인정보  탭  >  쿠키  및  웹  사이트  데이터  수준  설정`}</HowTo>
          단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스 이용에
          어려움 이 있을 수 있습니다.
        </Content>
        <Subtitle>
          <span>6. 가명정보 처리에 관한 사항</span>
        </Subtitle>
        <Content>
          회사는 수집한 개인정보의 일부를 삭제하거나 일부 또는 전부를 대체하는
          등의 방법으로 추가 정 보가 없이는 특정 개인을 알아볼 수 없도록
          가명처리하여 이용하는 경우, 원래의 상태로 복원하 기 위한 추가 정보를
          별도로 분리하여 보관ᆞ관리하는 등 해당 정보가 분실ᆞ도난ᆞ유출ᆞ위조ᆞ 변조
          또는 훼손되지 않도록 안전성 확보에 필요한 기술적ᆞ관리적 및 물리적
          조치를 취하고 있습니다.
        </Content>

        <Subtitle>
          <span>7. 기타사항</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 이용자의  권리'}`}</span>
        </SubSubtitle>
        <Content>
          이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
          수집・이 용에 대한 동의 철회 또는 가입 해지를 요청할 수 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 개인정보  수정  및  삭제  요청'}`}</span>
        </SubSubtitle>
        <Content>
          이용자는 자신의 개인정보에 대한 수정 및 삭제를 요청할 수 있습니다.
          수정의 경우 회사는 수정 완료 전까지 해당 개인정보의 이용을 중지하며,
          삭제의 경우 요청 즉시 개인정보를 삭제합니다.
        </Content>
        <SubSubtitle>
          <span>{`${'다) 개인정보  보호책임자'}`}</span>
        </SubSubtitle>
        <Content>
          • 책임자: 이름 (직책) <br />• 담당부서
          <br />• 연락처: 전화번호, 이메일 <br />
          <br />
          개인정보가 침해되어 이에 대한 신고나 상담이 필요하신 경우에는 아래
          기관에 문의하셔서 도움 을 받으실 수 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'개인정보침해  신고센터'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)118 <br />
          <a href="https://privacy.kisa.or.kr/main.do">
            {`• https://privacy.kisa.or.kr/main.do`}
          </a>
        </Content>
        <SubSubtitle>
          <span>{`${'대검찰청  사이버수사과'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)1301 <br />
          <a href="cid@spo.go.kr">{`• cid@spo.go.kr`}</a>
        </Content>
        <SubSubtitle>
          <span>{`${'경찰청  사이버안전국'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)182 <br />
          <a href="https://cyberbureau.police.go.kr">{`• https://cyberbureau.police.go.kr`}</a>
        </Content>
        <Subtitle>
          <span>8. 개인정보처리방침 변경</span>
        </Subtitle>
        <Content>
          회사는 법률이나 서비스의 변경에 따라 개인정보처리방침을 개정할 수
          있습니다. 개인정보처리방 침을 개정하는 경우 웹사이트 공지사항(또는
          개별공지)을 통하여 공지할 것입니다.
          <br />
          <br /> 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이
          이용자 권리의 중대한 변경이 발생 할 때에는 최소 30일 전에 미리
          알려드리겠습니다.
          <br />
          <br />• 공고 일자:
          <br />
          <br />• 시행 일자:
        </Content>
        {/* <Contents wrap="hard" readOnly value={data} /> */}
        {/* {data} */}
        {/* <div dangerouslySetInnerHTML={{ __html: data }} /> */}
      </Wrapper>
    </WebRapper>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    padding-top: 42pt;
    padding-bottom: 132pt;
    width: 580.5pt;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
  }
`;

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding: 0 38.25pt;
    max-height: 625px;
    overflow-y: scroll;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const Title = styled.div`
  margin-top: 21pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 18pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Subtitle = styled.div`
  margin-top: 34pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const SubSubtitle = styled.div`
  margin-top: 24pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 400;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Content = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
  & li {
    :first-child {
      padding-top: 10pt;
    }
    padding-bottom: 5pt;
  }
  .boldText {
    font-weight: 600;
  }
`;

const HowTo = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
`;

const HowToTitle = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 600;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
`;

const ImgBox = styled.img`
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  border-top: 0.75pt solid black;
`;

const Contents = styled.div``;

const FlexWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15pt;
`;

const FlexWrap2 = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10pt;
`;

export default Term;
