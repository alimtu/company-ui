import React from "react";
import { Form, Input } from "antd";
import { handleTextChange } from "../../tools/form-manager";

const { TextArea, Password } = Input;

const InputItem = ({
  title,
  fieldName,
  required,
  password,
  multiline,
  noLabel,
  horizontal,
  labelCol,
  formConfig,
  ...rest
}) => {
  const { errors, schema, record, setRecord, setErrors } = formConfig;

  const handleChange = (data) =>
    handleTextChange(errors, data, schema, record, setRecord, setErrors);

  let control = null;
  if (!password && multiline) {
    control = <TextArea {...rest} onChange={handleChange} />;
  } else if (!multiline && password) {
    control = <Password {...rest} onChange={handleChange} />;
  } else {
    control = <Input {...rest} onChange={handleChange} />;
  }

  return (
    <Form.Item
      label={noLabel ? "" : title}
      name={fieldName}
      required={required || false}
      hasFeedback
      help={errors[fieldName]}
      validateStatus={
        errors[fieldName] === undefined
          ? ""
          : errors[fieldName] != null
          ? "error"
          : "success"
      }
    >
      {control}
    </Form.Item>
  );
};

export default InputItem;
