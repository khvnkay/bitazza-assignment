import { createSlice, current } from '@reduxjs/toolkit';
import {  groupByType } from "../../../utils/helpers.js";


const initialState = {
  bids: [],
  asks: [],
};



export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    addExistingState: (state, { payload }) => {
      let bidList = []
      const bids = groupByType(payload, 0)
      const asks = groupByType(payload, 1)
      console.log(bidList);
      bidList.push(bids)
      state.bids = bids
      state.asks = asks
    },
    setGrouping: (state, { payload }) => {
      state.groupingSize = payload;
    },
    clearOrdersState: (state) => {
      state.bids = [];
      state.asks = [];
      state.rawBids = [];
      state.rawAsks = [];
      state.maxTotalBids = 0;
      state.maxTotalAsks = 0;
    }
  }
});

export const { addBids, addAsks, addExistingState, setGrouping, clearOrdersState } = orderbookSlice.actions;

export const selectBids = (state) => state.orderbook.bids;
export const selectAsks = (state) => state.orderbook.asks;
export const selectGrouping = (state) => state.orderbook.groupingSize;
export const selectMarket = (state) => state.orderbook.market;

export default orderbookSlice.reducer;
