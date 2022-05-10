import { SetTokens } from '../LoginContext';
import { Credentials, fetchApiWithAuth } from './api';

export interface Exercise {
  _id: string;
  name: string;
  description: string;
  content: string;
  sampleCode?: string;
  defaultLanguage?: string;
}

export function GetExerciseCompletion(
  collectionId: string,
  exerciseId: string,
  credentials: Credentials,
  setTokens: SetTokens,
) {
  return fetchApiWithAuth<{ completed: boolean; at: string[] }>(
    '/completion/' + collectionId + '/' + exerciseId,
    credentials,
    setTokens,
    'GET',
  );
}
