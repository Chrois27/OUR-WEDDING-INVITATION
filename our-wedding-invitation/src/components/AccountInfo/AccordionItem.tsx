import React, { useState } from 'react';
import styles from './AccordionItem.module.scss';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

export default AccordionItem;