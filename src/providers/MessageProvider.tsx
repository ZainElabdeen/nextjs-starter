'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

export type MessageType = 'success' | 'error';

export const ToastCloseTime = 9000;

export type ToastMessageType = {
  text: string | null;
  type: MessageType;
  content?: ReactNode;
  isPermanent?: boolean;
  title?: string | null;
};

export type MessageContextType = {
  toastMessage: ToastMessageType;
  setToastMessage: React.Dispatch<React.SetStateAction<ToastMessageType>>;
};

export const MessageContext = createContext<MessageContextType>({
  toastMessage: {
    text: null,
    type: 'success',
    isPermanent: true,
    content: null,
    title: null,
  },
  setToastMessage: () => {},
});

export const useMessage = () => {
  return useContext(MessageContext);
};

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<ToastMessageType>({
    text: null,
    type: 'success',
    isPermanent: true,
    content: null,
  });

  return (
    <MessageContext.Provider
      value={{
        toastMessage: message,
        setToastMessage: setMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
