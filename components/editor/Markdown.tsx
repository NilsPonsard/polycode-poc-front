import { Box, IconButton } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const languagesMap: {
  [key: string]: string;
} = {
  ts: 'typescript',
  js: 'javascript',
  py: 'python',
  java: 'java',
  rs: 'rust',
  rust: 'rust',
};

export default function Markdown(props: {
  markdown: string;
  setCode: (code: string, language: string) => void;
  runCode: (code: string, language: string) => void;
}) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...codeProps }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <Box sx={{ display: 'flex' }}>
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                customStyle={{ flexGrow: 1 }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton
                  onClick={() => {
                    props.setCode(
                      String(children),
                      languagesMap[match[1]] ?? 'javascript',
                    );
                  }}
                >
                  <ReadMoreIcon />
                </IconButton>

                <IconButton
                  sx={{ float: 'right' }}
                  onClick={() => {
                    props.runCode(
                      String(children),
                      languagesMap[match[1]] ?? 'javascript',
                    );
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <code className={className} {...codeProps}>
              {children}
            </code>
          );
        },
      }}
    >
      {props.markdown}
    </ReactMarkdown>
  );
}
