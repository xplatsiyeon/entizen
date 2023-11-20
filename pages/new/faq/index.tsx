import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CommonModal from '../commonModal';
import { Accordion, AccordionDetails, AccordionSummary, Button, Icon, Stack, Typography } from '@mui/material';
import CheckCircle from 'public/new/estimate/CheckCircle.svg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import styles from './index.module.css';
import WebHeader from 'componentsWeb/WebHeader';

const qna = [
  {
    question: '업체마다 가격 차이가 나는 이유는 무엇인가요?',
    answer: '충전기의 디자인과 기능, 전용앱의 서비스에 따라 금액 차이가 발생합니다. 충전 속도에는 차이가 없습니다.',
  },
  {
    question: '중개 플랫폼인 엔티즌을 끼고 하면 수수료가 붙어서 더 비싼 거 아닌가요?',
    answer: '견적서 가격은 파트너 업체들의 실제 가격과 동일하거나, 엔티즌 파트너 특가를 통해 시중 가격 대비 오히려 할인된 업체도 있습니다.',
  },
  {
    question: '어떤 업체의 제품이 국산 제품인가요?',
    answer: '저희 파트너 업체들의 충전기는 모두 국산 제품입니다.',
  },
  {
    question: '설치 기간 어떻게 되나요?',
    answer: '설치 기간은 업체마다 약간의 차이가 있으나 평균적으로 공사 완료까지 1~2주정도 소요됩니다.(비공용 충전기 기준)',
  },
  {
    question: '업체 선택 이후에는 어떻게 진행 되나요?',
    answer: '업체 선택 이후 현장실사 - 계약진행 - 공사시작 단계로 진행되며 담당자가 현장 실사 등 이후 절차 안내를 위해 개별 연락을 드립니다.',
  },
  {
    question: '선택한 업체가 마음에 들지 않으면 어떻게 하나요?',
    answer: '저희 파트너는 엄선된 업체들로 최선의 서비스를 제공하고 있습니다. 하지만 다른 업체와 진행하고 싶으실 경우 엔티즌 고객센터로 연락 주시면 다른 업체와 진행하실 수 있습니다.',
  },
  {
    question: 'A/S 보증기간은 몇년인가요?',
    answer: '계약기간 2년 동안 무상 A/S가 가능합니다. (사용자 과실로 인한 고장/파손은 별도 비용 발생) 계약 기간 종료 후에는 별도의 A/S 비용이 발생할 수 있습니다.',
  },
  {
    question: '한전 불입금은 어떤 상황에서 발생하나요?',
    answer: '충전기를 설치하고자 하는 장소의 여유 전력에 따라 발생합니다. 보통의 가정집에서는 3~5kW의 계약전력을 사용하고 있기 때문에 7kW 완속 충전기를 설치할 시 한전 불입금이 발생합니다. (선택한 업체에서 한전 필요 서류 제출 대행합니다.)',
  },
]

const Faq = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className={styles.faq_page}>
        <div className={styles.title}>자주 묻는 질문</div>
        <div className={styles.faq_container}>
            {isMobile ? (
                <div>
                  {qna.map((item, index) => {
                    return (
                      <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                        <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                        <Typography>{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {item.answer}
                        </Typography>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })}
                </div>
            ) : (<div></div>)}
        </div>
    </div>
  );
};

export default Faq;
