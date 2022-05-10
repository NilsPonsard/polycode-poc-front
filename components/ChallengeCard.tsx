import { Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GetCompletion } from '../lib/api/collection';
import { GetExerciseCompletion } from '../lib/api/exercise';
import { LoginContext } from '../lib/LoginContext';

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
        <Typography variant="h5" sx={{ height: '2rem' }}>
          {challenge.name}{' '}
          {completed > 0 &&
            `completed ${completed} time${completed > 1 ? 's' : ''}`}
        </Typography>
        <Typography
          sx={{ height: '7rem', wordWrap: 'break-word', overflowY: 'scroll' }}
        >
          {challenge.description}
        </Typography>
      </Paper>
    </div>
  );
}
