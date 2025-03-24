'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Battery, Zap, Shield } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
      alt: "Industrial Power Solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80",
      alt: "Power Distribution Systems"
    },
    {
      url: "https://images.unsplash.com/photo-1487875961445-47a00398c267?auto=format&fit=crop&q=80",
      alt: "Industrial Transformers"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden group">
        {backgroundImages.map((image, index) => (
          <div
            key={image.url}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentImageIndex ? 0.2 : 0 }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powering the Future of Industry
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium transformers, UPS systems, and power solutions for your industrial needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quotation">Request Quotation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                  <p className="text-muted-foreground">
                    State-of-the-art power solutions engineered for maximum efficiency
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <Battery className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Reliable Backup</h3>
                  <p className="text-muted-foreground">
                    Uninterrupted power supply systems for critical operations
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                  <p className="text-muted-foreground">
                    ISO certified manufacturing with rigorous quality control
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Industrial Transformers",
                image: "https://images.unsplash.com/photo-1504280317859-4d15b5e6f40e?auto=format&fit=crop&q=80",
                description: "High-capacity transformers for industrial applications",
              },
              {
                title: "UPS Systems",
                image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80",
                description: "Reliable backup power solutions for critical operations",
              },
              {
                title: "Power Distribution",
                image: "https://images.unsplash.com/photo-1609344349725-61e171f47590?auto=format&fit=crop&q=80",
                description: "Efficient power distribution systems for your facility",
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/products/${product.title.toLowerCase().replace(" ", "-")}`}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}