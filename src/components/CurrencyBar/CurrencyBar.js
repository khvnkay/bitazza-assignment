import React from 'react';
import './currencyBar.css';
import btc from '../../assets/img/cypto/btc.png';
function CurrencyBar() {
  return (
    <div className='box'>
      <div className='row'>
        <div className='col align-self-center'>
          <div className='row'>
            <div className='col '>
              <img src={btc} alt='' />
            </div>
            <div className='col '>
              <h6 className='text-d-gray'>BTC/USDT</h6>
            </div>
          </div>
        </div>
        <div className='col align-self-center  '>
          <div className='all-market t-gray'>All markets</div>
          <p></p>
        </div>
      
        <div className='col align-self-center border-left'>
          <h6 className='t-green'>62,238.00</h6>
          <p className='t-gray'> Last market price</p>
          
        </div>

        <div className='col  border-left'>
          <p className='t-green'>+1.75%</p>
          <p className='t-gray'>24h Change</p>
        </div>
        <div className='col'>
          <p className='t-d-gray'>63,597.80</p>
          <p className='t-gray'>24h High</p>
        </div>
        <div className='col'>
          <p className='t-d-gray'> 60,322.6</p>
          <p className='t-gray'> 24h Low</p>
        </div>
        <div className='col'>
          <p className='t-d-gray'> 2,548,722,097.16</p>
          <p className='t-gray'> Market Volume</p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyBar;
