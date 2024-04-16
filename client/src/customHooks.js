import { useMemo } from 'react';
import { useSearchParams as useSearchParamsOriginal } from 'react-router-dom';

export function useSearchParams() {
  const params = useSearchParamsOriginal();
  
  const get = useMemo(() => params.get.bind(params), [params]);
  const set = useMemo(() => params.set.bind(params), [params]);
  
  return {
    get,
    set,
  };
}
