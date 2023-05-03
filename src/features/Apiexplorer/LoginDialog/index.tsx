import React, { useCallback } from 'react';
import { Modal } from '@deriv/ui';
import useLoginUrl from '@site/src/hooks/useLoginUrl';
import { Button } from '@deriv/ui';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './LoginDialog.module.scss';

type TLoginDialog = {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginDialog = ({ setToggleModal }: TLoginDialog) => {
  const { getUrl } = useLoginUrl();
  const isBrowser = useIsBrowser();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setToggleModal(false);
    },
    [setToggleModal],
  );

  const handleClick = () => {
    location.assign(getUrl('en'));
  };

  const handleSignUp = () => {
    location.assign('https://deriv.com/signup/');
  };
  return (
    <React.Fragment>
      {isBrowser && (
        <Modal defaultOpen onOpenChange={onOpenChange}>
          <Modal.Portal>
            <div className='modal-overlay'>
              <Modal.Overlay />
              <Modal.PageContent
                title={'Authorisation required'}
                has_close_button
                className={styles.wrapper}
              >
                <div className={styles.modal}>Log in or sign up to continue.</div>
                <div className={styles.buttonWrapper}>
                  <Button color='tertiary' onClick={handleSignUp} className={styles.btn}>
                    Sign up
                  </Button>
                  <Button color='primary' onClick={handleClick} className={styles.btn}>
                    Log in
                  </Button>
                </div>
              </Modal.PageContent>
            </div>
          </Modal.Portal>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default LoginDialog;
