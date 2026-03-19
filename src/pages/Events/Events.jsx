import React, { useState } from "react";
import "./Events.css";
import events from "./eventsData";
import EventCard from "./components/EventCard";

export default function Events(){

const [index, setIndex] = useState(0);
const [selectedEvent, setSelectedEvent] = useState(null);

let startX = 0;

const orientations = [
  { x: -15, y: 0 },    
  { x: -15, y: -90 },  
  { x: -15, y: -180 }, 
  { x: -15, y: -270 }, 
  { x: -105, y: 0 },   
  { x: 75, y: 0 }      
];

const nextFace = () => {
  setIndex((prev) => (prev + 1) % orientations.length);
};

// 👉 swipe ke liye bhi same function use karo
const rotateCube = () => {
  nextFace();
};

const handleMouseDown = (e)=>{
  startX = e.clientX;
};

const handleMouseUp = (e)=>{
  let diff = e.clientX - startX;

  if(Math.abs(diff) > 40){
    rotateCube();
  }
};

const handleTouchStart = (e)=>{
  startX = e.touches[0].clientX;
};

const handleTouchEnd = (e)=>{
  let diff = e.changedTouches[0].clientX - startX;

  if(Math.abs(diff) > 40){
    rotateCube();
  }
};

return(

<div className="eventsPage">

  <div className="eventsCenter">   {/* table alignment */}
    <div className="cubeContainer">

      <div
        className="cube"
        style={{
          transform: `
            translateY(-30px)
            rotateX(${orientations[index].x}deg)
            rotateY(${orientations[index].y}deg)
          `
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
  e.stopPropagation();

  if(event.type === "speaker"){
    setSelectedEvent(event);  // open modal
  } else {
    nextFace(); // normal cube rotate
  }
}}
      >

        {events.map((event,i)=>(
          <div className={`face face${i}`} key={event.id}>
            <EventCard event={event}/>
          </div>
        ))}

      </div>

    </div>
  </div>

</div>

);
}