import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [carPrice, setCarPrice] = useState('3300000');
  const [initPayment, setInitPayment] = useState('420000');
  const [leasePeriod, setLeasePeriod] = useState('60');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePriceChange = (e) => {
    setCarPrice(e.target.value);
  };

  const handleInitPayment = (e) => {
    setInitPayment(e.target.value);
  };

  const handleLeasePeriod = (e) => {
    setLeasePeriod(e.target.value);
  };

  return (
    <div className="main">
      <h1 className="header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form>
        <div className="input-el">
          <p className="input-title">Стоимость автомобиля</p>
          <div className="relative">
            <input
              className="input-field"
              name="carPrice"
              type="text"
              id="carPrice"
              value={carPrice}
              onChange={handlePriceChange}
              ref={inputRef}
            />
            <input
              className="absolute"
              type="range"
              min="1000000"
              max="6000000"
              value={carPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="input-el">
          <p className="input-title">Первоначальный взнос</p>
          <input
            className="input-field"
            name="initPayment"
            type="text"
            id="initPayment"
            value={initPayment}
            onChange={handleInitPayment}
          />
        </div>
        <div className="input-el">
          <p className="input-title">Срок лизинга</p>
          <input
            className="input-field"
            name="leasePeriod"
            type="text"
            id="leasePeriod"
            value={leasePeriod}
            onChange={handleLeasePeriod}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
