export default function TimerChallenge({ title, targetTime }) {
  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>

      <p>
        <button>Start Challenge Stop Challenge</button>
      </p>
      <p className="">Time is running OR Timer Inactive</p>
    </section>
  );
}
