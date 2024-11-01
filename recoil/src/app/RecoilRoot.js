// src/app/RecoilRoot.js

import React from 'react';
import { RecoilRoot } from 'recoil';

const CustomRecoilRoot = ({ children }) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
};

export default CustomRecoilRoot;
