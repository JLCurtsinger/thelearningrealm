import React, { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';

interface RelaxingDoodlesProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function RelaxingDoodles({ isDarkMode, isVibrant }: RelaxingDoodlesProps) {
  const [doodleColor, setDoodleColor] = useState('#9C27B0');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
        contextRef.current = ctx;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e
      ? (e.touches[0].clientX - rect.left)
      : (e.clientX - rect.left);
    const y = 'touches' in e
      ? (e.touches[0].clientY - rect.top)
      : (e.clientY - rect.top);

    setIsDrawing(true);
    setLastPoint({ x, y });

    // Start new path
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    contextRef.current.strokeStyle = doodleColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint || !contextRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e
      ? (e.touches[0].clientX - rect.left)
      : (e.clientX - rect.left);
    const y = 'touches' in e
      ? (e.touches[0].clientY - rect.top)
      : (e.clientY - rect.top);

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
    if (contextRef.current) {
      contextRef.current.closePath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={`
      rounded-3xl p-8
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-xl
    `}>
      {/* Color Palette */}
      <div className="flex justify-center space-x-4 mb-6">
        {['#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#E91E63'].map((color) => (
          <button
            key={color}
            onClick={() => setDoodleColor(color)}
            className={`
              w-12 h-12 rounded-full
              ${doodleColor === color ? 'ring-4 ring-purple-400' : ''}
              transform hover:scale-110
              transition-all duration-300
            `}
            style={{ backgroundColor: color }}
          />
        ))}
        
        <button
          onClick={clearCanvas}
          className={`
            p-3 rounded-full
            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
            transform hover:scale-110
            transition-all duration-300
          `}
        >
          <Palette className="w-6 h-6" />
        </button>
      </div>

      {/* Drawing Canvas */}
      <div
        className={`
          relative w-full aspect-[2/1] rounded-2xl overflow-hidden
          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
        `}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
