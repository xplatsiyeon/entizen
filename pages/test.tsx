import styled from '@emotion/styled';
import Select from 'components/Select';
import React, { EventHandler, useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

type Props = {};

const test = (props: Props) => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);
  const input = document.querySelector('input');

  // input.addEventListener('input', function(e){
  // 	e.value = e.value.replace(/[^0-9]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // })
  console.log('test: ', NumericFormat(213321));

  return (
    <div>
      <Wrap>
        <InputBox
          type="text"
          id="salary"
          draggable={false}
          autoCorrect="false"
          value={value}
          // data-value={'400'.toLocaleString()}
          onChange={(e) => {
            setValue(
              Number(e.target.value)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            );
            // ref.current?.value = e.target.value.toLocaleString();
            // setValue(e.target.value.toLocaleString());
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
