import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './RecordPage.css'
interface TrackerData {
  date: string;
  mood: string;
  note: string;
  wakeUpTime: string;
  sleepHour: number;
  todo: { text: string; checked: boolean }[];
}

function RecordPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("friend");
  const [records, setRecords] = useState<TrackerData[]>([]);
  const [showTodos, setShowTodos] = useState<boolean[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username);
      const key = `trackerRecords_${parsed.username}`;
      const storedRecords = localStorage.getItem(key);
      if (storedRecords) {
        const parsedRecords = JSON.parse(storedRecords);
        setRecords(parsedRecords);
        setShowTodos(new Array(parsedRecords.length).fill(false));
      }
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
    localStorage.setItem(`trackerRecords_${username}`, JSON.stringify(updated));

    const updatedShowTodos = [...showTodos];
    updatedShowTodos.splice(index, 1);
    setShowTodos(updatedShowTodos);
  };

  const toggleTodos = (index: number) => {
    const updated = [...showTodos];
    updated[index] = !updated[index];
    setShowTodos(updated);
  };

  const handleStartTracking = () => {
    navigate("/tracker");
  };

  const formatDate = (raw: string) => {
    const date = new Date(raw);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-start p-4">
      <h1 className="lily-script-one-regular mb-4" style={{ color: "#E83389" }}>
        🧸Daily Tracker｡:*
      </h1>
      <div className="gradient-line mb-4">&nbsp;</div>

      <h3 className="dynapuff text-center mb-3">Record your day</h3>

      <button
        className="btn btn-pink px-4 py-2 mb-4 dynapuff"
        onClick={handleStartTracking}
      >
        here
      </button>

      <div className="container">
        <div className="d-flex flex-wrap justify-content-center align-items-start gap-4">

          {records.length === 0 ? (
            <p className="text-muted dynapuff text-center">
              No records yet. Start recording your day 💗
            </p>
          ) : (
            records
             .slice()
             .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((rec, index) => (
              <div
                key={index}
                className="p-3 rounded shadow-sm position-relative w-auto"
                style={{
                  backgroundColor: "#ffe6ee",
                  maxWidth: "300px",
                  fontFamily: "DynaPuff",
                }}
              >
                <div>
                  <img
                    src="/delete.png"
                    alt="delete"
                    onClick={() => handleDelete(index)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />

                  <h5 className="fw-bold mb-1 lily-script-one-regular">{formatDate(rec.date)}</h5>
                </div>
                <p className="mb-1">
                  {rec.mood === "Excellent" && "😄 Awesome!"}
                  {rec.mood === "Good" && "🙂 Good!"}
                  {rec.mood === "SoSo" && "😐  OK"}
                  {rec.mood === "Bad" && "😕 Not great"}
                  {rec.mood === "VeryBad" && "😖 Rough day"}
                </p>
                <p className="mb-1">⏰ {rec.wakeUpTime}</p>
                <p className="mb-1">💤 {rec.sleepHour} Hr.</p>
                <p className="mb-1">
                  📝 To-do:&nbsp;
                  {rec.todo.filter((t) => t.checked).length} of{" "}
                  {rec.todo.length} done
                </p>

                <button
                  className="btn-underline-animated mt-2 mb-2"
                  onClick={() => toggleTodos(index)}
                >
                  {showTodos[index] ? "▼ Hide To-dos" : "► Show To-dos"}
                </button>

                {showTodos[index] && (
                  <ul className="ps-3" style={{ fontSize: "0.9rem" }}>
                    {rec.todo.map((item, i) => (
                      <li key={i}>
                        {item.checked ? "✅" : "❌"} {item.text}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Note: {rec.note}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-5">
        <button
          className="btn dynapuff btn-back-to-login"

          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default RecordPage;
