import { useState } from "react";
import { createMeeting } from "../api/meetingApi";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  const [title, setTitle] = useState("");
  const [hostName, setHostName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await createMeeting({ title, hostName });
    alert("Meeting Created");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h3>Create Meeting</h3>

      <form onSubmit={submitHandler} className="col-md-4">
        <input
          className="form-control mb-2"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Host Name"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateMeeting;
