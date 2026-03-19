import React from "react";

export default function EventCard({event}){

return(

<div className="eventCard">

<img src={event.poster} className="poster" alt="event"/>

<div className="centerButton">

<a
href={event.link}
target="_blank"
rel="noopener noreferrer"
className="registerBtn"
>
REGISTER
</a>

</div>

</div>

);

}