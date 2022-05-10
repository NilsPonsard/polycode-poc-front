import { SetTokens } from '../LoginContext';
import { fetchJSONApi, Credentials, fetchApiWithAuth } from './api';
import { Exercise } from './exercise';

export interface CollectionShort {
  _id: string;
  name: string;
  description: string;
  content: string[];
}

export interface CollectionPopulated {
  _id: string;
  name: string;
  description: string;
  content: Exercise[];
}

export function GetCollections(offset: number, limit: number) {
  return fetchJSONApi<{ result: CollectionShort[]; total: number }>(
    `/collection?offset=${offset}&limit=${limit}`,
    'GET',
  );
}
export function GetCollection(id: string) {
  return fetchJSONApi<CollectionPopulated>(`/collection/${id}`, 'GET');
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
