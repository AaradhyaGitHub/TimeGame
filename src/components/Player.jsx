import { useState, useRef } from "react";
//useRef is a hook as well 
export default function Player() {
  const playerName = useRef();
  //playerName will always be a jS object 
  //it will always have a current and only a current property 
  
  const [enteredPlayerName, setEnteredPlayerName] = useState("");

  function handleClick() {
    //inside the current property, the actual ref value will be stored
    setEnteredPlayerName(playerName.current.value) ;
    
    playerName.current.value=''; 
    //this is anti React a little bit as it's imprerative coding style 
    //for small changes like clearing inputs, it's fine 
    //don't use refs to read and manipulate data all over 
    //it's a good alternative for useState for smaller tasks 
  }

  return (
    <section id="player">
      <h2>
        Welcome {enteredPlayerName ?? "unknown entity"}
      </h2>
      <p>
        <input ref={playerName}type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
