'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Home.module.css';

const Hero: React.FC = () => {
  const [productUrl, setProductUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductUrl(e.target.value);
  };

  const handleStartGenerating = async () => {
    const requestId = uuidv4();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/gpt/parse-product', { url: productUrl });
      const data = { id: requestId, ...response.data };
      localStorage.setItem(`request_${requestId}`, JSON.stringify(data));
      router.push(`/edit-product?id=${requestId}`);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateManually = () => {
    const requestId = uuidv4();
    localStorage.setItem(`request_${requestId}`, JSON.stringify({ id: requestId }));
    router.push(`/edit-product?id=${requestId}`);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

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
          <button className={styles.heroButton} onClick={handleStartGenerating} disabled={isLoading}>
            Start Generating
          </button>
          <button className={styles.createManuallyButton} onClick={handleCreateManually}>
            Create Manually
          </button>
          {isLoading && <div className={styles.loader}></div>}
        </div>
      </div>
      <div className={styles.heroVideo}>
        <video ref={videoRef} src="/emma_idle.mp4" autoPlay loop muted playsInline className={styles.video}></video>
      </div>
    </div>
  );
};

export default Hero;
