import React from 'react';
import { styled } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import CommonModal from '../commonModal';
import { Stack } from '@mui/material';
import styles from './form.module.css'

const TermsModal = ({ open, onClose }: { open: boolean, onClose: any }) => {
  const isMobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  return (
    <div>
        <CommonModal 
          open={open} 
          onClose={onClose} 
          title={<p style={{ fontSize: '20px', fontStyle: 'normal', fontWeight: 700, lineHeight: '20px', letterSpacing: '-0.4px' }}>개인정보 동의 안내</p>}
          content={
            <div className={styles.form_detail_container}>
              <Stack spacing={2}>
                <div className={styles.item}>
                  <p className={styles.title}>1. 수집 항목</p>
                  <p className={styles.description}>전화, 주소, 이메일</p>
                </div>
                <div className={styles.item}>
                  <p className={styles.title}>2. 목적</p>
                  <p className={styles.description}>이용자식별 및 본인 여부 확인,서비스 제공</p>
                </div>
                <div className={styles.item}>
                  <p className={styles.title}>3. 이용 기간</p>
                  <p className={styles.description}>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정 기간동안 개인정보를 보관할 수 있습니다. - 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래등에서의 소비자보호에 관한 법률)</p>
                </div>
              </Stack>
            </div>
          } />
    </div>
  );
};

export default TermsModal;
