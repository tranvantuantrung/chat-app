import React, { useContext, useState } from 'react';
import { Button, Form, Input, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { UserContext } from '../../contexts/UserContext';

import './SettingsModal.scss';

const SettingsModal = ({ isModalVisible, setIsModalVisible }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { user, editProfile } = useContext(UserContext);

  const initialValues = {
    username: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'username is too short')
      .max(16, 'username is too long')
      .matches(
        /^[a-z0-9._]+$/,
        `username is lowercase, no spaces and can only contain '. _ '`
      ),
    password: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, onSubmitProps) => {
      const data = new FormData();

      if (values.username || values.password || fileList[0]) {
        if (values.username) {
          data.append('username', values.username);
        }

        if (values.password) {
          data.append('password', values.password);
        }

        if (fileList[0]) {
          const fileUrl = fileList[0].thumbUrl;

          data.append('avatar', fileUrl);
        }

        editProfile(
          data,
          setLoading,
          setError,
          onSubmitProps.resetForm,
          setFileList,
          handleCancel
        );
      } else {
        setError('please fill in the field before submitting');
      }
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
    setFileList([]);
    setError('');
    setIsModalVisible(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    setError('');
  };

  const handleChangeCustom = (event) => {
    setError('');

    handleChange(event);
  };

  const onUpload = ({ file, onSuccess }) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onSuccess('done', file);
    };
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <Modal
      title='Edit Profile'
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
          Submit
        </Button>,
      ]}
    >
      <div className='settings-form'>
        <Form>
          <Form.Item
            validateStatus={
              errors.username && touched.username ? 'error' : null
            }
            help={errors.username && touched.username ? errors.username : null}
          >
            <label className='settings-form__label' htmlFor='username'>
              Username:
            </label>
            <Input
              id='username'
              name='username'
              placeholder={user.username}
              type='text'
              value={values.username}
              onChange={handleChangeCustom}
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
            <label className='settings-form__label' htmlFor='password'>
              Password:
            </label>
            <Input
              id='password'
              name='password'
              placeholder='password'
              type='password'
              value={values.password}
              onChange={handleChangeCustom}
              onBlur={handleBlur}
              onPressEnter={handleSubmit}
            />
          </Form.Item>

          <Form.Item>
            <label className='settings-form__label' htmlFor='avatar'>
              Avatar:
            </label>
            <ImgCrop rotate>
              <Upload
                id='avatar'
                name='avatar'
                listType='picture-card'
                fileList={fileList}
                maxCount={1}
                customRequest={onUpload}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && 'Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>

          {error && <div className='settings-form__err'>{error}</div>}
        </Form>
      </div>
    </Modal>
  );
};

export default SettingsModal;
