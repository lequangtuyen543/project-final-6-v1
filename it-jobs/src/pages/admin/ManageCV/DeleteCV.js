import React from 'react';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteCV } from '../../../services/cvService';

export const DeleteCV = (props) => {
  const { record, onReload } = props;

  const confirm = async e => {
    console.log(e);
    message.success('Click on Yes');
    const res = await deleteCV(record.id);
    if (res) {
      onReload();
    }
  };
  const cancel = e => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <Tooltip title="Delete">
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this job?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </Tooltip>

  )
}