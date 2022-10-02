/* eslint-disable no-restricted-properties */
/* eslint-disable prefer-exponentiation-operator */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import {
  minPrice,
  maxPrice,
  minPayment,
  maxPayment,
  minPeriod,
  maxPeriod,
  interestRate,
  localeOptions,
  route,
} from './utils/index.js';

function App() {
  const [carPrice, setCarPrice] = useState(3300000);
  const [initPayment, setInitPayment] = useState(10);
  const [leasePeriod, setLeasePeriod] = useState(60);

  const [isLoading, setIsLoading] = useState(false);

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

  const initPaymentInRub = Math.round(((initPayment * carPrice) / 100) * 100) / 100;

  const monthlyPayment = Math.round(((carPrice - initPaymentInRub)
   * ((interestRate * Math.pow((1 + interestRate), leasePeriod))
    / (Math.pow((1 + interestRate), leasePeriod) - 1))) * 100) / 100;

  const totalSum = Math.round((initPaymentInRub + leasePeriod * monthlyPayment) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const data = {
      carPrice,
      initPaymentInRub,
      leasePeriod,
      monthlyPayment,
      totalSum,
    };
    try {
      const response = await axios.post(route, data);
      console.log(response.status);
      setIsLoading(false);
    } catch (err) {
      if (err.isAxiosError) {
        console.log('Network error');
      } else {
        console.log('Unknown error');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <h1 className="header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form onSubmit={handleSubmit}>
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
              className="absolute range"
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
              {initPaymentInRub.toLocaleString('ru-RU', localeOptions)}
              <input
                className="input-field-small absolute"
                name="initPayment"
                type="number"
                max="99"
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
        <div className="container gap">
          <div className="result-item">
            <p className="result-title">Сумма договора лизинга</p>
            <div className="result-field">
              {totalSum.toLocaleString('ru-RU', localeOptions)}
            </div>
          </div>
          <div className="result-item">
            <p className="result-title">Ежемесячный платеж от</p>
            <div className="result-field">
              {monthlyPayment.toLocaleString('ru-RU', localeOptions)}
            </div>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              disabled={isLoading}
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
