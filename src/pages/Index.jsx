import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Button, HStack, VStack, IconButton } from "@chakra-ui/react";
import { FaEraser, FaPen, FaSave } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const handleToolChange = (selectedTool) => {
    setTool(selectedTool);
    if (selectedTool === "pen") {
      context.strokeStyle = "black";
      context.lineWidth = 2;
    } else if (selectedTool === "eraser") {
      context.strokeStyle = "white";
      context.lineWidth = 10;
    }
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "whiteboard.png";
    link.click();
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack spacing={4}>
          <IconButton aria-label="Pen" icon={<FaPen />} onClick={() => handleToolChange("pen")} />
          <IconButton aria-label="Eraser" icon={<FaEraser />} onClick={() => handleToolChange("eraser")} />
          <Button leftIcon={<FaSave />} onClick={saveCanvas}>
            Save
          </Button>
        </HStack>
        <Box border="1px" borderColor="gray.200" width="100%" height="80vh">
          <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} style={{ width: "100%", height: "100%" }} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
