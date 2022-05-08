import { Paper, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface ChallengeShort {
  _id: string;
  name: string;
  description: string;
}

export default function ChallengeCard(props: { challenge: ChallengeShort }) {
  const router = useRouter();
  const { challenge } = props;

  return (
    <div
      style={{ margin: '0.5rem', width: '30rem' }}
      onClick={() => {
        router.push(`/editor/${challenge._id}`);
      }}
    >
      <Paper sx={{ padding: '0.5rem', height: '10rem' }}>
        <Typography variant="h5" sx={{ height: '2rem' }}>
          {challenge.name}
        </Typography>
        <Typography sx={{ height: '7rem', wordWrap: 'break-word', overflowY:'scroll' }}>
          {challenge.description}
        </Typography>
      </Paper>
    </div>
  );
}
