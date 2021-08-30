import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { authApi } from '../../apis';

import { InputField } from '../../components';

import './Register.scss';

const Register = () => {
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const storageKey = 'jwtToken';

  useEffect(() => {
    document.title = 'Chat App';
  }, []);

  const initialValues = {
    username: '',
    password: '',
    rePassword: '',
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
    password: Yup.string().required('password is required'),
    rePassword: Yup.string().required('re-enter Password is required'),
  });

  if (registerSuccess) {
    return <Redirect to='/' />;
  }

  if (localStorage.getItem(storageKey)) {
    return <Redirect to='/' />;
  }

  return (
    <div className='register'>
      <div className='container'>
        <div className='register__wrapper'>
          <div className='register__form'>
            <div className='register__logo'>Chat App</div>
            <div className='register__desc'>
              Sign up to chat with your friends.
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, onSubmitProps) => {
                const registerApi = async () => {
                  setLoading(true);

                  try {
                    const { token } = await authApi.register(values);
                    const jwtToken = `Bearer ${token}`;

                    localStorage.setItem(storageKey, jwtToken);
                    setLoading(false);
                    setRegisterSuccess(true);
                    onSubmitProps.resetForm();
                  } catch (error) {
                    setError(error);
                    setLoading(false);
                  }
                };

                registerApi();
              }}
            >
              {(formikProps) => {
                const { handleSubmit } = formikProps;

                return (
                  <Form>
                    <FastField
                      name='username'
                      component={InputField}
                      placeholder='Username'
                      type='text'
                      onPressEnter={handleSubmit}
                    />
                    <FastField
                      name='password'
                      component={InputField}
                      placeholder='Password'
                      type='password'
                      onPressEnter={handleSubmit}
                    />
                    <FastField
                      name='rePassword'
                      component={InputField}
                      placeholder='Re-enter Password'
                      type='password'
                      onPressEnter={handleSubmit}
                    />
                    {error && <div className='register__err'>{error}</div>}

                    <Button
                      type='primary'
                      onClick={handleSubmit}
                      loading={loading}
                    >
                      Sign up
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className='register__nav'>
            <span>Have an account?</span>
            <Link to='/login'>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
