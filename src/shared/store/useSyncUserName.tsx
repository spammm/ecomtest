'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from './useUserStore';

const useSyncUserName = (): [string, (status: 'success' | 'error') => void] => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const userName = useUserStore((state) => state.userName);
  const setUserName = useUserStore((state) => state.setUserName);

  useEffect(() => {
    try {
      if (!userName) {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
          setStatus('success');
        } else {
          setStatus('error');
        }
      }
    } catch {
      setStatus('error');
    }
  }, [userName, setUserName]);

  const updateStatus = (newStatus: 'success' | 'error') => {
    setStatus(newStatus);
  };

  return [status, updateStatus];
};

export default useSyncUserName;
