import { useRouter } from 'next/router';
import styles from '../../styles/Editor.module.css';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/system';

const languages = ['typescript', 'javascript', 'python', 'java', 'rust'];

export default function EditorPage() {
  const router = useRouter();

  const exerciseId = router.query.exerciseId;
  const [markdown, setMarkdown] = useState(`# ${exerciseId}`);
  const [code, setCode] = useState(`console.log('Exercise ${exerciseId}');`);
  const [language, setLanguage] = useState('typescript');

  function handleLanguageChange(event: SelectChangeEvent<string>) {
    setLanguage(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Box sx={{ flexGrow: 1 }}></Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PlayArrowIcon />}
          className={styles.toolbarTool}
        >
          Run
        </Button>

        <FormControl
          size="small"
          variant="standard"
          sx={{ width: '10em' }}
          className={styles.toolbarTool}
        >
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            label="Age"
            onChange={handleLanguageChange}
          >
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.markdown}>
        <ReactMarkdown>{code}</ReactMarkdown>
      </div>

      <div className={styles.editor}>
        <Editor
          language={language}
          defaultValue="console.log('hello world !');"
          value={code}
          height="100%"
          width="100%"
          theme="vs-dark"
          onChange={(newValue) => setCode(newValue ?? '')}
          onValidate={(markers) => {
            console.log(markers);
          }}
        />
      </div>
    </div>
  );
}
