import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import React, { useEffect, useState, Dispatch, SetStateAction, } from 'react';
import AvatarIcon from 'public/images/avatar.png';
import AvatarPhoto from 'public/images/avatar-photo.png';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { InputAdornment, TextField, Typography } from '@mui/material';
import CompanyAddress from 'components/SignUp/CompanyAddress';
import arrowRight from 'public/images/arrow-right.png';
import ProfileEditing from 'componentsCompany/Profile/profileEditing';
import EditCertificate from 'componentsCompany/Profile/editCertificate';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import EditPW from 'componentsCompany/Profile/editPW';
import SignUpManagerInfo from 'pages/signUp/ManagerInfo';



const ProfileIndex = () => {

    const [component, setComponent] = useState<number>(1)

    const components = [
    <ProfileEditing setComponent={setComponent}/>, 
    <EditPW setComponent={setComponent}/>,
    <EditCertificate setComponent={setComponent}/>,
    <SignUpManagerInfo setComponent={setComponent}/>
    ]


    return (
        <WebBody>
        <WebHeader />
        <Wrapper>
            { (component === 1) &&<FlexBox className='???'>
            {components[0]}
            </FlexBox> }
            {(component > 1)  && 
            <HiddenBox className='!!!'>
            {components[0]}
            </HiddenBox>}
            {(component !== 1) &&<FlexBox2 className='?!!?'>
            {components[component-1]}
            </FlexBox2>}
        </Wrapper>
        <WebFooter />
        </WebBody>
    );
};

export default ProfileIndex;

const Wrapper = styled.div`
display: flex;
justify-content: center;
gap: 60pt;

@media (max-width: 899.25pt) {
    padding: 0;
    height: 100%;
  }
`
const FlexBox = styled.div`

display: block;
  position: relative;
  width: 282pt;
  //width: 281.25pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 31.5pt 42pt;
  margin: 45.75pt 0;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    background: none;
  }
`
const FlexBox2 = styled(FlexBox)`
width:560pt;
padding: 32.25pt 22.5pt 42pt;;
`
const HiddenBox = styled.div`
display: block;
  position: relative;
  width: 282pt;
  height: 500pt;
  overflow-y: scroll;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 31.5pt 42pt;
  margin: 45.75pt 0;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    background: none;
  }
    
@media (max-width: 899.25pt) {
    display: none;
  }
`

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 800pt) {
    display: block;
  }

  @media (min-width: 900pt) {
    height: 100%;
  }
`;