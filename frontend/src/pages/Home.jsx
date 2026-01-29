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
  //    <div className="container py-5">

  //   {/* Header */}
  //   <div className="text-center mb-5">
  //     <h2 className="fw-bold text-gradient display-4">AkashMeet</h2>
  //     <p className="text-secondary lead">Your personal hub for live video meetings</p>
  //   </div>

  //   {/* Buttons */}
  //   <div className="d-flex justify-content-center gap-4 mb-5">
  //     <button
  //       className={`btn btn-lg ${view === "list" ? "btn-gradient-primary" : "btn-outline-primary"}`}
  //       onClick={() => setView("list")}
  //     >
  //       Meetings
  //     </button>

  //     <button
  //       className={`btn btn-lg ${view === "create" ? "btn-gradient-success" : "btn-outline-success"}`}
  //       onClick={() => setView("create")}
  //     >
  //       Create Meeting
  //     </button>
  //   </div>

  //   {/* Meetings List */}
  //   {view === "list" && (
  //     <div className="row g-4">
  //       {meetings.map((m) => (
  //         <div className="col-md-4" key={m._id}>
  //           <div className="card shadow-lg h-100 rounded-4 meeting-card">
  //             <div className="card-header text-white bg-gradient-primary p-3 rounded-top">
  //               <h5 className="mb-0">{m.title}</h5>
  //             </div>
  //             <div className="card-body d-flex flex-column">
  //               <div className="d-flex justify-content-between align-items-center mb-3">
  //                 <p className="text-muted mb-0">
  //                   Host: <b>{m.hostName}</b>
  //                 </p>
  //                 <span className="badge bg-info text-dark">
  //                   {m.participants?.length || 0} Joined
  //                 </span>
  //               </div>
  //               <Link
  //                 to={`/join/${m.meetingId}`}
  //                 className="btn btn-gradient-primary mt-auto"
  //               >
  //                 Join Meeting
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       ))}

  //       {meetings.length === 0 && (
  //         <p className="text-center text-muted mt-4 fs-5">No meetings available</p>
  //       )}
  //     </div>
  //   )}

  //   {/* Create Meeting Form */}
  //   {view === "create" && (
  //     <div className="row justify-content-center">
  //       <div className="col-md-5">
  //         <div className="card shadow-lg rounded-4 create-card p-4">
  //           <h4 className="text-center mb-4 text-gradient-success">
  //             Create New Meeting
  //           </h4>
  //           <form onSubmit={createHandler}>
  //             <input
  //               className="form-control mb-3"
  //               placeholder="Meeting Title"
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //               required
  //             />
  //             <input
  //               className="form-control mb-4"
  //               placeholder="Host Name"
  //               value={hostName}
  //               onChange={(e) => setHostName(e.target.value)}
  //               required
  //             />
  //             <button className="btn btn-gradient-success w-100 py-2">
  //               Create & Join
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   )}

  //   {/* Custom Styles */}
  //   <style>
  //     {`
  //       /* Gradients for headings and buttons */
  //       .text-gradient {
  //         background: linear-gradient(90deg, #6a11cb, #2575fc);
  //         -webkit-background-clip: text;
  //         -webkit-text-fill-color: transparent;
  //       }
  //       .text-gradient-success {
  //         background: linear-gradient(90deg, #00b09b, #96c93d);
  //         -webkit-background-clip: text;
  //         -webkit-text-fill-color: transparent;
  //       }

  //       /* Card Styles */
  //       .meeting-card {
  //         transition: transform 0.3s, box-shadow 0.3s;
  //       }
  //       .meeting-card:hover {
  //         transform: translateY(-6px);
  //         box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  //       }
  //       .create-card {
  //         border: none;
  //         transition: transform 0.2s, box-shadow 0.2s;
  //       }
  //       .create-card:hover {
  //         transform: translateY(-4px);
  //         box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  //       }

  //       /* Button Gradients */
  //       .btn-gradient-primary {
  //         background: linear-gradient(45deg, #6a11cb, #2575fc);
  //         color: white;
  //         border: none;
  //         transition: transform 0.2s, opacity 0.2s;
  //       }
  //       .btn-gradient-primary:hover {
  //         transform: scale(1.05);
  //         opacity: 0.9;
  //       }
  //       .btn-gradient-success {
  //         background: linear-gradient(45deg, #00b09b, #96c93d);
  //         color: white;
  //         border: none;
  //         transition: transform 0.2s, opacity 0.2s;
  //       }
  //       .btn-gradient-success:hover {
  //         transform: scale(1.05);
  //         opacity: 0.9;
  //       }

  //       /* Card Headers */
  //       .bg-gradient-primary {
  //         background: linear-gradient(45deg, #6a11cb, #2575fc);
  //       }

  //       /* Badge */
  //       .badge {
  //         font-weight: 500;
  //       }
  //     `}
  //   </style>
  // </div>
  // );
  <div className="container py-5">

    {/* Header */}
    <div className="text-center mb-5">
      <h2 className="fw-bold text-gradient display-3">AkashMeet</h2>
      <p className="text-secondary fs-5">Your personal hub for live video meetings</p>
    </div>

    {/* Buttons */}
    <div className="d-flex justify-content-center gap-4 mb-5">
      <button
        className={`btn btn-lg ${view === "list" ? "btn-glow-primary" : "btn-outline-primary"}`}
        onClick={() => setView("list")}
      >
        Meetings
      </button>

      <button
        className={`btn btn-lg ${view === "create" ? "btn-glow-success" : "btn-outline-success"}`}
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
            <div className="card shadow-lg h-100 rounded-5 meeting-card">
              <div className="card-header text-white bg-gradient-primary p-3 rounded-top">
                <h5 className="mb-0">{m.title}</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="text-muted mb-0">
                    Host: <b>{m.hostName}</b>
                  </p>
                  <span className="badge bg-gradient-badge">
                    {m.participants?.length || 0} Joined
                  </span>
                </div>
                <Link
                  to={`/join/${m.meetingId}`}
                  className="btn btn-glow-primary mt-auto"
                >
                  Join Meeting
                </Link>
              </div>
            </div>
          </div>
        ))}

        {meetings.length === 0 && (
          <p className="text-center text-muted mt-4 fs-5">No meetings available</p>
        )}
      </div>
    )}

    {/* Create Meeting Form */}
    {view === "create" && (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg rounded-5 create-card p-5">
            <h4 className="text-center mb-4 text-gradient-success">
              Create New Meeting
            </h4>
            <form onSubmit={createHandler}>
              <input
                className="form-control mb-3 form-glow"
                placeholder="Meeting Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="form-control mb-4 form-glow"
                placeholder="Host Name"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                required
              />
              <button className="btn btn-glow-success w-100 py-2">
                Create & Join
              </button>
            </form>
          </div>
        </div>
      </div>
    )}

    {/* Custom Styles */}
    <style>
      {`
        /* Gradient headings */
        .text-gradient {
          background: linear-gradient(90deg, #ff6ec4, #7873f5, #42e695);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-success {
          background: linear-gradient(90deg, #00c6ff, #0072ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Buttons with glow */
        .btn-glow-primary {
          background: linear-gradient(45deg, #ff6ec4, #7873f5);
          color: white;
          border: none;
          box-shadow: 0 0 15px rgba(255, 110, 196, 0.6);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-glow-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(255, 110, 196, 0.8);
        }

        .btn-glow-success {
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          color: white;
          border: none;
          box-shadow: 0 0 15px rgba(0,198,255,0.6);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-glow-success:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(0,198,255,0.8);
        }

        /* Input glow */
        .form-glow {
          border-radius: 10px;
          border: none;
          box-shadow: 0 0 10px rgba(128, 128, 128, 0.1);
          transition: box-shadow 0.3s;
        }
        .form-glow:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(100, 149, 237, 0.8);
        }

        /* Card styles */
        .meeting-card {
          border: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .meeting-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .create-card {
          border: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .create-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        /* Card header gradient */
        .bg-gradient-primary {
          background: linear-gradient(45deg, #ff6ec4, #7873f5);
        }

        /* Badge */
        .bg-gradient-badge {
          background: linear-gradient(45deg, #f5af19, #f12711);
          color: white;
          font-weight: 500;
          padding: 0.4em 0.7em;
          border-radius: 10px;
        }
      `}
    </style>
  </div>
);

};

export default Home;
