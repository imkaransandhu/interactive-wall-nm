const CanvasElement = ({ canvavrefDetail }) => {
  return (
    <canvas
      ref={canvavrefDetail}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-1",
      }}
    ></canvas>
  );
};

export default CanvasElement;
