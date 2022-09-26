import './App.css';
import React, {  useEffect } from 'react';
import Box from '@mui/material/Box';
import ActionBar from './components/ActionBar/ActionBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Trade from './pages/Trade';
import WrapOrder from './pages/WrapOrder';
import useWebSocket from 'react-use-websocket';
import { useAppDispatch } from './hooks/hooks';
import {  ORDERBOOK_LEVELS } from './utils/constants';
import {
  addAsks,
  addBids,
  addExistingState,
} from './store/features/orderbook/orderbookSlice';
import LoginPage from './pages/Login';
import Contact from './pages/Contact';

let currentBids = [];
let currentAsks = [];

function App({ isFeedKilled }) {
  const dispatch = useAppDispatch();
  const WSS_FEED_URL = 'wss://apexapi.bitazza.com/WSGateway';
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    queryParams: {},
    onOpen: () => console.log('WebSocket connection opened.'),
    onClose: () => console.log('WebSocket connection closed.'),
    onError: (event) => console.log('error connection closed.', event),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  
  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    // console.log(JSON.parse(response.o));
    if (response) {
      dispatch(addExistingState(JSON.parse(response.o)));
    } else {
      process(response);
    }
  };

  useEffect(() => {
    function connect(product) {
      let json = {
        InstrumentId: 1,
        Interval: 60,
        FromDate: '2022-03-16',
        ToDate: '2022-03-26',
        OMSId: 1,
      };
      // let subscribeMessage = {
      //   i: 2,
      //   m: 0,
      //   n: 'GetTickerHistory',
      //   n: 'SubscribeLevel2',
      //   o: '',
      // };
      let subscribeMessage = {
        i: 100,
        m: 0,
        n: 'SubscribeLevel2',
        o: '{"OMSId":1,"instrumentId":1,"depth":10}',
      };

      // subscribeMessage.o = JSON.stringify(json);
      sendJsonMessage(subscribeMessage);
    }
    if (isFeedKilled) {
      getWebSocket()?.close();
    } else {
      connect();
    }
  }, [isFeedKilled, sendJsonMessage, getWebSocket]);

  const process = (data) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      if (currentBids.length > ORDERBOOK_LEVELS) {
        dispatch(addBids(currentBids));
        currentBids = [];
        currentBids.length = 0;
      }
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks];

      if (currentAsks.length > ORDERBOOK_LEVELS) {
        dispatch(addAsks(currentAsks));
        currentAsks = [];
        currentAsks.length = 0;
      }
    }
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <ActionBar />
          <div className='app_container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/trade' element={<Trade />} />
              <Route path='/order' element={<WrapOrder />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/contact' element={<Contact />} />
              {/* <Route path='/history' element={<History />} /> */}
            </Routes>
          </div>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
