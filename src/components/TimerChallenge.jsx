import { useState } from "react";
export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    //setTimeout is a default jS feature
    //setTimeout works in milliseconds but we are dealing with seconds, that's why we multiply with 1000

    //if the above function runs, time is expired hence the player lost
    setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);
    setTimerStarted(true);
  }
  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>

      <p>
        <button onClick={handleStart}>
          {" "}
          {timerStarted ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? 'Time is running' : 'Timer Stopped'}
      </p>
    </section>
  );
}
