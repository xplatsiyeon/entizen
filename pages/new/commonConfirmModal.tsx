import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const CommonConfirmModal = ({ open, onClose, onConfirm, title = '', content = '' }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <CustomDialogContent>
        {content} 
      </CustomDialogContent>
      <DialogActions style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
        <CancelButton onClick={onClose} variant="contained">
            취소
        </CancelButton>
        <ConfirmButton onClick={onConfirm} variant="contained">
            확인
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};

const CustomDialogContent = styled(DialogContent)`
    color: #222;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.02rem;
`
const CancelButton = styled(Button)`
    width: 6.75rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.25rem;
    background: #E2E5ED;

    color: #595757;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem; /* 100% */
    letter-spacing: -0.02rem;
`
const ConfirmButton = styled(Button)`
    width: 6.75rem;
    height: 2.5rem;
    flex-shrink: 0;
    border-radius: 0.25rem;
    background: #5221CB;

    color: #FFF;
    text-align: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1rem; /* 100% */
    letter-spacing: -0.02rem;
`


CommonConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element,
};

export default CommonConfirmModal;
