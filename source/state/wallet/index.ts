import { EarthKeyringPair } from '@earthwallet/keyring';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkType } from '~global/types';

import type { IWalletState } from './types';
//import type { StoreInterface } from '~state/IStore';
import { AppState } from '~state/store';
import groupBy from 'lodash/groupBy';

const initialState: IWalletState = {
  accounts: [],
  activeAccount: null,
  newMnemonic: '',
  loading: false,
  error: '',
  activeNetwork: NetworkType.ICP,
};

const WalletState = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateAccounts(
      state: IWalletState,
      action: PayloadAction<EarthKeyringPair[]>
    ) {
      state.accounts = action.payload;
    },
    updateNewMnemonic(state: IWalletState, action: PayloadAction<string>) {
      state.newMnemonic = action.payload;
    },
    updateError(state: IWalletState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    updateLoading(state: IWalletState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateActiveAccount(
      state: IWalletState,
      action: PayloadAction<EarthKeyringPair & { id: string }>
    ) {
      state.activeAccount = action.payload;
    },
    hydrateWallet(state: IWalletState, action: PayloadAction<IWalletState>) {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  updateAccounts,
  updateActiveAccount,
  updateNewMnemonic,
  updateError,
  updateLoading,
  hydrateWallet,
} = WalletState.actions;

export const selectAccounts = (state: AppState) =>
  Object.keys(state.entities.accounts.byId).map(
    (id) => state.entities.accounts.byId[id]
  );

export const selectAccounts_ICP = (state: AppState) =>
  Object.keys(state.entities.accounts.byId)
    .map((id) => state.entities.accounts.byId[id])
    .filter((account) => account.symbol === 'ICP');

export const selectAccountsByGroupId = (groupId: string) => (state: AppState) =>
  Object.keys(state.entities.accounts.byId)
    .map((id) => state.entities.accounts.byId[id])
    .filter((account) => account.groupId === groupId)
    .sort((a, b) => a.order - b.order);

export const selectActiveAccountsByGroupId =
  (groupId: string) => (state: AppState) =>
    Object.keys(state.entities.accounts.byId)
      .map((id) => state.entities.accounts.byId[id])
      .filter((account) => account.groupId === groupId && account.active)
      .sort((a, b) => a.order - b.order);

export const selectAccountGroups = (state: AppState) => {
  const accountGroupsObject = groupBy(
    Object.keys(state.entities.accounts.byId).map(
      (id) => state.entities.accounts.byId[id]
    ),
    'groupId'
  );
  return Object.keys(accountGroupsObject).map((id) => accountGroupsObject[id]);
};

export const selectActiveAccountGroups = (state: AppState) => {
  const accountGroupsObject = groupBy(
    Object.keys(state.entities.accounts.byId)
      .map((id) => state.entities.accounts.byId[id])
      .filter((account) => account.active),
    'groupId'
  );
  return Object.keys(accountGroupsObject).map((id) => accountGroupsObject[id]);
};

export const selectBalanceByAddress = (address: string) => (state: AppState) =>
  state.entities.balances.byId[address];
export const selectBalanceInUSDByAddress =
  (address: string) => (state: AppState) =>
    state.entities.balances.byId[address].balanceInUSD;

export const selectGroupBalanceByAddress =
  (address: string) => (state: AppState) =>
    state.entities.groupbalances.byId[address];

export const selectAccountById = (address: string) => (state: AppState) =>
  state.entities.accounts.byId[address];

export const selectActiveAccount = (state: AppState) => state.activeAccount;

export default WalletState.reducer;
