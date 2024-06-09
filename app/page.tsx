'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import BatteryChart from '@/components/BatteryChart';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const startSimulations = async () => {
      const res = await axios.get('/api/startSimulation');
      setMessage(res.data.message)
    };
  
    startSimulations();
  }, []);
  
  return(
    <div>
      <h1>Microgrid Simulation</h1>
      <p>{message}</p>
      <BatteryChart/>
    </div>
  );
}