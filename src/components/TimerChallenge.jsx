
/*
  Notes on `useRef` vs. `useState`:
  -----------------------------------------------------------------------------------------------------
  Feature             | useRef                                      | useState
  --------------------|---------------------------------------------|------------------------------------
  Value Persistence   | Persists across re-renders                  | Persists across re-renders
  --------------------|---------------------------------------------|------------------------------------
  Triggers Re-render  | No, changes to `ref.current` don’t trigger  | Yes, calling `setState` triggers
                      | a re-render                                 | a re-render
  --------------------|---------------------------------------------|------------------------------------
  Use Case            | Storing mutable values or DOM references    | Managing state that affects UI
  --------------------|---------------------------------------------|------------------------------------

  - `useRef`: Best for keeping track of mutable values like timers or DOM nodes that don’t affect the UI directly.
  - `useState`: Used when the value needs to trigger a re-render to reflect changes in the UI.
*/

/*
  Timer Functionality:
  - A `setInterval` is used to decrement the timer every 10 milliseconds. This allows for precise control over the countdown.
  - `clearInterval`: This stops the active interval. It's important to store the interval ID (via `useRef`) so we can reference and clear it when necessary.

  Key Challenges:
  1. Ensuring the timer doesn’t start multiple intervals when `handleStart` is called repeatedly.
  2. Stopping the timer (`handleStop`) reliably, even if the function is called when no timer is active.
  3. Resetting the timer (`handleReset`) to its original state and ensuring all associated states (e.g., `timeRemaining`) are updated correctly.

  Notes on Behavior:
  - The `timeRemaining` value is updated using `setState`. Since React re-renders the UI whenever state changes, this ensures the countdown is visible to the user.
  - The `timerIsActive` variable determines whether the timer is running. It is derived from `timeRemaining` and ensures we don't accidentally start a new interval when one is already active.

  Removed Code Notes:
  - Previously, a `let timer` variable was declared outside the component function. This approach is not ideal in React because it creates a shared variable across all component instances, which can lead to unexpected behavior.
  - Now, `useRef` is used to store the timer, which provides a separate reference for each component instance while persisting across renders.

  ResultModal Interaction:
  - When the timer reaches zero or is stopped manually, the `ResultModal` is displayed by calling its `open` method (via `useRef` and `useImperativeHandle`).
*/
import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        const newTimeRemaining = prevTimeRemaining - 10;
        if (newTimeRemaining <= 0) {
          clearInterval(timer.current);
          dialog.current.open();
          return 0;
        }
        return newTimeRemaining;
      });
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}