import styled from '@emotion/styled';
import Select from 'components/Select';
import React, { EventHandler, useState } from 'react';

type Props = {};

const test = (props: Props) => {
  const [value, setValue] = useState('');
  const input = document.querySelector('input');

  // input.addEventListener('input', function(e){
  // 	e.value = e.value.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // })
  return (
    <div>
      <Wrap>
        <InputBox
          type="text"
          id="salary"
          draggable={false}
          autoCorrect="false"
          value={value.toLocaleString()}
          onChange={(e) => {
            setValue(e.target.value.toLocaleString());
          }}
        />
      </Wrap>
    </div>
  );
};

export default test;

const Wrap = styled.div`
  border: 1px solid red;
`;
const InputBox = styled.input`
  width: 100%;
  text-align: right;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
