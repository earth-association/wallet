import merge from 'lodash/merge';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IEntityState } from './types';

const initialState: IEntityState = {
  accounts: { byId: {} },
  transactions: { byId: {} },
  prices: { byId: {} },
  addresses: { byId: {} },
};

export const entitiesState = createSlice({
  name: 'entities',
  initialState: initialState,
  reducers: {
    storeEntities: (state, action) => {
      let { entity, data }: { entity: string; data: unknown } = action.payload;

      if (entity != null && data != null) {
        if (Array.isArray(data)) {
          data = data.reduce(
            (preValue, curValue) => ({
              ...preValue,
              [curValue.id || curValue.ID]: curValue,
            }),
            {}
          );
        }
        state[entity].byId = merge(state[entity].byId, data);
      }
    },
    replaceEntities: (state, action) => {
      let { entity, data } = action.payload;

      if (entity != null && data != null) {
        if (Array.isArray(data)) {
          data = data.reduce(
            (preValue, curValue) => ({
              ...preValue,
              [curValue.id || curValue.ID]: curValue,
            }),
            {}
          );
        }
        state[entity].byId = data;
      }
    },
    updateEntities: (state, action) => {
      let { entity, key, data } = action.payload;
      if (entity != null && data != null && key != null && state[entity]) {
        state[entity].byId = {
          ...state[entity].byId,
          [key]: {
            ...(state[entity].byId[key] || {}),
            ...data,
          },
        };
      }
    },
    removeEntityKey: (state, action) => {
      let { entity, key } = action.payload;
      if (entity != null && key != null && state[entity]) {
        let temp = { ...state[entity].byId };
        delete temp[key];
        state[entity].byId = {
          ...temp,
        };
      }
    },
    hydrateEntities(state: IEntityState, action: PayloadAction<IEntityState>) {
      Object.assign(state, action.payload);
    },
    resetEntities: () => initialState,
  },
});

export const {
  storeEntities,
  updateEntities,
  replaceEntities,
  removeEntityKey,
  resetEntities,
  hydrateEntities
} = entitiesState.actions;

export default entitiesState.reducer;
