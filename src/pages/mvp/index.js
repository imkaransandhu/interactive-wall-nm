"use client";
import { Fragment, useEffect, useRef } from "react";

import CanvasElement from "./CanvasElement";
import WorkingElements from "./WorkingElements";
import RemoveBackground from "./Functions/RemoveBackground";

export default function Home() {
  const canvas = useRef(); //First canvas on which the the Silhouette is drawn with black background
  const webcam = useRef(); // Camera
  const videoToReveal = useRef(); // Video that will be played inside the Silhouette
  const imgRef = useRef(); // background Image
  const newCanvas1 = useRef(); // clone 1
  const newCanvas2 = useRef(); // clone 1
  const newCanvas3 = useRef(); // clone 1
  const newCanvas4 = useRef(); // clone 1
  const newCanvas5 = useRef(); // clone 1
  const WorkingElementsRefs = { canvas, webcam, videoToReveal, imgRef }; // Props for the WorkingElements
  useEffect(() => {
    // Assigning the current states
    const canvasEl = canvas.current;
    const webcamEl = webcam.current;
    const videoToRevealEl = videoToReveal.current;
    const imgEl = imgRef.current;
    const newCanvasEl1 = newCanvas1.current;
    const newCanvasEl2 = newCanvas2.current;
    const newCanvasEl3 = newCanvas3.current;
    const newCanvasEl4 = newCanvas4.current;
    const newCanvasEl5 = newCanvas5.current;

    // Addding some css to body elements
    document.body.style.overflow = "hidden";
    document.body.style.maxHeight = screen.height;

    // TensorFlow Modal to remove background.
    RemoveBackground(
      canvasEl,
      webcamEl,
      videoToRevealEl,
      newCanvasEl1,
      newCanvasEl2,
      newCanvasEl3,
      newCanvasEl4,
      newCanvasEl5
    );
  }, []);

  return (
    <Fragment>
      <CanvasElement canvavrefDetail={newCanvas1} />
      <CanvasElement canvavrefDetail={newCanvas2} />
      <CanvasElement canvavrefDetail={newCanvas3} />
      <CanvasElement canvavrefDetail={newCanvas4} />
      <CanvasElement canvavrefDetail={newCanvas5} />

      {/* Grabbing data elements */}
      <WorkingElements refDetail={WorkingElementsRefs} />
    </Fragment>
  );
}
