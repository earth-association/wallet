// Copyright 2021 @earthwallet/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import type { ThemeProps } from '../types';

import { faArrowLeft, faCog, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ICON_BACK from '../assets/icon_back.svg';
import Link from '../components/Link';
import useOutsideClick from '../hooks/useOutsideClick';
import AccountSelector from './AccountSelector';
import MenuAdd from './MenuAdd';
import MenuSettings from './MenuSettings';
import NetworkSelector from './NetworkSelector';

interface Props extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  showAdd?: boolean;
  showMenu?: boolean;
  showBackArrow?: boolean;
  showSettings?: boolean;
  smallMargin?: boolean;
  type?: string;
  showNetworkDropdown?: boolean;
  text?: React.ReactNode;
  showAccountsDropdown?: boolean;
  backOverride?: any;
  centerText?: boolean;
}

function Header ({ backOverride, centerText, children, className = '', showAccountsDropdown, showAdd, showBackArrow, showMenu, showNetworkDropdown, showSettings, smallMargin = false, text, type = '' }: Props): React.ReactElement<Props> {
  const [isAddOpen, setShowAdd] = useState(false);
  const [isSettingsOpen, setShowSettings] = useState(false);
  const addRef = useRef(null);
  const setRef = useRef(null);
  const history = useHistory();

  useOutsideClick(addRef, (): void => {
    isAddOpen && setShowAdd(!isAddOpen);
  });

  useOutsideClick(setRef, (): void => {
    isSettingsOpen && setShowSettings(!isSettingsOpen);
  });

  const _toggleAdd = useCallback(
    (): void => setShowAdd((isAddOpen) => !isAddOpen),
    []
  );

  const _toggleSettings = useCallback(
    (): void => setShowSettings((isSettingsOpen) => !isSettingsOpen),
    []
  );

  // const blob = new Blob([toSvg('value', 100)], { type: 'image/svg+xml' });
  //   const url = URL.createObjectURL(blob);

  return (
    <div className={`${className} ${smallMargin ? 'smallMargin' : ''} ${type === 'wallet' ? 'walletDiv' : ''}`}>
      {type !== 'wallet' && type !== 'details'
        ? <div className='container'>
          <div className='branding'>
            {showBackArrow
              ? (
                <Link
                  className='backlink'
                  to='/'
                >
                  <FontAwesomeIcon
                    className='arrowLeftIcon'
                    icon={faArrowLeft}
                  />
                </Link>
              )
              : (
                <div />
              )
            }

            {text && <span className='logoText'>{text || 'Earth Wallet'}</span>}
          </div>

          {showNetworkDropdown && (<NetworkSelector/>)}
          {showAccountsDropdown && (<AccountSelector/>)}

          <div className='popupMenus'>
            {showAdd && (
              <div
                className='popupToggle'
                onClick={_toggleAdd}
              >
                <FontAwesomeIcon
                  className={`plusIcon ${isAddOpen ? 'selected' : ''}`}
                  icon={faEllipsisV}
                  size='lg'
                />
              </div>
            )}
            {showSettings && (
              <div
                className='popupToggle'
                data-toggle-settings
                onClick={_toggleSettings}
              >
                <FontAwesomeIcon
                  className={`cogIcon ${isSettingsOpen ? 'selected' : ''}`}
                  icon={faCog}
                  size='lg'
                />
              </div>
            )}
            {showMenu && (
              <div
                className='popupToggle'
                data-toggle-settings
                onClick={_toggleSettings}
              >
                <FontAwesomeIcon
                  className={`cogIcon ${isSettingsOpen ? 'selected' : ''}`}
                  icon={faEllipsisV}
                  size='lg'
                />
              </div>
            )}
          </div>
          {isAddOpen && (
            <MenuAdd reference={addRef}/>
          )}
          {isSettingsOpen && (
            <MenuSettings reference={setRef}/>
          )}
          {children}
        </div>
        : type === 'details'
          ? <div className='container containerDetails'>
            <div
              className='backButtonCont backButtonContDetails'
              onClick={() => history.goBack()}>
              <div className='backButtonIcon backButtonIconDetails' >
                <img src={ICON_BACK} /> <div className='backText'>Back</div>
              </div>
            </div>
            {text && <div className={`headerText ${centerText ? 'headerTextCenter' : ''}`}>{text}</div>}
            {children}
          </div>
          : <div className='container'>
            {backOverride === undefined
              ? <div
                className='backButtonCont'
                onClick={() => history.goBack()}>
                <div className='backButtonIcon' >
                  <img src={ICON_BACK} />
                </div>
              </div>
              : <div
                className='backButtonCont'
                onClick={() => backOverride()}>
                <div className='backButtonIcon' >
                  <img src={ICON_BACK} />
                </div>
              </div>
            }
            {text && <div className={`headerText ${centerText ? 'headerTextCenter' : ''}`}>{text}</div>}
            {centerText && <div/>}
            {children}
            {showAccountsDropdown && (<AccountSelector/>)}
          </div>
      }
    </div>
  );
}

