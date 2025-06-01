import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { getRecords } from '../api/api';
import { Record } from '../types/Record';

const ITEM_LIMIT = 10;

const RecordTable: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    const start = page * ITEM_LIMIT;
    const newRecords = await getRecords(start, ITEM_LIMIT);
    if (newRecords.length === 0) setHasMore(false);
    setRecords((prev) => [...prev, ...newRecords]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <InfiniteScroll
        dataLength={records.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Загрузка...</h4>}
        endMessage={<p>Больше нет данных</p>}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Возраст</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Город</TableCell>
              <TableCell>Профессия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.age}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.city}</TableCell>
                <TableCell>{record.profession}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};

export default RecordTable;