import { useRouter } from 'next/router';
import styles from '../../styles/Editor.module.css';
import Editor from '@monaco-editor/react';

export default function EditorPage() {
  const router = useRouter();

  const exerciseId = router.query.exerciseId;

  return (
    <div className={styles.container}>
      <div className={styles.module}>
        <h2>Markdown</h2>
      </div>

      <div className={styles.module}>
        <Editor
          defaultLanguage="javascript"
          defaultValue="console.log('hello world !');"
          height="100%"
          width="100%"
          theme="vs-dark"
          onValidate={(markers) => {
            console.log(markers);
          }}
        />
      </div>
    </div>
  );
}
