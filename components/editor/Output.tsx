import { Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import styles from '../../styles/editor/Output.module.css';

export default function Output(props: { output: string; name: string }) {
  return (
    <div className={styles.output}>
      <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
        {props.name}
      </Typography>
      <Divider variant="middle" />
      <pre className={styles.outputContent}>{props.output}</pre>
    </div>
  );
}
