import { useState, useEffect } from "react";
import Image from "next/image";

const images = ["/image-1.jpg", "/image-2.jpg", "/image-3.jpg"];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{ transform: `translateX(-${current * 100}%)` }}
  >
    {images.map((src, index) => (
      <div key={index} className="relative w-full flex-shrink-0 h-96">
        <Image
          src={src}
          alt={`Slide ${index}`}
          fill
          className="object-cover"
        />
      </div>
    ))}
  </div>

  {/* Controls */}
  <button
    onClick={prevSlide}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
  >
    ◀
  </button>
  <button
    onClick={nextSlide}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
  >
    ▶
  </button>
</div>
  );
}
