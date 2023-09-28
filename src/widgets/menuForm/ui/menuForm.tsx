import React, { useState } from 'react';
import { BoxMenu } from './s-menuForm';
import features from '@features/authForm/index';
import { Avatar, Typography } from 'antd';

const MenuForm = () => {
  return (
    <BoxMenu>
      <div className="menuHeader">
        <Typography.Title level={2}> Добро пожаловать ! </Typography.Title>
      </div>
    </BoxMenu>
  );
};

export default MenuForm;
