import React, { useState } from 'react';
import { SForm } from './s-authForm';
import { authTry, validationSchema } from './api';
import { useFormik } from 'formik';
import { Button, Form, Input, Typography } from 'antd';
import { useAppDispatch } from '@/shared/store/redux';
import { addToken } from '@/entities/session/sessionSlice';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/main';
import { IUser, addUser } from '@/entities/users/userSlice';

const AuthForm = () => {
  const navigate = useNavigate();

  function navigateReg() {
    navigate('/reg');
  }

  const dispatch = useAppDispatch();

  const [err, setErr] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      authTry(values.email, values.password)
        .then(async (userCredential) => {
          const { user } = userCredential;
          return {
            token: await user.getIdToken(),
            uid: user.uid,
          };
        })
        .then(({ token, uid }) => {
          getDoc(doc(db, 'users', uid)).then((userData) => {
            console.log(userData);
            if (userData.exists()) {
              let userAdd: IUser = {
                uid: userData.data().uid,
                name: userData.data().name,
                mail: userData.data().mail,
                password: userData.data().password,
                creationTime: userData.data().creationTime,
              };
              dispatch(addUser(userAdd));
              dispatch(addToken(token));
              setErr('');
            }
          });
        })
        .catch((error) => {
          setErr('Введены некорректные данные');
        });
    },
  });

  const handlerKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  return (
    <Form onSubmitCapture={formik.handleSubmit} onKeyDown={handlerKeyDown}>
      {err && (
        <Typography.Title level={5} type="danger" className="error">
          {err}
        </Typography.Title>
      )}
      <SForm
        help={formik.touched.email && formik.errors.email}
        validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
        label={formik.initialValues.email}
        className="authItem"
      >
        <Input
          placeholder="Введите почту"
          id="email"
          name="email"
          allowClear
          width={'300px'}
          onChange={formik.handleChange}
          className="authInput"
        />
      </SForm>
      <SForm
        help={formik.touched.password && formik.errors.password}
        validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
        label={formik.initialValues.password}
        className="authItem"
      >
        <Input
          placeholder="Введите пароль"
          id="password"
          name="password"
          allowClear
          onChange={formik.handleChange}
          className="authInput"
        />
      </SForm>
      <SForm className="authItem">
        <Button type="primary" disabled={!formik.isValid} className="authButton" htmlType="submit">
          Войти
        </Button>
      </SForm>
      <Typography.Link className="error" onClick={navigateReg}>
        Зарегистрироватся
      </Typography.Link>
    </Form>
  );
};

export default AuthForm;
