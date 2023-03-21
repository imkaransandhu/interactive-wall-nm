// "use client";
// import { useEffect, useState } from "react";
// import io from "Socket.IO-client";

// const Home = () => {
//   const [socket, setSocket] = useState(null);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const socketInitializer = async () => {
//       await fetch("/api/hello");
//       const newSocket = io();

//       newSocket.on("connect", () => {
//         console.log("connected");
//       });

//       newSocket.on("update-input", (msg) => {
//         setInput(msg);
//       });
//       setSocket(newSocket);
//     };

//     socketInitializer();
//   }, []);

//   const onChangeHandler = (e) => {
//     setInput(e.target.value);

//     socket.emit("input-change", e.target.value);
//     console.log(socket);
//   };

//   return (
//     <input
//       placeholder="Type something"
//       value={input}
//       onChange={onChangeHandler}
//     />
//   );
// };

// export default Home;
