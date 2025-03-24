'use client';

import { useEffect } from 'react';
// First install framer-motion package:
// npm install framer-motion
// or
// yarn add framer-motion
import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: '/images/gallery/transformer1.svg',
    alt: 'Power Transformer Installation',
    description: 'High-capacity power transformer installation process'
  },
  {
    id: 2,
    src: '/images/gallery/transformer2.svg',
    alt: 'Distribution Transformer',
    description: 'Modern distribution transformer unit'
  },
  {
    id: 3,
    src: '/images/gallery/transformer3.svg',
    alt: 'Transformer Manufacturing',
    description: 'State-of-the-art transformer manufacturing facility'
  },
  {
    id: 4,
    src: '/images/gallery/transformer4.svg',
    alt: 'Smart Grid Solution',
    description: 'Intelligent power distribution system'
  },
  {
    id: 5,
    src: '/images/gallery/transformer5.svg',
    alt: 'Maintenance Service',
    description: 'Professional transformer maintenance and repair'
  },
  {
    id: 6,
    src: '/images/gallery/transformer6.svg',
    alt: 'Renewable Integration',
    description: 'Green energy transformer solutions'
  }
];

export default function GalleryPage() {
  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll('.gallery-image');
      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          image.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Gallery</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our collection of transformer installations, manufacturing processes, and innovative solutions that showcase our commitment to excellence in power distribution.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            className="gallery-image-container relative overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="group relative aspect-square overflow-hidden bg-gray-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-center">
                <div className="text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-semibold">{image.alt}</p>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .gallery-image-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .gallery-image-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}