import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { socket, joinMeetingSocket } from "../api/meetingApi";

const JoinMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [joinedUsers, setJoinedUsers] = useState([]);

  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);

  const localVideoRef = useRef(null);

  // ================= SOCKET LISTENERS =================
  useEffect(() => {
    const handleJoin = ({ name }) => {
      setJoinedUsers((prev) =>
        prev.includes(name) ? prev : [...prev, name]
      );
    };

    const handleLeave = ({ name }) => {
      setJoinedUsers((prev) => prev.filter((u) => u !== name));
    };

    socket.on("participant_joined", handleJoin);
    socket.on("participant_left", handleLeave);

    return () => {
      socket.off("participant_joined", handleJoin);
      socket.off("participant_left", handleLeave);
    };
  }, []);

  // ================= JOIN =================
  const joinHandler = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    joinMeetingSocket(id, name);
    setName("");
  };

//   // ================= START MEDIA =================
// const startMedia = async () => {
//   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     alert(
//       "Camera/Mic not supported on this browser.\nUse HTTPS or open from laptop."
//     );
//     console.error("mediaDevices not available", navigator);
//     return;
//   }

//   try {
//     const mediaStream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     });

//     localVideoRef.current.srcObject = mediaStream;
//     setStream(mediaStream);
//     setMicOn(true);
//     setCamOn(true);

//     console.log("Media started successfully");
//   } catch (err) {
//     console.error("Media error:", err);
//     alert("Permission denied or device busy");
//   }
// };
const startMedia = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert(
      "Camera/Mic not supported on this browser.\nUse HTTPS or open from laptop."
    );
    console.error("mediaDevices not available", navigator);
    return;
  }

  try {
    // Request camera & mic with optional constraints
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, facingMode: "user" },
      audio: true
    });

    // Check if video ref is valid
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current.muted = true; // mute self to avoid echo
      localVideoRef.current.play(); // ensure video starts
    }

    setStream(mediaStream);
    setMicOn(true);
    setCamOn(true);

    console.log("Media started successfully ✅");
  } catch (err) {
    console.error("Media error:", err);
    alert(
      "Cannot access camera/mic. Check permissions or device busy.\n" +
      "Also make sure you opened the app via HTTPS on phone."
    );
  }
};


// ================= MIC TOGGLE =================
const toggleMic = () => {
  if (!stream) return;

  stream.getAudioTracks().forEach((track, i) => {
    track.enabled = !micOn;
    console.log(
      `Mic track ${i} toggled: enabled=${track.enabled}, readyState=${track.readyState}`
    );
  });

  setMicOn(!micOn);
};

// ================= CAMERA TOGGLE =================
const toggleCamera = () => {
  if (!stream) return;

  stream.getVideoTracks().forEach((track, i) => {
    track.enabled = !camOn;
    console.log(
      `Camera track ${i} toggled: enabled=${track.enabled}, readyState=${track.readyState}`
    );
  });

  setCamOn(!camOn);
};


  // ================= LEAVE =================
  const leaveMeeting = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    socket.disconnect();
    navigate("/");
  };

  // ================= UI =================
  return (
    <div className="container mt-4">
      <h3 className="mb-3">Meeting Room</h3>

      {/* JOIN FORM */}
      <form className="col-md-4" onSubmit={joinHandler}>
        <input
          className="form-control mb-2"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-success w-100">
          Join Meeting
        </button>
      </form>

      {/* VIDEO AREA */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h6>You</h6>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-100 rounded border"
            style={{ minHeight: "250px", background: "#000" }}
          />
        </div>

        <div className="col-md-6">
          <h6>Participants</h6>
          <ul className="list-group">
            {joinedUsers.map((u, i) => (
              <li key={i} className="list-group-item">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CONTROL BAR (ZOOM STYLE) */}
      <div className="mt-4 d-flex justify-content-center gap-3">
        <button
          className={`btn ${micOn ? "btn-primary" : "btn-outline-primary"}`}
          onClick={toggleMic}
        >
          {micOn ? "🎤 Mic On" : "🔇 Mic Off"}
        </button>

        <button
          className={`btn ${camOn ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={toggleCamera}
        >
          {camOn ? "📷 Camera On" : "📷 Camera Off"}
        </button>

        <button
          className="btn btn-warning"
          onClick={startMedia}
        >
          ▶ Start Media
        </button>

        <button
          className="btn btn-danger"
          onClick={leaveMeeting}
        >
          ⛔ Leave
        </button>
      </div>
    </div>
  );
};

export default JoinMeeting;
