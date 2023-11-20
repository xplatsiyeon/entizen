import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { IconButton, useMediaQuery, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CommonModal = ({ open, onClose, title = '', content }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const CustomDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiPaper-root': {
            height: isMobile ? '70%' : '37.5rem',
            'margin-top': isMobile && 'auto',
            'border-radius': isMobile ? '2.25rem 2.25rem 0rem 0rem' : '1rem',
            background: '#FFF',
        },
    }));

  return (
    <CustomDialog fullScreen={isMobile} open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
          {content} 
      </DialogContent>
    </CustomDialog>
  );
};


CommonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element,
};

export default CommonModal;
