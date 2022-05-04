import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../../lib/api/api';

enum Status {
  Pending,
  Success,
  Failure,
}

export default function CodeValidation() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>(Status.Pending);

  const { code } = router.query;

  useEffect(() => {
    fetchApi('/mail/validate', {
      method: 'POST',
      body: JSON.stringify({
        code: code as string,
      }),
    })
      .then(() => {
        setStatus(Status.Success);
      })
      .catch((e) => {
        console.log(e);
        setStatus(Status.Failure);
      });
  }, [code]);

  switch (status) {
    case Status.Pending:
      return <div>Pending</div>;
    case Status.Success:
      return <div>Success</div>;
    case Status.Failure:
      return <div>Failure</div>;
  }
}
