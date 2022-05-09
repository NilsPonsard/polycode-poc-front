import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { PaginationManager } from '../components/PaginationManager';
import { Collection, GetCollections } from '../lib/api/collection';
import styles from '../styles/Collections.module.css';

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  const collectionPerPage = 10;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    GetCollections(collectionPerPage * page, collectionPerPage).then((res) => {
      setCollections(res.json.result);
      setTotal(res.json.total);
    });
  }, [page]);

  return (
    <div className={styles.root}>
      <Typography variant="h2">Collections</Typography>
      <p>This is a list of collections that you can try out.</p>
      <div className={styles.list}>
        {collections.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
      </div>
      <PaginationManager
        currentPage={page}
        pagination={collectionPerPage}
        setCurrentPage={setPage}
        total={total}
      />
    </div>
  );
}
