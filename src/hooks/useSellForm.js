import { useState, useEffect } from 'react';
import apiClient from '@/libs/apiClient';

export default function useSellForm(card) {
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(null);
  const [price, setPrice] = useState('');
  const [exchangeGrade, setExchangeGrade] = useState('');
  const [exchangeGenre, setExchangeGenre] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');

  const isLoadingMax = maxQuantity === null;

  // fetchMax useEffect
  useEffect(() => {
    if (!card?.id) return;

    let isMounted = true;

    async function fetchMax() {
      try {
        const res = await apiClient.get(`/api/market/items/${card.id}/max`);

        if (isMounted) {
          setMaxQuantity(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchMax();

    return () => {
      isMounted = false;
    };
  }, [card?.id]);

  useEffect(() => {
    if (maxQuantity !== null && quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  }, [maxQuantity]);
  // increase
  const increase = () => {
    if (isLoadingMax) return;
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };
  // decrease
  const decrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  // handleQuantity
  const handleQuantity = (e) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      return;
    }

    const num = Number(value);

    if (Number.isNaN(num)) return;

    const limit = maxQuantity ?? Infinity;
    setQuantity(Math.max(1, Math.min(num, limit)));
  };
  return {
    isLoadingMax,
    quantity,
    maxQuantity,
    price,
    setPrice,
    exchangeGrade,
    setExchangeGrade,
    exchangeGenre,
    setExchangeGenre,
    exchangeDescription,
    setExchangeDescription,
    increase,
    decrease,
    handleQuantity,
  };
}
