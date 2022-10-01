import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [carPrice, setCarPrice] = useState(3300000);
  const [initPayment, setInitPayment] = useState(10);
  const [leasePeriod, setLeasePeriod] = useState(60);

  const minPrice = 1000000;
  const maxPrice = 6000000;

  const minPayment = 10;
  const maxPayment = 60;

  const minPeriod = 1;
  const maxPeriod = 60;

  const localeOptions = {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePriceChange = (e) => {
    setCarPrice(e.target.value);
  };

  const handlePriceCheck = () => {
    if (carPrice < minPrice) {
      setCarPrice(minPrice);
    } else if (carPrice > maxPrice) {
      setCarPrice(maxPrice);
    }
  };

  const handleInitPayment = (e) => {
    setInitPayment(e.target.value);
  };

  const handleInitCheck = () => {
    if (initPayment < minPayment) {
      setInitPayment(minPayment);
    } else if (initPayment > maxPayment) {
      setInitPayment(maxPayment);
    }
  };

  const handleLeasePeriod = (e) => {
    setLeasePeriod(e.target.value);
  };

  const handlePeriodCheck = () => {
    if (leasePeriod < minPeriod) {
      setLeasePeriod(minPeriod);
    } else if (leasePeriod > maxPeriod) {
      setLeasePeriod(maxPeriod);
    }
  };

  const getInitPaymentInRub = () => {
    const rub = (initPayment * carPrice) / 100;
    return rub;
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
              type="number"
              id="carPrice"
              value={carPrice}
              onChange={handlePriceChange}
              onBlur={handlePriceCheck}
              ref={inputRef}
            />
            <div className="absolute inner-sign">₽</div>
            <input
              className="absolute"
              type="range"
              min={minPrice}
              max={maxPrice}
              value={carPrice}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="input-el">
          <p className="input-title">Первоначальный взнос</p>
          <div className="relative">
            <div className="input-field">
              {getInitPaymentInRub().toLocaleString('ru-RU', localeOptions)}
              <input
                className="input-field-small absolute"
                name="initPayment"
                type="number"
                id="initPayment"
                value={initPayment}
                onChange={handleInitPayment}
                onBlur={handleInitCheck}
              />
              <div className="absolute inner-sign-small">%</div>
            </div>
            <input
              className="absolute w-short"
              type="range"
              min={minPayment}
              max={maxPayment}
              value={initPayment}
              onChange={handleInitPayment}
            />
          </div>
        </div>
        <div className="input-el">
          <p className="input-title">Срок лизинга</p>
          <div className="relative">
            <input
              className="input-field"
              name="leasePeriod"
              type="number"
              id="leasePeriod"
              value={leasePeriod}
              onChange={handleLeasePeriod}
              onBlur={handlePeriodCheck}
            />
            <div className="absolute inner-sign">мес.</div>
            <input
              className="absolute"
              type="range"
              min={minPeriod}
              max={maxPeriod}
              value={leasePeriod}
              onChange={handleLeasePeriod}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
