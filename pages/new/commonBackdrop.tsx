import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMediaQuery, useTheme, Backdrop, CircularProgress } from '@mui/material';

const MobileModal = ({ 
    open, 
    title = (<p>고객님께 딱 맞는 맞춤 견적서를<br/>생성중입니다..</p>), 
    content = '잠시만 기다려주세요.'
}: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <CustomBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
    >
        <div style={{ margin: '40% auto auto', display: 'contents' }}>
            <CustomCircularProgress color="inherit" />
            <Text_01>{title}</Text_01>
            <Text_02>{content}</Text_02>
        </div>
    </CustomBackdrop>
  );
};

const CustomBackdrop = styled(Backdrop)`
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
`
const CustomCircularProgress = styled(CircularProgress)`margin-bottom: 2.5rem;`
const Text_01 = styled('div')`
    color: #FFF;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.03rem;
    margin-bottom: 0.75rem;

    @media only screen and (min-width: 200px) and (max-width: 480px) {
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 36px; /* 150% */
        letter-spacing: -0.48px;
    }
`
const Text_02 = styled('div')`
    color: #FFF;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 150% */
    letter-spacing: -0.02rem;

    @media only screen and (min-width: 200px) and (max-width: 480px) {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: -0.32px;
    }
`

MobileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.element,
};

export default MobileModal;
