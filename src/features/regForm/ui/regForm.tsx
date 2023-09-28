import { useState } from 'react';
import { SForm } from './s-regForm';
import { useFormik } from 'formik';
import { Button, Form, Input, Typography } from 'antd';
import { IUser, addUser } from '@/entities/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/main';
import { validationSchema } from '../model/IRegForm';
import { regTry, useAppDispatch } from '@shared';

const RegForm = () => {
  const navigate = useNavigate();

  function navigateAuth() {
    navigate('/');
  }

  const dispatch = useAppDispatch();

  const [req, setReq] = useState('');
  const [err, setErr] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      regTry(values.email, values.password)
        .then(async (userCredential) => {
          const { user } = userCredential;
          let userAdd: IUser = {
            uid: user.uid,
            name: values.name,
            mail: values.email,
            password: values.password,
            creationTime: user.metadata.creationTime,
          };
          await setDoc(doc(db, 'users', user.uid), userAdd).then(() => {
            dispatch(addUser(userAdd));
            setErr('');
            setReq('Создание пользователя успешно!');
            formik.resetForm();
          });
        })
        .catch((error) => {
          setReq('');
          setErr('Произошла ошибка');
        });
    },
  });

  const handlerKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  return (
    <SForm onSubmitCapture={formik.handleSubmit} onKeyDown={handlerKeyDown}>
      {err && (
        <Typography.Title level={5} type="danger" className="error">
          {err}
        </Typography.Title>
      )}
      {req && (
        <Typography.Title level={5} type="success" className="error">
          {req}
        </Typography.Title>
      )}
      <Form.Item
        help={formik.touched.email && formik.errors.email}
        validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
        label={formik.initialValues.email}
        className="authItem"
      >
        <Input
          placeholder="Введите фио"
          id="name"
          name="name"
          allowClear
          width={'300px'}
          onChange={formik.handleChange}
          className="authInput"
          value={formik.values.name}
        />
      </Form.Item>
      <Form.Item
        help={formik.touched.name && formik.errors.name}
        validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
        label={formik.initialValues.name}
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
          value={formik.values.email}
        />
      </Form.Item>
      <Form.Item
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
          value={formik.values.password}
        />
      </Form.Item>
      <Form.Item className="authItem">
        <Button type="primary" disabled={!formik.isValid} className="authButton" htmlType="submit">
          Зарегистрироватся
        </Button>
      </Form.Item>
      <Typography.Link className="error" onClick={navigateAuth}>
        Авторизироватся
      </Typography.Link>
    </SForm>
  );
};

export default RegForm;
