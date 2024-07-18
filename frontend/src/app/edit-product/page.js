'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles/EditProduct.module.css';

const EditProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const productName = searchParams.get('productName');
    const description = searchParams.get('description');
    const images = JSON.parse(searchParams.get('images') || '[]');
    setProductName(productName || '');
    setDescription(description || '');
    setImages(images);
  }, [searchParams]);

  const handleNext = () => {
    router.push('/target-audience');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.header}>
          <span className={styles.arrow} onClick={() => router.back()}>&larr;</span>
          <h1>Edit your product's name, description, and media</h1>
        </div>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.fileUpload}>
          <label htmlFor="media">Choose Files</label>
          <input
            type="file"
            id="media"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...images, ...Array.from(e.target.files)])}
          />
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`media-${index}`}
              width="50"
            />
          ))}
        </div>
        <button className={styles.button} onClick={handleNext}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default EditProduct;