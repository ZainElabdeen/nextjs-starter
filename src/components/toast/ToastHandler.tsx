'use client';

import React from 'react';

import Toast from './ModalDialog';
import { useMessage } from '@/providers/MessageProvider';

const ToastHandler = () => {
  const { toastMessage } = useMessage();

  return (
    <>
      {toastMessage?.text && (
        <Toast
          title={toastMessage?.title}
          text={toastMessage.text || null}
          type={toastMessage.type}
          isPermanent={toastMessage?.isPermanent || false}
          content={toastMessage.content}
          key={Math.random().toString(36).substring(7)}
        />
      )}
    </>
  );
};

export default ToastHandler;
