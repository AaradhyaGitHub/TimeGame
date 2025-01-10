import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";
// let timer;
// this is not the React-way
// timer is declared outside the component function. Therefore, it's a variable shared across all component instances
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialogue = useRef();
  {
    /* 
    ____________________________________________________________________________________________________________________________
    Feature	             |       useRef	                                      |      useState                                  |
    ---------------------|----------------------------------------------------|------------------------------------------------|
    Value Persistence	 |       Persists across re-renders	                  |      Persists across re-renders                |
    ---------------------|----------------------------------------------------|------------------------------------------------|                                                  |
    Triggers Re-render	 |       No, changes to ref.current don’t re-render	  |      Yes, calling setState triggers a re-render|
    ---------------------|----------------------------------------------------|------------------------------------------------|
    Use Case	         |       Storing mutable values or DOM references	  |      Managing state that affects UI            |
    ----------------------------------------------------------------------------------------------------------------------------
    */
  }

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    //setTimeout is a default jS feature
    //setTimeout works in milliseconds but we are dealing with seconds, that's why we multiply with 1000

    //if the above function runs, time is expired hence the player lost
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialogue.current.showModal()
    }, targetTime * 1000);
    setTimerStarted(true);
  }

  function handleStop() {
    // the challenge here is, how do we stop the timer above with this function?
    // we can use clearTimeout();
    // clearTimeout takes a pointer to the timer which we are trying to terminate
    // luckily, setTimeout can be stored in a variable
    clearTimeout(timer.current);
  }

  return (
    <>
     <ResultModal ref={dialogue}taretTime={targetTime} result="lost"/>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>

        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer Stopped"}
        </p>
      </section>
    </>
  );
}
