"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface RecipesImageProps {
  image: string;
  title: string;
}

const RecipesImage = (props: RecipesImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      {!isImageLoaded && <Skeleton className="absolute w-full z-[1] h-full" />}
      <Image
        src={props.image}
        alt={props.title}
        fill
        className={`absolute object-cover object-center ${!isImageLoaded ? "opacity-0" : ''}`}
        onLoadingComplete={handleImageLoad}
      />
    </>
  );
};

export default RecipesImage;
