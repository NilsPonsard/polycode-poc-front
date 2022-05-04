import { useRouter } from 'next/router';
import styles from '../../styles/Editor.module.css';

export default function Editor() {
  const router = useRouter();

  const exerciseId = router.query.exerciseId;

  return (
    <div className={styles.container}>
      <div>
        <h2>Markdown</h2>
      </div>

      <div>
        <h2>Code editor</h2>
      </div>
    </div>
  );
}
