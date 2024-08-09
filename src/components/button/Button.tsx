import styles from './Button.module.css';

interface IButtonProps {
  color: string;
  children: string;
  handleClick?: () => void;
}

const Button = ({ color, children, handleClick }: IButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={styles.button}
      style={{
        color: color,
        borderColor: color,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
