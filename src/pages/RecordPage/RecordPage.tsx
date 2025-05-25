import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    // ดึง user จาก localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username);
    }

    // ดึงฟอร์มที่เคยกรอกจาก localStorage
    const storedRecords = localStorage.getItem("trackerRecords");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

  const handleStartTracking = () => {
    navigate("/tracker");
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
        <div className="row justify-content-center gap-4">
          {records.length === 0 ? (
            <p className="text-muted dynapuff text-center">
              No records yet.Start recording your day 💗
            </p>
          ) : (
            records.map((rec, index) => (
              <div
                key={index}
                className="p-3 rounded shadow-sm"
                style={{
                  backgroundColor: "#ffe6ee",
                  maxWidth: "220px",
                  fontFamily: "DynaPuff",
                }}
              >
                <h5 className="fw-bold mb-1">{rec.date}</h5>
                <p className="mb-1">
                  {rec.mood === "Excellent" && "😄 Awesome!"}
                  {rec.mood === "Good" && "🙂 Good!"}
                  {rec.mood === "SoSo" && "😐 So-so"}
                  {rec.mood === "Bad" && "😕 Not great"}
                  {rec.mood === "VeryBad" && "😖 Rough day"}
                </p>
                <p className="mb-1">⏰ {rec.wakeUpTime}</p>
                <p className="mb-1">💤 {rec.sleepHour} Hr.</p>
                <p className="mb-1">
                  📝 To-do:
                  <br />
                  {rec.todo.filter((t) => t.checked).length} of {rec.todo.length} done
                </p>
                <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Note: {rec.note}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordPage;
