import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, ...props }) => {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        {...props}
        className={styles.checkboxInput}
      />
      <span className={styles.customCheckbox}></span>
      {label}
    </label>
  );
};

export { Checkbox };
