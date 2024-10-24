import { PasswordListItem } from './PasswordListItem';
import styles from './PasswordList.module.scss';

interface PasswordListProperty {
  list: Array<string>;
}

const PasswordList: React.FC<PasswordListProperty> = ({ list }) => {
  return (
    <div className={styles.list}>
      {list
        .map((item, index) => <PasswordListItem key={index} value={item} />)
        .reverse()}
      {list.length === 0 && (
        <p className={styles.empty}>Нажмите кнопку "Сгенерировать пароль"</p>
      )}
    </div>
  );
};

export { PasswordList };
