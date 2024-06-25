import React from 'react';
import './Scrolldown.scss'

const ScrollDown: React.FC = () => {
  return (
    <div className="scroll-down-indicator">
    <span>S</span>
    <span>c</span>
    <span>r</span>
    <span>o</span>
    <span>l</span>
    <span>l</span>
    <br></br>
    <span>D</span>
    <span>o</span>
    <span>w</span>
    <span>n</span>
    <div className="arrow-down"></div>
  </div>
  );
};

export default ScrollDown;
