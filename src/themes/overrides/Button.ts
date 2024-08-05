import { WHITE } from '../colors';

export default function Button() {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
          color: { WHITE },
          borderRadius: '25px',
          minWidth: '90px',
          height: '45px',
          fontSize: '16px',
          fontWeight: 700,
          // mt: 2,
          fontFamily: 'Gotham Book',
          // fontFamily: 'Gotham Medium',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          '&:hover': {
            backgroundColor: 'red',
            border: `1px solid red`,
            color: WHITE,
            opacity: 0.8,
          },
        },
        contained: {
          backgroundColor: 'red',
          border: `1px solid red`,
          color: { WHITE },
          '&.Mui-disabled': {
            color: WHITE,
            backgroundColor: 'red',
            border: `1px solid red`,
            opacity: '30%',
            cursor: 'not-allowed',
          },
        },
        outlined: {
          border: `1px solid red`,
          backgroundColor: WHITE,
          color: 'red',
          '&.Mui-disabled': {
            color: 'red',
            backgroundColor: WHITE,
            border: `1px solid red`,
            opacity: 0.3,
            cursor: 'not-allowed',
          },
        },
        text: {
          backgroundColor: WHITE,
          color: 'red',
          '&.Mui-disabled': {
            color: 'red',
            backgroundColor: WHITE,
            opacity: 0.3,
            cursor: 'not-allowed',
          },
        },
      },
    },
  };
}
