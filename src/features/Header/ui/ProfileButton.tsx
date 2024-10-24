'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/shared/store/useUserStore';
import useSyncUserName from '@/shared/store/useSyncUserName';
import styles from './ProfileButton.module.scss';

const ProfileButton = () => {
  const [syncStatus] = useSyncUserName();
  const userName = useUserStore((state) => state.userName);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!userName && syncStatus === 'error' && pathname !== '/') {
      router.push('/');
    }
  }, [syncStatus, pathname, router, userName]);

  return (
    <div className={styles.profile}>
      <span className={styles.userName}>{userName || 'Ваше имя'}</span>
      <div className={styles.avatar}>B</div>
    </div>
  );
};

export { ProfileButton };
