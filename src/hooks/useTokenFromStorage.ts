import { Util } from '@/utils';
import { useEffect, useMemo, useState } from 'react';

export function useTokenFromStorage() {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const storedToken = localStorage?.getItem('token');
    if (Util.evaluateExistValue(storedToken)) {
      setToken(storedToken);
    } else {
      console.log('Token not found');
      // Handle the case when the token is not found in localStorage
    }
  }, []);

  return useMemo(() => token, [token]);
}
