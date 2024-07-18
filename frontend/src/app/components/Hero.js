'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Hero = () => {
  const [productUrl, setProductUrl] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setProductUrl(e.target.value);
  };

  const handleStartGenerating = async () => {
    try {
      const response = await axios.post('/api/generate-video', { url: productUrl });
      router.push({
        pathname: '/edit-product',
        query: { data: JSON.stringify(response.data) }
      });
    } catch (error) {
      console.error('Error generating video:', error.response ? error.response.data : error.message);
    }
  };

  const handleCreateManually = () => {
    router.push('/edit-product');
  };

  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>Generate AI Ads from your product URL</h1>
        <p>Just insert your product's link and we will generate your video in 30 seconds</p>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Paste your product link here..."
            value={productUrl}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.inputButton} onClick={handleStartGenerating}>
            ➔
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.heroButton} onClick={handleStartGenerating}>
            Start Generating
          </button>
          <button className={styles.createManuallyButton} onClick={handleCreateManually}>
            Create Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
