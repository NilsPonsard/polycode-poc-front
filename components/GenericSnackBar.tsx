import { Snackbar, Alert } from '@mui/material';

export type SnackSeverity = 'success' | 'info' | 'warning' | 'error';

export default function GenericSnackBar(props: {
  severity: SnackSeverity;
  message: string | undefined;
  setMessage: (message: string | undefined) => void;
}) {
  const handleClose = () => {
    props.setMessage(undefined);
  };

  return (
    <Snackbar
      open={props.message != undefined && props.message.length > 0}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
