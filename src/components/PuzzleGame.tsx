"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {generatePuzzlePath} from './generatePuzzlePath';
const PuzzleGenerator = () => {
  const [image, setImage] = useState(null);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [pieces, setPieces] = useState([]);
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePuzzle = () => {
    if (!image) return;

    const containerAspectRatio = 16 / 9;
    const totalWidth = 100;
    const totalHeight = totalWidth / containerAspectRatio;
    
    const pieceWidth = totalWidth / cols;
    const pieceHeight = totalHeight / rows;
    const newPieces = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // 第一行的块顶部不凸起，最后一行的块底部不凸起
        const isTop = i === 0;     // 第一行
        const isBottom = i === rows - 1;  // 最后一行
        
        // 第一列的块左边不凸起，最后一列的块右边不凸起
        const isLeft = j === 0;     // 第一列
        const isRight = j === cols - 1;  // 最后一列

        const { mainPath, shadowPath, highlightPath } = generatePuzzlePath(
          j * pieceWidth,
          i * pieceHeight,
          pieceWidth,
          pieceHeight,
          isTop,
          isRight,
          isBottom,
          isLeft
        );

        newPieces.push({
          mainPath,
          shadowPath,
          highlightPath,
          x: j * pieceWidth,
          y: i * pieceHeight,
          width: pieceWidth,
          height: pieceHeight
        });
      }
    }

    setPieces(newPieces);
  };

  useEffect(() => {
    if (image) {
      generatePuzzle();
    }
  }, [image, rows, cols]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>拼图生成器</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="w-full"
            />
            <div className="flex gap-4 items-center">
              <span>行数: {rows}</span>
              <Slider
                value={[rows]}
                onValueChange={(value) => setRows(value[0])}
                min={2}
                max={40}
                step={1}
                className="w-48"
              />
            </div>
            <div className="flex gap-4 items-center">
              <span>列数: {cols}</span>
              <Slider
                value={[cols]}
                onValueChange={(value) => setCols(value[0])}
                min={2}
                max={40}
                step={1}
                className="w-48"
              />
            </div>
            <div className="flex gap-4 items-center">
              <span>描边宽度: {strokeWidth.toFixed(1)}</span>
              <Slider
                value={[strokeWidth]}
                onValueChange={(value) => setStrokeWidth(value[0])}
                min={0.1}
                max={3.0}
                step={0.1}
                className="w-48"
              />
            </div>
          </div>

          <div className="relative w-full aspect-video border rounded-lg overflow-hidden">
            {!image && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">请上传图片</p>
              </div>
            )}
            
            {image && (
              <svg
                viewBox="0 0 100 56.25"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern
                    id="img"
                    patternUnits="userSpaceOnUse"
                    width="100"
                    height="56.25"
                  >
                    <image
                      href={image}
                      x="0"
                      y="0"
                      width="100"
                      height="56.25"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                {pieces.map((piece, index) => (
                  <g key={index} className="cursor-pointer transform transition-all duration-200 hover:-translate-y-1 hover:scale-105">
                    <path
                      d={piece.mainPath}
                      fill="url(#img)"
                      stroke="#fff"
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      className="transition-transform"
                    />
                  </g>
                ))}
              </svg>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleGenerator;