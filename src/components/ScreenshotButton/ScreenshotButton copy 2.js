"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./ScreenshotButton.module.css";
import html2canvas from "html2canvas";
import containerClient from "../../app/api/Azure/AzureStorage";

const ScreenshotButton = () => {
  const [imgSrc, setImgSrc] = useState("/images/sample-01.jpg");
  const [newBlob, setNewBlob] = useState();
  function takeScreenshot(e) {
    e.preventDefault();

    let dataURL;
    const canvasElement = document.querySelector(".container");

    const allElArray = Array.from(canvasElement.children);
    const canvas = "CANVAS";
    allElArray.forEach((child) => {
      if (child.nodeName === canvas) {
        canvasElement.children[0].style.backgroundColor = "black";
        html2canvas(canvasElement.children[0], { useCORS: true }).then(
          (canvas) => {
            dataURL = canvas.toDataURL("image/png");
            setImgSrc(dataURL);
          }
        );
      }
    });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month, so add 1
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
    const fileName = `image_${currentMonth}_${currentDay}_${currentYear}_${currentHour}:${currentMinute}:${currentSecond}`;

    const handleUpload = async (dataUri, name) => {
      const blobName = name;
      const imageBytes = Buffer.from(dataUri.split(",")[1], "base64");
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.upload(imageBytes, imageBytes.length);
      console.log("Image uploaded to Azure Blob Storage!");
    };

    handleUpload(imgSrc, fileName);
  }
  return (
    <div className={styles.buttonComponent}>
      <button onClick={takeScreenshot} className={styles.button}>
        {" "}
        Grab{" "}
      </button>

      <Image src={imgSrc} alt={"screnshot"} height={100} width={100} />
    </div>
  );
};

export default ScreenshotButton;
// function dataUriToBlob(dataUri) {
//   const byteString = atob(dataUri.split(",")[1]); // convert base64-encoded data to binary data
//   const mimeType = dataUri.split(",")[0].split(":")[1].split(";")[0]; // extract MIME type from data URI
//   const arrayBuffer = new ArrayBuffer(byteString.length); // create a buffer to hold binary data
//   const uint8Array = new Uint8Array(arrayBuffer); // create a view into the buffer
//   for (let i = 0; i < byteString.length; i++) {
//     uint8Array[i] = byteString.charCodeAt(i); // copy binary data into the buffer
//   }
//   const blob = new Blob([arrayBuffer], { type: mimeType }); // create a Blob object from the buffer and MIME type
//   return blob;
// }

// const blob1 = dataUriToBlob(imgSrc); // convert data URI to Blob object

//setNewBlob(blob);
