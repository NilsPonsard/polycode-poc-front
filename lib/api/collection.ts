import { SetTokens } from '../LoginContext';
import { fetchJSONApi, Credentials, fetchApiWithAuth } from './api';

export interface Collection {
  _id: string;
  name: string;
  description: string;
  content: string[];
}

export function GetCollections(offset: number, limit: number) {
  return fetchJSONApi<{ result: Collection[]; total: number }>(
    `/collection?offset=${offset}&limit=${limit}`,
    'GET',
  );
}
export function GetCollection(
  id: string,
): Promise<{ json: Collection; status: number }> {
  return fetchJSONApi<Collection>(`/collection${id}`, 'GET');
}

export function GetCompletion(
  collectionId: string,
  credentials: Credentials,
  setTokens: SetTokens,
) {
  return fetchApiWithAuth<{ completed: number; total: number }>(
    '/completion/' + collectionId,
    credentials,
    setTokens,
    'GET',
  );
}
