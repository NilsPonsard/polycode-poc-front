import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApi, fetchJSONApi } from '../../../lib/api/api';

enum Status {
  Pending,
  Success,
  Failure,
}

const messages = {
  [Status.Pending]: 'Validating your email ...',
  [Status.Success]: 'Email validated!',
  [Status.Failure]: 'Failed to validate email',
};

export default function CodeValidation() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>(Status.Pending);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const { code } = router.query;

  useEffect(() => {
    if (code && typeof code === 'string' && code.length > 1) {
      fetchJSONApi<{ message: string }>('/mail/validate', 'POST', {
        code,
      })
        .then((res) => {
          if (res.status === 200) setStatus(Status.Success);
          else {
            setStatus(Status.Failure);
            setMessage(res.json.message);
          }
        })
        .catch((e) => {
          console.log(e);
          setStatus(Status.Failure);
        });
    }
  }, [code]);

  return (
    <div className="centered">
      {(!code || code.length <= 1) && (
        <Typography variant="h6"> invalid code </Typography>
      )}
      <h1>{messages[status]}</h1>
      {message && <p>{message}</p>}

      {status === Status.Success && (
        <Button onClick={() => router.push('/login')}>Go to login page</Button>
      )}
    </div>
  );
}
