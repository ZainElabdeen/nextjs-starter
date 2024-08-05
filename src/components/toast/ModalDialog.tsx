import {
  Fragment,
  ReactElement,
  Ref,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorIcon from '@mui/icons-material/Error';

import {
  ToastCloseTime,
  ToastMessageType,
  useMessage,
} from '@/providers/MessageProvider';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ModalDialog: React.FC<ToastMessageType> = ({
  text,
  type,
  content,
  isPermanent = false,
  title = '',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toastMessage, setToastMessage } = useMessage();
  const { t } = useTranslation();

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
    <Fragment>
      {text ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={(event, reason) => {
            if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
              return;
            }
            handleClose();
          }}
          maxWidth='sm'
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
          disableEscapeKeyDown
          fullWidth
        >
          <DialogContent>
            <Grid
              xs={12}
              container
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexGrow={1}
              spacing={2}
            >
              <Grid
                xs={12}
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                {type === 'error' ? (
                  <ErrorIcon sx={{ width: '42px', height: '42px' }} />
                ) : (
                  <CheckCircleOutlineOutlinedIcon
                    color='success'
                    sx={{ width: '42px', height: '42px' }}
                  />
                )}
                <Typography
                  fontSize='20px'
                  fontWeight={700}
                  fontFamily='Gotham Book'
                >
                  {title}
                </Typography>
              </Grid>

              <Grid
                xs={12}
                display='flex'
                width='100%'
                flexGrow={1}
                justifyContent='center'
                alignItems='center'
              >
                <Box
                  width='100%'
                  display='flex'
                  flexGrow={1}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Typography
                    fontSize='16px'
                    fontWeight={500}
                    fontFamily='Gotham Book'
                    sx={{
                      whiteSpace: 'pre-line',
                      textAlign: 'left',
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              </Grid>
              {content}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant='contained' onClick={handleClose}>
              {t(`common.close`)}
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Fragment>
  );
};

export default ModalDialog;
