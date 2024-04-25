"use client"

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import WebHeader from '../../../components/brought/newHeader/BeforeHeaderA';
import CommonModal from '../../commonModal';
import { Button, Icon, Stack } from '@mui/material';
import CheckCircle from '/public/pages/estimate/CheckCircle.svg';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Image from 'next/image';
import styles from '../complete.module.css';

const CompleteForm = () => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  return (
    <div className={styles.complete_page}>
        <WebHeader/>
        <Stack className={styles.complete_container} spacing={2}>
            <div className={styles.complete_check}><Image src={CheckCircle} alt=''/></div>
            <div className={styles.complete_title}>견적 요청이 완료되었습니다.</div>
            <div className={styles.complete_text}>
              <p>카카오톡으로 맞춤 견적서를 {isMobile && <br/>}보내드릴 예정입니다.</p>
              {!isMobile && <p>고객님께서 응답하신 내용을 참고하여 엔티즌 상담팀이 견적서 내용을 친절히 설명드리겠습니다.</p>}
            </div>
            <div><Button className={styles.complete_btn} variant="contained" onClick={() => {
                location.href = '/applyAd';
              }}>홈으로 <NavigateNextIcon /></Button></div>
        </Stack>
    </div>
  );
};

export default CompleteForm;
