import { Box, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GetExerciseCompletion } from '../lib/api/exercise';
import { LoginContext } from '../lib/LoginContext';
import DoneIcon from '@mui/icons-material/Done';
export interface ChallengeShort {
  _id: string;
  name: string;
  description: string;
}

export default function ChallengeCard(props: {
  challenge: ChallengeShort;
  collectionId?: string;
}) {
  const context = useContext(LoginContext);

  const router = useRouter();
  const { challenge } = props;

  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (context.credentials && props.collectionId) {
      GetExerciseCompletion(
        props.collectionId,
        props.challenge._id,
        context.credentials,
        context.setTokens,
      ).then((res) => {
        if (res.json.completed) setCompleted(res.json.at.length);
      });
    }
  }, [
    context.credentials,
    context.setTokens,
    props.challenge._id,
    props.collectionId,
  ]);

  return (
    <div
      style={{ margin: '0.5rem', width: '30rem' }}
      onClick={() => {
        router.push(`/editor/${challenge._id}`);
      }}
    >
      <Paper sx={{ padding: '0.5rem', height: '10rem' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" sx={{ height: '2rem' }}>
            {challenge.name}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {completed > 0 && <DoneIcon color="success" />}
        </Box>
        <Typography
          sx={{ height: '7rem', wordWrap: 'break-word', overflowY: 'scroll' }}
        >
          {challenge.description}
        </Typography>
      </Paper>
    </div>
  );
}
