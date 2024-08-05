import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

import {
  ToastCloseTime,
  ToastMessageType,
  useMessage,
} from '@/providers/MessageProvider';

const SnackbarModal: React.FC<ToastMessageType> = ({
  text,
  type,
  isPermanent = true,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toastMessage, setToastMessage } = useMessage();

  useEffect(() => {
    if (text) {
      setOpen(true);
    }
    if (!isPermanent) {
      setTimeout(() => {
        setOpen(false);
        setToastMessage({ ...toastMessage, text: null });
      }, ToastCloseTime); // Adjust the time as needed
    }

    return () => {};
  }, [isPermanent, setToastMessage, text, toastMessage]);

  const handleClose = () => {
    setOpen(false);
    setToastMessage({ ...toastMessage, text: null });
  };

  return (
    <>
      {text ? (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={ToastCloseTime}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={(type as AlertColor) ?? 'success'}
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default SnackbarModal;
