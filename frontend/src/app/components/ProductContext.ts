// frontend/src/app/components/context/ProductContext.ts
import React, { createContext, useState, ReactNode } from 'react';

type ProductInfo = {
  name: string;
  description: string;
  audience: string;
};

type ProductContextType = {
  productInfo: ProductInfo;
  updateProductInfo: (key: keyof ProductInfo, value: string) => void;
};

const defaultProductInfo: ProductInfo = {
  name: '',
  description: '',
  audience: '',
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productInfo, setProductInfo] = useState<ProductInfo>(defaultProductInfo);

  const updateProductInfo = (key: keyof ProductInfo, value: string) => {
    setProductInfo(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <ProductContext.Provider value={{ productInfo, updateProductInfo }}>
      {children}
    </ProductContext.Provider>
  );
};
