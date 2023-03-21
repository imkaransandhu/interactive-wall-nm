"use client";
import { useEffect, useState } from "react";
import io from "Socket.IO-client";

const Home = () => {
  //const [socket, setSocket] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    // const socketInitializer = async () => {
    //   await fetch("/api/hello");
    //   const newSocket = io();

    //   newSocket.on("connect", () => {
    //     console.log("connected");
    //   });

    const socketInitializer = async () => {
      await fetch("/api/hello");
      const newSocket = io();

      newSocket.on("connect", () => {
        console.log("connected");
      });

      newSocket.on("update-input", (msg) => {
        setInput(msg);
      });
      //setSocket(newSocket);
    };

    socketInitializer();
  }, []);

  return <input placeholder="Type something" value={input} />;
};

export default Home;
