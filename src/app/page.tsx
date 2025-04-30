'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChartBarIcon, CogIcon, ChartPieIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type IconComponent = typeof ChartBarIcon;

interface ProductCardProps {
  key?: number;
  title: string;
  description: string;
  icon: IconComponent;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

interface Product {
  title: string;
  description: string;
  longDescription: string;
  icon: IconComponent;
  color: string;
  videoSrc: string;
}

interface ProductDetailsProps {
  key?: number;
  title: string;
  description: string;
  videoSrc: string;
}

const ProductCard = ({ title, description, icon: Icon, color, isActive, onClick }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }}
      whileHover={{ 
        scale: isActive ? 1 : 1.03,
        rotateY: isActive ? 0 : 5,
        boxShadow: isActive ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform-gpu cursor-pointer ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.6,
          delay: 0.2,
          type: "spring",
          bounce: 0.5
        }}
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5,
          delay: 0.3,
          type: "spring",
          bounce: 0.3
        }}
        className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5,
          delay: 0.4,
          type: "spring",
          bounce: 0.3
        }}
        className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
      />
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 right-0 p-2 bg-blue-50 rounded-tr-2xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const ProductDetails = ({ title, description, videoSrc }: ProductDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="col-span-full mb-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          bounce: 0.4
        }}
        className="relative aspect-video rounded-2xl overflow-hidden shadow-xl"
      >
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-0 left-0 p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-lg opacity-90">{description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const products: Product[] = [
  {
    title: "AI-Powered Analytics",
    description: "Unlock deep insights from your data with our advanced analytics platform",
    longDescription: "Transform your data into actionable insights with our cutting-edge AI analytics platform. Get real-time visualizations and predictive analytics to drive your business forward.",
    icon: ChartBarIcon,
    color: "bg-blue-500",
    videoSrc: "/videos/analytics-demo.mp4"
  },
  {
    title: "Smart Automation",
    description: "Streamline operations with intelligent process automation",
    longDescription: "Automate repetitive tasks and optimize workflows with our intelligent automation solutions. Reduce manual work and increase efficiency across your organization.",
    icon: CogIcon,
    color: "bg-green-500",
    videoSrc: "/videos/automation-demo.mp4"
  },
  {
    title: "Predictive Modeling",
    description: "Forecast trends and make data-driven decisions with confidence",
    longDescription: "Leverage the power of predictive analytics to anticipate market trends and customer behavior. Make informed decisions backed by advanced AI models.",
    icon: ChartPieIcon,
    color: "bg-purple-500",
    videoSrc: "/videos/modeling-demo.mp4"
  }
];

export default function Page() {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          bounce: 0.4
        }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            bounce: 0.3
          }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              bounce: 0.3
            }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-shimmer"
          >
            Our Products
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              bounce: 0.3
            }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover our suite of AI-powered solutions designed to transform your business
          </motion.p>
        </motion.div>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <ProductDetails
              key={activeProduct}
              title={products[activeProduct].title}
              description={products[activeProduct].longDescription}
              videoSrc={products[activeProduct].videoSrc}
            />
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: 0.3,
              staggerChildren: 0.2
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                icon={product.icon}
                color={product.color}
                isActive={index === activeProduct}
                onClick={() => setActiveProduct(index)}
              />
            ))}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveProduct((prev) => (prev - 1 + products.length) % products.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveProduct((prev) => (prev + 1) % products.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
} 