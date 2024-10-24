'use client';
import { useUserStore } from '@/shared/store/useUserStore';
import styles from './ProfileButton.module.scss';

const ProfileButton = () => {
  const userName = useUserStore((state) => state.userName);

  return (
    <div className={styles.profile}>
      <span className={styles.userName}>{userName || 'Ваше имя'}</span>
      <div className={styles.avatar}>B</div>
    </div>
  );
};

export { ProfileButton };
