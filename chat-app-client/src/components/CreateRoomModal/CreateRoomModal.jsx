import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RoomContext } from '../../contexts/RoomContext';

import './CreateRoomModal.scss';

const CreateRoomModal = ({ isModalVisible, setIsModalVisible }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { createRoom } = useContext(RoomContext);

  const initialValues = {
    name: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(24, 'room name is too long')
      .required('room name is required'),
    password: Yup.string().required('password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, onSubmitProps) => {
      createRoom(
        values,
        setLoading,
        setError,
        onSubmitProps.resetForm,
        handleCancel
      );
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    values,
    touched,
    resetForm,
  } = formik;

  const handleCancel = () => {
    resetForm();
    setIsModalVisible(false);
  };

  return (
    <Modal
      title='Create Room'
      centered
      width={320}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={loading}
          onClick={handleSubmit}
        >
          Create
        </Button>,
      ]}
    >
      <div className='create-room-form'>
        <Form>
          <Form.Item
            validateStatus={errors.name && touched.name ? 'error' : null}
            help={errors.name && touched.name ? errors.name : null}
          >
            <Input
              name='name'
              placeholder='room name'
              type='text'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              onPressEnter={handleSubmit}
            />
          </Form.Item>
          <Form.Item
            validateStatus={
              errors.password && touched.password ? 'error' : null
            }
            help={errors.password && touched.password ? errors.password : null}
          >
            <Input
              name='password'
              placeholder='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onPressEnter={handleSubmit}
            />
          </Form.Item>

          {error && <div className='create-room-form__err'>{error}</div>}
        </Form>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
