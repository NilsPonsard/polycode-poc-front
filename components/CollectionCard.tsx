import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CollectionShort, GetCompletion } from '../lib/api/collection';
import { LoginContext } from '../lib/LoginContext';

export default function CollectionCard(props: { collection: CollectionShort }) {
  const router = useRouter();
  const { collection } = props;

  const [completed, setCompleted] = useState(0);
  const total = collection.content.length;

  const context = useContext(LoginContext);

  useEffect(() => {
    if (context.credentials) {
      GetCompletion(
        collection._id,
        context.credentials,
        context.setTokens,
      ).then((res) => {
        if (res.json.completed) setCompleted(res.json.completed);
      });
    }
  }, [collection._id, context.credentials, context.setTokens]);

  return (
    <div
      style={{ margin: '0.5rem', width: '30rem' }}
      onClick={() => {
        router.push(`/collections/${collection._id}`);
      }}
    >
      <Paper sx={{ padding: '0.5rem', height: '12rem' }}>
        <Typography variant="h5" sx={{ height: '2rem' }}>
          {collection.name}
        </Typography>
        <Typography
          sx={{ height: '7rem', wordWrap: 'break-word', overflowY: 'scroll' }}
        >
          {collection.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(completed / total) * 100}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {completed} / {total}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
