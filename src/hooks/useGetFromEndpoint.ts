import {useEffect, useState} from 'react';

const useGetFromEndpoint = (endpoint: string) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('pending');
  const baseUrl = 'https://recruitment-test.flip.id/';

  useEffect(() => {
    setStatus('loading');
    fetch(`${baseUrl}${endpoint}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setStatus('success');
        setData(json);
      })
      .catch(error => {
        setStatus('error');
        console.error(error);
      });
  }, [endpoint]);

  return [data, status];
};

export default useGetFromEndpoint;
