export const generatePuzzlePath = (x: number, y: number, width: number, height: number, isTop: boolean, isRight: boolean, isBottom: boolean, isLeft: boolean) => {
  const neckSize = Math.min(width, height) * 0.15;
  const headSize = neckSize * 2;
  const waveSize = neckSize * 0.3; // 波浪的振幅
  
  let mainPath = `M ${x} ${y}`;
  
  // 上边
  if (isTop) {
    // 第一行，添加轻微波浪
    mainPath += ` H ${x + width}`;
  } else {
    // 非第一行，内凹加波浪
    mainPath += ` C ${x + width * 0.15} ${y - waveSize}, ${x + width * 0.3} ${y}, ${x + width/2 - headSize/2} ${y}`;
    // 中间的内凹
    mainPath += ` C ${x + width/2 - headSize/2 + neckSize} ${y} 
               ${x + width/2 - neckSize} ${y + neckSize} 
               ${x + width/2 - neckSize} ${y + neckSize*1.5}`;
    mainPath += ` C ${x + width/2 - neckSize} ${y + headSize} 
               ${x + width/2 + neckSize} ${y + headSize} 
               ${x + width/2 + neckSize} ${y + neckSize*1.5}`;
    mainPath += ` C ${x + width/2 + neckSize} ${y + neckSize} 
               ${x + width/2 + headSize/2 - neckSize} ${y} 
               ${x + width/2 + headSize/2} ${y}`;
    // 右半部分的波浪
    mainPath += ` C ${x + width * 0.7} ${y}, ${x + width * 0.85} ${y - waveSize}, ${x + width} ${y}`;
  }
  
  // 右边
  if (isRight) {
    mainPath += ` V ${y + height}`;
  } else {
    // 非最后一列，凸起加波浪
    mainPath += ` C ${x + width + waveSize} ${y + height * 0.15}, ${x + width} ${y + height * 0.3}, ${x + width} ${y + height/2 - headSize/2}`;
    // 中间的凸起
    mainPath += ` C ${x + width} ${y + height/2 - headSize/2 + neckSize} 
                ${x + width + neckSize} ${y + height/2 - neckSize} 
                ${x + width + neckSize*1.5} ${y + height/2 - neckSize}`;
    mainPath += ` C ${x + width + headSize} ${y + height/2 - neckSize} 
                ${x + width + headSize} ${y + height/2 + neckSize} 
                ${x + width + neckSize*1.5} ${y + height/2 + neckSize}`;
    mainPath += ` C ${x + width + neckSize} ${y + height/2 + neckSize} 
                ${x + width} ${y + height/2 + headSize/2 - neckSize} 
                ${x + width} ${y + height/2 + headSize/2}`;
    // 下半部分的波浪
    mainPath += ` C ${x + width} ${y + height * 0.7}, ${x + width + waveSize} ${y + height * 0.85}, ${x + width} ${y + height}`;
  }

  // 底边
  if (isBottom) {
    mainPath += ` H ${x}`;
  } else {
    // 非最后一行，凸起加波浪
    mainPath += ` C ${x + width * 0.85} ${y + height + waveSize}, ${x + width * 0.7} ${y + height}, ${x + width/2 + headSize/2} ${y + height}`;
    // 中间的凸起
    mainPath += ` C ${x + width/2 + headSize/2 - neckSize} ${y + height} 
                ${x + width/2 + neckSize} ${y + height + neckSize} 
                ${x + width/2 + neckSize} ${y + height + neckSize*1.5}`;
    mainPath += ` C ${x + width/2 + neckSize} ${y + height + headSize} 
                ${x + width/2 - neckSize} ${y + height + headSize} 
                ${x + width/2 - neckSize} ${y + height + neckSize*1.5}`;
    mainPath += ` C ${x + width/2 - neckSize} ${y + height + neckSize} 
                ${x + width/2 - headSize/2 + neckSize} ${y + height} 
                ${x + width/2 - headSize/2} ${y + height}`;
    // 左半部分的波浪
    mainPath += ` C ${x + width * 0.3} ${y + height}, ${x + width * 0.15} ${y + height + waveSize}, ${x} ${y + height}`;
  }
  
  // 左边
  if (isLeft) {
    mainPath += ` V ${y}`;
  } else {
    // 非第一列，内凹加波浪
    mainPath += ` C ${x - waveSize} ${y + height * 0.85}, ${x} ${y + height * 0.7}, ${x} ${y + height/2 + headSize/2}`;
    // 中间的内凹
    mainPath += ` C ${x} ${y + height/2 + headSize/2 - neckSize} 
               ${x + neckSize} ${y + height/2 + neckSize} 
               ${x + neckSize*1.5} ${y + height/2 + neckSize}`;
    mainPath += ` C ${x + headSize} ${y + height/2 + neckSize} 
               ${x + headSize} ${y + height/2 - neckSize} 
               ${x + neckSize*1.5} ${y + height/2 - neckSize}`;
    mainPath += ` C ${x + neckSize} ${y + height/2 - neckSize} 
               ${x} ${y + height/2 - headSize/2 + neckSize} 
               ${x} ${y + height/2 - headSize/2}`;
    // 上半部分的波浪
    mainPath += ` C ${x} ${y + height * 0.3}, ${x - waveSize} ${y + height * 0.15}, ${x} ${y}`;
  }
  
  mainPath += ' Z';

  const shadowPath = '';
  const highlightPath = '';

  return { mainPath, shadowPath, highlightPath };
};