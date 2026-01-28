import { useEffect, useState } from "react";
import { getMeetings, createMeeting } from "../api/meetingApi";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [meetings, setMeetings] = useState([]);
  const [view, setView] = useState("list");
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (view === "list") {
      getMeetings()
        .then((res) => setMeetings(res.data))
        .catch((err) => console.log(err));
    }
  }, [view]);

  const createHandler = async (e) => {
    e.preventDefault();
    const res = await createMeeting({ title, hostName });
    navigate(`/join/${res.data.data.meetingId}`);
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Zoom-Style Meetings</h2>
        <p className="text-muted">Create or join live meetings instantly</p>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn btn-lg ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("list")}
        >
          Meetings
        </button>

        <button
          className={`btn btn-lg ${view === "create" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setView("create")}
        >
          Create Meeting
        </button>
      </div>

      {/* Meetings List */}
      {view === "list" && (
        <div className="row g-4">
          {meetings.map((m) => (
            <div className="col-md-4" key={m._id}>
              <div className="card shadow-sm h-100 zoom-card">
                <div className="card-header text-white bg-gradient p-2">
                  <h5 className="mb-0">{m.title}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="text-muted mb-0">
                      Host: <b>{m.hostName}</b>
                    </p>
                    <span className="badge bg-info text-dark">
                      {m.participants?.length || 0} Joined
                    </span>
                  </div>
                  <Link
                    to={`/join/${m.meetingId}`}
                    className="btn btn-gradient mt-auto"
                  >
                    Join Meeting
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {meetings.length === 0 && (
            <p className="text-center text-muted mt-3">No meetings available</p>
          )}
        </div>
      )}

      {/* Create Meeting Form */}
      {view === "create" && (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="text-center mb-3 text-success">
                  Create New Meeting
                </h4>

                <form onSubmit={createHandler}>
                  <input
                    className="form-control mb-3"
                    placeholder="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <input
                    className="form-control mb-3"
                    placeholder="Host Name"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    required
                  />

                  <button className="btn btn-success w-100 gradient-btn">
                    Create & Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .zoom-card {
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .zoom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
          .bg-gradient {
            background: linear-gradient(45deg, #6a11cb, #2575fc);
          }
          .btn-gradient {
            background: linear-gradient(45deg, #6a11cb, #2575fc);
            color: white;
            border: none;
            transition: transform 0.2s;
          }
          .btn-gradient:hover {
            transform: scale(1.05);
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
