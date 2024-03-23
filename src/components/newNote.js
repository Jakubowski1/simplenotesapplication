"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


// Defining the type of props that the Project component will receive.


// Defining the Project component that receives properties.
export default function Project(){
  // Creating a reference to a DOM element.
  const ref = useRef<HTMLDivElement>(null);

  // Extracting scroll position data using the "useScroll" hook.
  const { scrollYProgress } = useScroll({
    target: ref,  // The element to which we want to track the scroll position.
    offset: ["0 1", "1.33 1"],  // Offsets for the scroll position.
  });

  // Scaling effect based on scroll progress.
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  // Opacity effect based on scroll progress.
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <header> MATEUSz</header>
  
  );
}