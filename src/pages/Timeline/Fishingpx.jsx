import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './Fishingpx.css';

const Fishingpx = () => {
  const containerRef = useRef(null);
  
  // Monitors scroll progress over a 300vh range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", "15%"]);       
  const samuraiY = useTransform(smoothScroll, [0, 1], ["0%", "-25%"]);   
  const textY = useTransform(smoothScroll, [0, 1], ["0%", "-45%"]);     
  const blossomY = useTransform(smoothScroll, [0, 1], ["0%", "-70%"]);  
  const petalY = useTransform(smoothScroll, [0, 1], ["0%", "-90%"]);    

  return (
    <div className="parallax-viewport" ref={containerRef}>
      <div className="parallax-sticky-container">
        
     
        <div className="side-timeline">
          <span className="timeline-text">TIMELINE</span>
          <span className="kanji-text">年表</span>
        </div>


        <motion.div className="layer bg-landscape" style={{ y: bgY, scale: 1.1 }} />


        <motion.div className="layer samurai-mid" style={{ y: samuraiY }} />

        <motion.div className="text-content" style={{ y: textY }}>
          <h1 className="title">FLOW OF <br/> <span className="blue-text">EVENTS</span></h1>
        </motion.div>

       
        <motion.div className="layer blossom-frame" style={{ y: blossomY, scale: 1.05 }} />

 
        <motion.div className="layer petals-drift" style={{ y: petalY }} />

      
        <div className="quote-container">
          <p className="bottom-quote">"A samurai finds peace in the stillness of the water."</p>
        </div>

      </div>
    </div>
  );
};

export default Fishingpx;