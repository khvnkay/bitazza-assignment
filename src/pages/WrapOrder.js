import React from 'react';
import Order from './Order';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  addAsks,
  addBids,
  addExistingState,
  selectAsks,
  selectBids,
} from '../store/features/orderbook/orderbookSlice';
import { formatNumber } from '../utils/helpers';
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from '../utils/constants';
function WrapOrder({ windowWidth, productId, isFeedKilled }) {
  const bids = useAppSelector(selectBids);
  const asks = useAppSelector(selectAsks);
  const formatPrice = (arg) => {
    return arg.toLocaleString('en', {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

  const buildPriceLevels = (levels, orderType) => {
    const sortedLevelsByPrice = [...levels].sort((currentLevel, nextLevel) => {
      let result = 0;
      if (orderType === 'bids' || windowWidth < MOBILE_WIDTH) {
        result = nextLevel[0] - currentLevel[0];
      } else {
        result = currentLevel[0] - nextLevel[0];
      }
      return result;
    });

    return sortedLevelsByPrice.map((level, idx) => {
      const calculatedTotal = level[2];
      const total = formatNumber(calculatedTotal);
      const depth = level[3];
      const size = formatNumber(level[1]);
      const price = formatPrice(level[0]);

      return (
        <div></div>
        //   <PriceLevelRowContainer key={idx + depth}>
        //     <DepthVisualizer key={depth} windowWidth={windowWidth} depth={depth} orderType={orderType} />
        //     <PriceLevelRow key={size + total}
        //                    total={total}
        //                    size={size}
        //                    price={price}
        //                    reversedFieldsOrder={orderType === OrderType.ASKS}
        //                    windowWidth={windowWidth} />
        //   </PriceLevelRowContainer>
      );
    });
  };
  return (
    <Container>
      <Row>
        <Col lg='6'>
          <Order title='Asks' data={asks} />
        </Col>
        <Col lg='6'>
          <Order title='Bids' data={bids} />
        </Col>
      </Row>
    </Container>
    // <div style={{ display: 'flex' }}>
    // </div>
  );
}

export default WrapOrder;
