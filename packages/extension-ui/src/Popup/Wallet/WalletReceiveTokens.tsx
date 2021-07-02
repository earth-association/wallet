// Copyright 2021 @earthwallet/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';

import useToast from '@earthwallet/extension-ui/hooks/useToast';
import { Header } from '@earthwallet/extension-ui/partials';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import QRCode from 'qrcode.react';
import React, { useCallback, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import BG_RECEIVE from '../../assets/bg_receive.png';
import { NextStepButton, SelectedAccountContext } from '../../components';

interface Props extends ThemeProps {
  className?: string;
}

// eslint-disable-next-line space-before-function-paren
const WalletReceiveTokens = function ({ className }: Props): React.ReactElement<Props> {
  const { show } = useToast();
  const history = useHistory();

  const { selectedAccount } = useContext(SelectedAccountContext);
  const getShortAddress = (address: string) => address.substring(0, 8) + '.....' + address.substring(address.length - 8);
  const _onCopy = useCallback((): void => show('Copied'), [show]);

  return (
    <div className={className}>
      <Header
        showAccountsDropdown
        showMenu
        type='wallet' />
      <div >
        <div className='accountShare'>Share your Public Address</div>
        <div className='accountDetail'>

          {selectedAccount?.address && <div className='addressDisplay'>
            {getShortAddress(selectedAccount?.address)}
            <CopyToClipboard
              text={selectedAccount?.address} >
              <FontAwesomeIcon
                className='copyIcon'
                icon={faCopy}
                onClick={_onCopy}
                size='sm'

                title={'copy address'}
              />
            </CopyToClipboard> </div>}

          <div
            className='qrCodeCont'

          >

            <QRCode bgColor='#0000'
              fgColor='#DDD'
              size={220}
              value={selectedAccount?.address || ''} />

          </div>

        </div>

      </div>
      <div style={{ padding: '0 27px',
        marginBottom: 30,
        position: 'absolute',
        bottom: 0,
        left: 0 }}>
        <NextStepButton
          isDisabled={false}
          onClick={() => history.push(`/account/export/${selectedAccount?.address || ''}`)}
        >
          {'Export Account'}
        </NextStepButton>

      </div>
    </div>
  );
};

export default styled(WalletReceiveTokens)(({ theme }: Props) => `
    width: auto;
    height: 100%;
    background: url(${BG_RECEIVE});

    .qrCodeCont {
      display: flex;
    background: #5a597e66;
    backdrop-filter: blur(15px);
    border-radius: 14px;
    width: calc(100% - 48px);
    padding: 40px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    }

    .accountShare {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      /* identical to box height */


      color: #FFFFFF;
      padding: 24px 24px 0 24px;
      text-align: center;
      }

    .topBarDiv {
        width: 100%;
        display: flex;
        flex-direction: rows;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
        border-bottom: 1px solid ${theme.addAccountImageBackground}
    }

    .topBarDivCenterItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex:.5;
        color: ${theme.subTextColor};
        font-family: ${theme.fontFamily};
        font-size: 20px;
    }

    .topBarDivSideItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex:.25;
    }

    .topBarDivCancelItem {
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: ${theme.buttonBackground};
        font-family: ${theme.fontFamily};
        font-size: 12px;
        &:hover {
            color: ${theme.buttonBackgroundHover};
            }
    }

     .accountDetail {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 420px;
        width: 100%;
         align-items: center;
        justify-content: center;
    }

    .addressDisplay{
        margin-bottom:16px;
    }
    .copyIcon{
        margin-left: 4px;
    }
`);
