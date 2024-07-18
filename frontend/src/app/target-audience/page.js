'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/TargetAudience.module.css';

const TargetAudience = () => {
  const router = useRouter();
  const [audience, setAudience] = useState('');
  const suggestions = [
    "Pet owners",
    "Household cleaners",
    "Busy professionals",
    "Apartment renters",
    "Parents",
    "Elderly individuals",
    "Allergy sufferers",
    "Students living in dorms",
    "Small business owners",
    "Home improvement enthusiasts",
    "Eco-conscious consumers",
    "Tech enthusiasts",
    "People with back problems",
    "Single individuals",
    "Gadget lovers"
  ];

  const handleNext = () => {
    router.push('/choose-script');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
        <h1>Who are your ads for?</h1>
        <p>Describe your target audience, so we can tailor your scripts for them.</p>
      </div>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Click the tags below or describe your own audience here."
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
      />
      <div className={styles.suggestionsContainer}>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={styles.suggestion}
            onClick={() => setAudience(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleNext}>
        Next &rarr;
      </button>
    </div>
  );
};

export default TargetAudience;