export default React.memo(styled(Header)(({ theme }: Props) => `
  max-width: 100%;
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  position: relative;



  .backText {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */
    
    
    color: #FFFFFF;
    
    
    /* Inside Auto Layout */
    
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 8px;
  }

  .backButtonCont {
    background: rgba(5, 12, 18, 0.4);
    backdrop-filter: blur(20px);
    /* Note: backdrop-filter has minimal browser support */
    
    border-radius: 30px;
    width: 39px;
    height: 39px;   
    display: flex;
    align-items: center;
    justify-content: center; 
    &:active {
      opacity: 0.7;
    }
  }

  .headerText {
    font-style: normal;
    /* font-weight: 600; */
    font-size: 16px;
    line-height: 16px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    
  }

  .backButtonIcon{
    width: 33px;
    height: 33px;
    background: rgba(255, 255, 255, 0.17);
    border-radius: 21px;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

  }


  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  && {
    padding: 0 0 0;
  }

  > .container {
    display: flex;
    justify-content: space-between;
    width: calc(100vw - 48px);
    margin: 24px 0 0 0;
    padding: 0 24px;

    .branding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.labelColor};
      font-family: ${theme.fontFamily};
      text-align: center;

      .logoText {
        color: ${theme.textColor};
        font-family: ${theme.fontFamily};
        font-size: 18px;
        margin-left: 12px;
        align-items: center;
      }

      .header-logo {
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background-color: #1B63A6;
        &:hover {
            cursor: pointer;
            -moz-box-shadow: 0 0 5px 5px rgba(43, 115, 255, 0.7);
            -webkit-box-shadow: 0 0 5px 5px rgba(43, 115, 255, 0.7);
            box-shadow: 0 0 5px 5px rgba(43, 115, 255, 0.7);
        }
        }
    }

    .addressDropdown select{
    border-radius: 32px;
    }

    .popupMenus {
      align-self: center;

      .popupToggle {
        display: inline-block;
        vertical-align: middle;

        &:last-child {
          margin-right: 24px;
        }

        &:hover {
          cursor: pointer;
        }
      }

      .popupToggle+.popupToggle {
        margin-left: 8px;
      }
    }
  }

  .plusIcon, .cogIcon {
    color: ${theme.iconNeutralColor};

    &.selected {
      color: ${theme.primaryColor};
    }
  }

  .arrowLeftIcon {
    color: ${theme.labelColor};
    margin-right: 1rem;
  }

  .backlink {
    color: ${theme.labelColor};
    min-height: 52px;
    text-decoration: underline;
    width: min-content;

    &:visited {
      color: ${theme.labelColor};
    }
  }

  &.smallMargin {
    margin-bottom: 15px;
  }

  .headerTextCenter {
    margin-left: -34px;
  }

  .backButtonIconDetails {
    padding: 0 10px;
    width: auto;
  }
  .containerDetails {
    margin: 0;
    width: 317px;
    max-width: 317px;
    padding: 0px 0 0 0px;
  }

  .backButtonContDetails {
    width: 86px;
  }
`));
