"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Battery, Zap, Power, ShoppingCart, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Product type definition
type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  specs: {
    power: string;
    efficiency: string;
    dimensions: string;
  };
};

// Sample products data
const products: Product[] = [
  {
    id: "1",
    name: "Industrial Power Transformer PT-5000",
    category: "Transformers",
    description: "High-performance industrial transformer for heavy-duty applications",
    price: 12500,
    image: "https://images.unsplash.com/photo-1504280317859-4d15b5e6f40e?auto=format&fit=crop&q=80",
    specs: {
      power: "5000 KVA",
      efficiency: "98%",
      dimensions: "2.5m x 1.8m x 2.2m",
    },
  },
  {
    id: "2",
    name: "Enterprise UPS System UPS-2000",
    category: "UPS Systems",
    description: "Reliable uninterruptible power supply for critical operations",
    price: 8999,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80",
    specs: {
      power: "2000 VA",
      efficiency: "95%",
      dimensions: "60cm x 45cm x 90cm",
    },
  },
  {
    id: "3",
    name: "Smart Power Distribution Unit PDU-100",
    category: "Power Distribution",
    description: "Intelligent power distribution unit with remote monitoring",
    price: 3999,
    image: "https://images.unsplash.com/photo-1609344349725-61e171f47590?auto=format&fit=crop&q=80",
    specs: {
      power: "100 Amp",
      efficiency: "99%",
      dimensions: "48cm x 40cm x 4U",
    },
  },
];

const categories = ["All", "Transformers", "UPS Systems", "Power Distribution"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Transformers":
        return <Zap className="h-6 w-6" />;
      case "UPS Systems":
        return <Battery className="h-6 w-6" />;
      case "Power Distribution":
        return <Power className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="mt-4">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="line-clamp-2">{product.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Power:</span>
                  <span>{product.specs.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency:</span>
                  <span>{product.specs.efficiency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span>{product.specs.dimensions}</span>
                </div>
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                ${product.price.toLocaleString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedProduct(product)}>
                  Details
                </Button>
                <Button onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            No products found matching your criteria
          </p>
        </div>
      )}

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="space-y-4">
                <Badge variant="secondary">{selectedProduct.category}</Badge>
                <p className="text-muted-foreground">{selectedProduct.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Power:</span>
                    <span>{selectedProduct.specs.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Efficiency:</span>
                    <span>{selectedProduct.specs.efficiency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Dimensions:</span>
                    <span>{selectedProduct.specs.dimensions}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold mb-4">
                    ${selectedProduct.price.toLocaleString()}
                  </div>
                  <Button onClick={() => handleAddToCart(selectedProduct)} className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}