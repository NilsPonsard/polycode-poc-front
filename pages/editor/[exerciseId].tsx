import { useRouter } from 'next/router';
import styles from '../../styles/Editor.module.css';
import Editor from '@monaco-editor/react';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@mui/system';
import { RunCode } from '../../lib/api/runner';
import { LoginContext } from '../../lib/LoginContext';
import Output from '../../components/editor/Output';
import { fetchJSONApi } from '../../lib/api/api';
import Markdown from '../../components/editor/Markdown';
import CachedIcon from '@mui/icons-material/Cached';
import GenericSnackBar, {
  SnackSeverity,
} from '../../components/GenericSnackBar';

const languages = ['typescript', 'javascript', 'python', 'java', 'rust'];

export default function EditorPage() {
  const router = useRouter();

  const context = useContext(LoginContext);

  const exerciseId = router.query.exerciseId;

  const [markdown, setMarkdown] = useState(`# ${exerciseId}`);
  const [name, setName] = useState(exerciseId);
  const [stdout, setStdout] = useState('Output will be here');
  const [stderr, setStderr] = useState('Debug will be here');
  const [waitingForResult, setWaitingForResult] = useState(false);
  const containerDivRef = useRef(null);
  const toolbarDivRef = useRef(null);
  const outputDivRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [sampleCode, setSampleCode] = useState('');
  const [sampleLanguage, setSampleLanguage] = useState('typescript');

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );
  const [snackSeverity, setSnackSeverity] = useState<SnackSeverity>('info');

  useEffect(() => {
    if (exerciseId) {
      fetchJSONApi<{
        name: string;
        description?: string;
        content: string;
        sampleCode?: string;
        defaultLanguage?: string;
      }>(`/exercise/${exerciseId}`, 'GET').then((data) => {
        if (data.json.content) setMarkdown(data.json.content);
        if (data.json.sampleCode) setSampleCode(data.json.sampleCode);
        if (data.json.name) setName(data.json.name);
        if (data.json.defaultLanguage)
          setSampleLanguage(data.json.defaultLanguage);
      });
    }
  }, [exerciseId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const localLang = localStorage.getItem(`${exerciseId}-language`);
    const localCode = localStorage.getItem(`${exerciseId}-code`);

    if (localLang) setLanguage(localLang);
    else setLanguage(sampleLanguage);

    if (localCode) setCode(localCode);
    else setCode(sampleCode);
  }, [exerciseId, sampleCode, sampleLanguage]);

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

  async function runCode(code: string, language: string) {
    if (context.credentials && !waitingForResult) {
      setWaitingForResult(true);
      const { json, status } = await RunCode(
        code,
        language,
        context.credentials,
        context.setTokens,
      );
      setWaitingForResult(false);
      setStdout(json.stdout);
      setStderr(json.stderr);
    }else{
      setSnackMessage('You must be logged in to run code');
      setSnackSeverity('error');
    }
  }

  async function handleRunEditorCode() {
    runCode(code, language);
  }

  function handleLanguageSelect(event: SelectChangeEvent<string>) {
    handleLanguageChange(event.target.value);
  }

  function handleLanguageChange(language: string) {
    localStorage.setItem(`${exerciseId}-language`, language);
    setLanguage(language);
  }

  function handleCodeChange(newCode: string | undefined) {
    if (!newCode || (newCode && newCode.length == 0))
      localStorage.removeItem(`${exerciseId}-code`);
    else localStorage.setItem(`${exerciseId}-code`, newCode);
    setCode(newCode ?? '');
  }

  function handleLoadSampleCode() {
    setCode(sampleCode);
    setLanguage(sampleLanguage);
  }

  return (
    <>
      <div className={styles.container} ref={containerDivRef}>
        <div className={styles.toolbar} ref={toolbarDivRef}>
          <Typography variant="h4">{name}</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>

          <Button
            variant="contained"
            color="info"
            startIcon={<CachedIcon />}
            className={styles.toolbarTool}
            onClick={handleLoadSampleCode}
            disabled={waitingForResult}
          >
            Sample code
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={
              waitingForResult ? (
                <CircularProgress size={20} color="info" />
              ) : (
                <PlayArrowIcon />
              )
            }
            className={styles.toolbarTool}
            onClick={handleRunEditorCode}
            disabled={waitingForResult}
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
              onChange={handleLanguageSelect}
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
          <Markdown
            markdown={markdown}
            setCode={(c, l) => {
              setSnackMessage('Code loaded from exercise');
              setSnackSeverity('info');
              handleCodeChange(c);
              handleLanguageChange(l);
            }}
            runCode={runCode}
          />
        </div>

        <div className={styles.editor}>
          <Editor
            language={language}
            value={code}
            height={`${height}px`}
            width={`${width}px`}
            theme="vs-dark"
            onChange={handleCodeChange}
            onValidate={(markers) => {
              console.log(markers);
            }}
          />
        </div>

        <div className={styles.result} ref={outputDivRef}>
          <Output output={stdout} name="Output" />
          <Output output={stderr} name="Debug" />
        </div>
      </div>
      <GenericSnackBar
        severity={snackSeverity}
        message={snackMessage}
        setMessage={setSnackMessage}
      />
    </>
  );
}
