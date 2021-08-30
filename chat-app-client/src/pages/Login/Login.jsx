import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { authApi } from '../../apis';

import { InputField } from '../../components';

import './Login.scss';

const Login = () => {
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const storageKey = 'jwtToken';

  useEffect(() => {
    document.title = 'Chat App';
  }, []);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'username is too short')
      .max(16, 'username is too long')
      .matches(
        /^[a-z0-9._]+$/,
        `username is lowercase, no spaces and can only contain '. _ '`
      )
      .required('username is required'),
    password: Yup.string().required('Password is required!'),
  });

  if (loginSuccess) {
    return <Redirect to='/' />;
  }

  if (localStorage.getItem(storageKey)) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='login__wrapper'>
          <div className='login__form'>
            <div className='login__logo'>Chat App</div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, onSubmitProps) => {
                const loginApi = async () => {
                  setLoading(true);

                  try {
                    const { token } = await authApi.login(values);
                    const jwtToken = `Bearer ${token}`;

                    localStorage.setItem(storageKey, jwtToken);
                    setLoading(false);
                    setLoginSuccess(true);
                    onSubmitProps.resetForm();
                  } catch (error) {
                    setError(error);
                    setLoading(false);
                  }
                };

                loginApi();
              }}
            >
              {(formikProps) => {
                const { handleSubmit } = formikProps;

                return (
                  <Form>
                    <FastField
                      name='username'
                      component={InputField}
                      placeholder='username'
                      type='text'
                      onPressEnter={handleSubmit}
                    />
                    <FastField
                      name='password'
                      component={InputField}
                      placeholder='password'
                      type='password'
                      onPressEnter={handleSubmit}
                    />

                    {error && <div className='register__err'>{error}</div>}

                    <Button
                      type='primary'
                      onClick={handleSubmit}
                      loading={loading}
                    >
                      Log In
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className='login__nav'>
            <span>Don't have account?</span>
            <Link to='/register'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
