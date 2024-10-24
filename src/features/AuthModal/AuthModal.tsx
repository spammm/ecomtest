'use client';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/shared/store/useUserStore';
import useSyncUserName from '@/shared/store/useSyncUserName';
import { Button, Input, ModalWindow } from '../../shared/ui';
import styles from './AuthModal.module.scss';

const AuthModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState('');

  const userName = useUserStore((state) => state.userName);
  const setUserName = useUserStore((state) => state.setUserName);

  const [, updateSyncStatus] = useSyncUserName();

  useEffect(() => {
    if (userName) {
      setName(userName);
    }
  }, [userName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      setUserName(name);
      updateSyncStatus('success');
      setIsOpen(false);
    }
  };

  const closeModal = () => {
    if (!userName) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ModalWindow isOpen={true} onClose={closeModal} className={styles.modal}>
      <h1>Начать</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Напишите ваше имя"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
        <div className={styles.buttonsContainer}>
          <Button type="submit" disabled={!name.trim()}>
            Сохранить
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

export { AuthModal };
