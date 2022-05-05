import { useRouter } from 'next/router';
import styles from '../../styles/Editor.module.css';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useContext, useEffect, useRef, useState } from 'react';
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
import { RunCode } from '../../lib/api/runner';
import { LoginContext } from '../../lib/LoginContext';

const languages = ['typescript', 'javascript', 'python', 'java', 'rust'];

export default function EditorPage() {
  const router = useRouter();

  const context = useContext(LoginContext);

  const exerciseId = router.query.exerciseId;
  const [markdown, setMarkdown] = useState(`# ${exerciseId}`);
  const containerDivRef = useRef(null);
  const toolbarDivRef = useRef(null);
  const outputDivRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [code, setCode] = useState(`console.log('Exercise ${exerciseId}');`);
  const [language, setLanguage] = useState('typescript');

  const heightChangeHandler = () => {
    setHeight(
      // @ts-ignore
      containerDivRef?.current?.clientHeight -
        // @ts-ignore
        toolbarDivRef.current.clientHeight -
        // @ts-ignore
        outputDivRef.current.clientHeight,
    );

    // @ts-ignore
    setWidth(containerDivRef.current.clientWidth / 2);
  };
  useEffect(() => {
    window.addEventListener('resize', heightChangeHandler);
    heightChangeHandler();
    return () => {
      window.removeEventListener('resize', heightChangeHandler);
    };
  }, []);

  function handleRunCode() {
    if (context.credentials)
      RunCode(code, language, context.credentials, context.setTokens);
  }

  function handleLanguageChange(event: SelectChangeEvent<string>) {
    setLanguage(event.target.value);
  }

  return (
    <div className={styles.container} ref={containerDivRef}>
      <div className={styles.toolbar} ref={toolbarDivRef}>
        <Box sx={{ flexGrow: 1 }}></Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PlayArrowIcon />}
          className={styles.toolbarTool}
          onClick={handleRunCode}
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
          value={code}
          height={`${height}px`}
          width={`${width}px`}
          theme="vs-dark"
          onChange={(newValue) => setCode(newValue ?? '')}
          onValidate={(markers) => {
            console.log(markers);
          }}
        />
      </div>

      <div className={styles.result} ref={outputDivRef}>
        Test
      </div>
    </div>
  );
}
