import React, { useState } from 'react';
import styles from './AccountInfo.module.scss';

interface Account {
  name: string;
  account: string;
}

interface AccountInfoProps {
  groom: Account;
  bride: Account;
  parents: Account[];
}

const AccountInfo: React.FC<AccountInfoProps> = ({ groom, bride, parents }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('계좌번호가 복사되었습니다.');
    });
  };

  const renderAccount = (account: Account) => (
    <div key={account.name} className={styles.accountItem}>
      <button onClick={() => toggleDropdown(account.name)} className={styles.dropdownButton}>
        {account.name}
      </button>
      {activeDropdown === account.name && (
        <div className={styles.dropdownContent}>
          <p>{account.account}</p>
          <button onClick={() => copyToClipboard(account.account)} className={styles.copyButton}>
            복사하기
          </button>
          <a href={`https://qr.kakaopay.com/${account.account}`} className={styles.kakaoPayButton}>
            카카오페이 송금
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.accountInfo}>
      <h2>축의금 계좌</h2>
      <div className={styles.accountList}>
        {renderAccount(groom)}
        {renderAccount(bride)}
        {parents.map((parent) => renderAccount(parent))}
      </div>
    </div>
  );
};

export default AccountInfo;