import { cloneElement, useState } from 'react';

import Button from '../button/Button';
import { usePopup } from '../../context/PopupContext';

import styles from './Popup.module.css';

const Popup: React.FC = () => {
  const { isOpen, content, closePopup } = usePopup();
  const [nodeName, setNodeName] = useState<string>('');

  const handleAdd = () => {
    console.log('Add', nodeName);
    closePopup();
  };

  const handleRename = () => {
    console.log('Rename', nodeName);
    closePopup();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.currentTarget.value);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>{content.header}</div>
      <div className={styles.popupContent}>
        {content.body ? (
          cloneElement(content.body as JSX.Element, {
            value: nodeName,
            onChange: handleInputChange,
          })
        ) : (
          <input
            type='text'
            value={nodeName}
            onChange={handleInputChange}
            placeholder='Node Name'
          />
        )}
      </div>
      <div className={styles.popupFooter}>
        <Button color='blue' handleClick={closePopup}>
          Cancel
        </Button>
        {content.header === 'Add' && (
          <Button color='blue' handleClick={handleAdd}>
            Add
          </Button>
        )}
        {content.header === 'Edit' && (
          <Button color='blue' handleClick={handleRename}>
            Rename
          </Button>
        )}
      </div>
    </div>
  );
};

export default Popup;
