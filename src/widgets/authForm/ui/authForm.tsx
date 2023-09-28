import React, { useState } from 'react';
import { BoxAuth } from './s-authForm';
import features from '@features/authForm/index';
import { Avatar, Typography } from 'antd';

const AuthForm = () => {
  return (
    <BoxAuth>
      <div className="authHeader">
        <Avatar size={40} icon={<img src={'/myLogo.jpg'} alt="avatar" />} />
        <Typography.Title level={2}> Авторизация </Typography.Title>
      </div>
      <features.AuthForm />
    </BoxAuth>
  );
};

export default AuthForm;
