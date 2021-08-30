import React from 'react';
import { Form, Input } from 'antd';

const InputField = (props) => {
  const { field, form, placeholder, type, onPressEnter } = props;

  const { errors, touched } = form;
  const { name } = field;

  const showError = errors[name] && touched[name];

  return (
    <Form.Item
      validateStatus={showError ? 'error' : null}
      help={showError ? errors[name] : null}
    >
      <Input
        {...field}
        placeholder={placeholder}
        type={type}
        id='error'
        onPressEnter={onPressEnter}
      />
    </Form.Item>
  );
};

export default InputField;
