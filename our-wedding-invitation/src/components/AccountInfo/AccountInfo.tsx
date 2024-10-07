import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AccountInfo.module.scss';
import AccordionItem from './AccordionItem';

interface AccountProps {
  name: React.ReactNode;
  bank: string;
  kakaopayLink?: string;
}

interface AccountInfoProps {
  groom: {
    name: string;
    account: string;
  };
  bride: {
    name: string;
    account: string;
  };
  parents: {
    name: string;
    account: string;
  }[];
}

const Account: React.FC<AccountProps> = ({ name, bank, kakaopayLink }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bank).then(
      () => {
        toast.success("클립보드에 복사되었습니다.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      (err) => {
        console.error('클립보드 복사 실패:', err);
        toast.error("클립보드 복사에 실패했습니다.");
      }
    );
  };

  return (
    <div className={styles.accountItem}>
      <h3>{name}</h3>
      <p>{bank}</p>
      <button onClick={copyToClipboard} className={styles.accountButton}>
        계좌번호 복사
      </button>
      {kakaopayLink && (
        <a href={kakaopayLink} target="_blank" rel="noopener noreferrer" className={styles.kakaopayButton}>
          카카오페이로 보내기
        </a>
      )}
    </div>
  );
};

const AccountInfo: React.FC<AccountInfoProps> = ({ groom, bride, parents }) => {
  return (
    <div className={styles.accountInfo}>
      <h2>마음 전하실 곳</h2>
      <AccordionItem title="신랑 & 신부">
        <div className={styles.mainAccounts}>
          <Account
            name={`신랑 ${groom.name}`}
            bank={groom.account}
            kakaopayLink="https://qr.kakaopay.com/신랑의카카오페이링크"
          />
          <Account
            name={`신부 ${bride.name}`}
            bank={bride.account}
            kakaopayLink="https://qr.kakaopay.com/신부의카카오페이링크"
          />
        </div>
      </AccordionItem>
      <AccordionItem title="부모님">
        <div className={styles.parentAccounts}>
          <div className={styles.groomParents}>
            <h4>신랑 측</h4>
            <Account
              name={parents[0].name}
              bank={parents[0].account}
            />
          </div>
          <div className={styles.brideParents}>
            <h4>신부 측</h4>
            <Account
              name={parents[1].name}
              bank={parents[1].account}
            />
          </div>
        </div>
      </AccordionItem>
      <p>신랑 신부에게 축하의 마음을 전해주세요.</p>
      <ToastContainer />
    </div>
  );
};

export default AccountInfo;