import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import WaterWave from "react-water-wave";


import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

import Time2 from "./Time2";
import Fishing from "./Fishingpx";

import Cherry from "./CherryBlossam";
import { ScrollParallax } from "react-just-parallax";

import koibg from "../assets/koibg.png";
import koibg2 from "../assets/koibg2.png";

import trans from "../assets/trans.png";

import "./Timeline.css";

export default function TimelinePage() {

  const contentRef = useRef(null);
  const washRef = useRef(null);


  return (
    <div className="timeline-wrapper">
    
      <div 
        className="koi-background" 
        style={{ 
          backgroundImage: `url(${koibg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2
        }} 
      />
      
   
      <WaterWave
  imageUrl={koibg2}
  dropRadius={10}       
        perturbance={0.005}   
        resolution={256}   
        interactive={true}   
      >
        {(methods) => (
          <div className="timeline-page" style={{ position: 'relative' }}>
            <div ref={washRef} className="screen-wash" />
            <Cherry  />
            
            <section className="parallax-section">
              <Fishing />
              
            </section>
            
            <section className="timeline-scroll">
              <div className="timeline-sticky">
                <ScrollParallax strength={-0.2}>
                  <h1 className="timeline-mask-text"></h1>
                </ScrollParallax>
              </div>
            </section>

            <section ref={contentRef} className="timeline-content">
              <Time2 />
            </section>
          </div>
        )}
      </WaterWave>
    </div>
  );
}