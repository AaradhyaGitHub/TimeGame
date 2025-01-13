/*
  `ResultModal` Component:
  - This component displays the result of the timer challenge, showing whether the user lost or stopped the timer early.
  - The modal uses a `ref` to control its visibility programmatically.

  React Refs and `useImperativeHandle`:
  - Refs in React provide a way to directly access a DOM element or component instance.
  - `useImperativeHandle`: This hook customizes the instance value exposed by the `ref`. In this case, it provides an `open` method to show the modal and a `close` method to hide it.

  Styling and Visibility:
  - The modal’s visibility is managed using inline styles (`display: "none"` to hide and `"block"` to show). This could be enhanced later by integrating animations or CSS classes.

  Key Features:
  1. `open` method: Makes the modal visible by setting `display: "block"`.
  2. `close` method: Hides the modal by setting `display: "none"`.
  3. The modal displays different content based on whether the user lost (timer reached zero) or stopped the timer early.

  Removed Code Notes:
  - Previously, the `dialog.current.showModal()` method was used but commented out. This was likely intended for a `<dialog>` HTML element. Since we’re not using a `<dialog>` element here, custom logic for visibility control is implemented using styles instead.

  Remaining Time Formatting:
  - The remaining time (`remainingTime`) is formatted to two decimal places for display, ensuring clarity in seconds.

  Button Behavior:
  - The "Close" button hides the modal and triggers the `onReset` handler passed from the parent component. This ensures that the timer can be reset when the modal is dismissed.
*/

import React, { useImperativeHandle, useRef, forwardRef } from "react";

const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime*1000)) * 100);

    useImperativeHandle(ref, () => ({
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    }));

    return (
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You lost</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    );
  }
);

ResultModal.displayName = "ResultModal";

export default ResultModal;
