'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles/ChooseScript.module.css';

const ChooseScript = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedScript, setSelectedScript] = useState('');

  const scripts = [
    "One of the samples of the script",
    "Another sample script for the video",
    "Inspiring script for the audience",
    "Quick demonstration script for the product",
  ];

  const handleSelectScript = (script) => {
    setSelectedScript(script);
  };

  const handleGenerate = () => {
    if (selectedScript) {
      // Add logic to handle the selected script
      router.push(`/next-step?selectedScript=${encodeURIComponent(selectedScript)}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
        <h1>Choose a video script</h1>
        <p>Here are a few options for your avatar’s script. Pick a style.</p>
      </div>
      <div className={styles.scriptsContainer}>
        {scripts.map((script, index) => (
          <div
            key={index}
            className={`${styles.scriptCard} ${selectedScript === script ? styles.selected : ''}`}
            onClick={() => handleSelectScript(script)}
          >
            {script}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleGenerate} disabled={!selectedScript}>
        Generate &rarr;
      </button>
    </div>
  );
};

export default ChooseScript;