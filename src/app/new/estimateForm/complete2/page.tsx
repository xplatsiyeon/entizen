"use client"

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import WebHeader from '../../../../components/brought/newHeader/BeforeHeaderB';
import Logos from 'public/images/EntizenHeaderLogoSvg.svg';
import CommonModal from '../../commonModal';
import { Button, Icon, Stack } from '@mui/material';
import CheckCircle from '/public/pages/new/estimate/CheckCircle.svg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import styles from '../complete.module.css';

const CompleteForm = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  return (
    <div className={styles.complete_page}>
      <WebHeader />
      {/* <div className={styles.logo}><Image src={Logos}></Image></div> */}
      <Stack className={styles.complete_container} spacing={2}>
        <div className={styles.complete_check}>
          <Image src={CheckCircle} />
        </div>
        <div className={styles.complete_title}>업체 선택이 완료되었습니다.</div>
        <div className={styles.complete_text}>
          <p>
            {' '}
            선택하신 업체에서 현장 실사 및 {isMobile && <br />}이후 일정 조율을
            위해 연락드릴 예정입니다.
          </p>
          {!isMobile && (
            <p>
              추가로 궁금하신 부분이 있다면 엔티즌 고객센터로 연락 주시기
              바랍니다.
            </p>
          )}
        </div>
        <div className={styles.complete_btn_wrapper}>
          <Button
            className={styles.complete_btn}
            variant="contained"
            onClick={() => {
              location.href = '/new/myEstimate';
            }}
          >
            내 견적서 바로가기 <NavigateNextIcon />
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default CompleteForm;
