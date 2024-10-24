'use client';
import { useState } from 'react';
import { AuthModal } from '@/features/AuthModal';
import { Button } from '@/shared/ui';
import styles from './page.module.scss';

const Home: React.FC = () => {
  const [modalKey, setModalKey] = useState(0);
  const handlerChangeName = () => {
    setModalKey((modalKey) => ++modalKey);
  };
  return (
    <div className={styles.home}>
      <AuthModal key={modalKey} />
      <Button onClick={handlerChangeName}>Изменить имя</Button>
    </div>
  );
};

export default Home;
