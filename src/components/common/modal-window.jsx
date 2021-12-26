import React from "react";
import { Modal, Space, Button } from "antd";
import {
  PlusSquareOutlined as PlusBoxIcon,
  EditOutlined as EditIcon,
} from "@ant-design/icons";
import Words from "./../../resources/words";
import Colors from "./../../resources/colors";

const ModalWindow = (props) => {
  const {
    isOpen,
    isEdit,
    inProgress,
    disabled,
    onClear,
    onSubmit,
    onCancel,
    ...rest
  } = props;

  return (
    <Modal
      // style={{ maxWidth: "100vw", margin: 0 }}
      visible={isOpen}
      maskClosable={true}
      centered={true}
      title={
        isEdit ? (
          <Space>
            <EditIcon style={{ color: Colors.magenta[6] }} />
            {Words.editInfo}
          </Space>
        ) : (
          <Space>
            <PlusBoxIcon style={{ color: Colors.green[6] }} />
            {Words.newInfo}
          </Space>
        )
      }
      footer={[
        <Button key="clear-button" onClick={onClear}>
          {Words.clear}
        </Button>,
        <Button
          key="submit-button"
          type="primary"
          onClick={onSubmit}
          loading={inProgress}
          disabled={disabled}
        >
          {Words.submit}
        </Button>,
      ]}
      onCancel={onCancel}
      {...rest}
    >
      <section>
        <article
          id="lesson-info-content"
          className="scrollbar-normal"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          {props.children}
        </article>
      </section>
    </Modal>
  );
};

export default ModalWindow;
