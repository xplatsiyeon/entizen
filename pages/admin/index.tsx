import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserDetail from 'componentsAdmin/Member/CommonDetail';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import UserTable from 'componentsAdmin/userTable';
import Workspace from 'componentsAdmin/workspace';
import React, { useState } from 'react';

type Props = {};

const index = (props: Props) => {
  const [number, setNumber] = useState(0);
  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <UserManagement />}
      {number === 2 && <CompanyManagement />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
