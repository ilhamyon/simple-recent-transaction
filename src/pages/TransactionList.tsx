import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import useGetFromEndpoint from '../hooks/useGetFromEndpoint';
import TransactionCard from '../components/TransactionCard';
import SearchSortBar from '../components/SearchSortBar';
import useFilteredList, {Filter} from '../hooks/useFilteredList';

export type Transaction = {
  id: string;
  amount: number;
  status: string;
  sender_bank: string;
  beneficiary_bank: string;
  beneficiary_name: string;
  created_at: string;
  account_number: string;
  remark: string;
  unique_code: number;
};

const TransactionList = () => {
  const [data, status] = useGetFromEndpoint('frontend-test');
  const [trList, setTrList] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filter>({search: '', sort: 'URUTKAN'});
  const filteredTrList = useFilteredList(trList, filter);

  useEffect(() => {
    if (status === 'success') {
      setTrList(convertDataToList(data));
    }
  }, [data, status]);

  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({item}) => <TransactionCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  // we minim
  const handleOnSearch = useCallback(
    (result: string) => setFilter({...filter, search: result}),
    [filter],
  );
  const handleOnSort = useCallback(
    (result: string) => setFilter({...filter, sort: result}),
    [filter],
  );

  return (
    <FlatList
      ListHeaderComponent={
        <SearchSortBar onSearch={handleOnSearch} onSort={handleOnSort} />
      }
      data={filteredTrList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

function convertDataToList(input: any) {
  return Object.keys(input).map(key => {
    return input[key];
  });
}

export default TransactionList;
