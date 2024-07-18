import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';

const ProductDetails: React.FC = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('ProductDetails must be used within a ProductProvider');
  }

  const { productInfo, updateProductInfo } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProductInfo(e.target.name as keyof typeof productInfo, e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={productInfo.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={productInfo.description}
        onChange={handleChange}
        placeholder="Product Description"
      />
      <input
        type="text"
        name="audience"
        value={productInfo.audience}
        onChange={handleChange}
        placeholder="Target Audience"
      />
    </div>
  );
};

export default ProductDetails;
