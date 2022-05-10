import useSWR from 'swr';
import ChallengeCard, { ChallengeShort } from '../components/ChallengeCard';
import { fetchJSONApi } from '../lib/api/api';
import styles from '../styles/Challenges.module.css';

export default function Challenges() {
  const { data } = useSWR('/exercise', fetchJSONApi);

  return (
    <div className={styles.root}>
      <h1>Challenges</h1>
      <p>This is a list of challenges that you can try out.</p>

      <div className={styles.list}>
        {data &&
          (data.json as { result :   ChallengeShort[], total: number}).result.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
      </div>
    </div>
  );
}
