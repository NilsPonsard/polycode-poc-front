import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ChallengeCard from '../../components/ChallengeCard';
import { CollectionPopulated, GetCollection } from '../../lib/api/collection';
import { LoginContext } from '../../lib/LoginContext';

export default function EditorPage() {
  const router = useRouter();

  const context = useContext(LoginContext);

  const collectionId = router.query.collectionId;

  const [collectionData, setCollectionData] = useState<
    CollectionPopulated | undefined
  >(undefined);

  useEffect(() => {
    if (collectionId) {
      GetCollection(`${collectionId}`).then((res) => {
        setCollectionData(res.json);
      });
    }
  }, [collectionId]);

  return (
    <div className="centered">
      {collectionData ? (
        <div>
          <h1>{collectionData.name}</h1>
          <p>{collectionData.description}</p>
          {collectionData.content.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
