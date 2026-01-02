import { useState } from "react";

function JobItem({ job, onDelete, onStatusChange, onDateChange }) {
  const [editingDate, setEditingDate] = useState(false);

  const statusClass = job.status.toLowerCase();

  const cycleStatus = () => {
    const order = ["Applied", "Interview", "Rejected"];
    const next =
      order[(order.indexOf(job.status) + 1) % order.length];
    onStatusChange(job.id, next);
  };

  return (
    <li className="job-card">
      <div className="job-left">
        <h3>{job.company}</h3>
        <p>
          {job.role} •{" "}
          {editingDate ? (
            <input
              type="date"
              value={job.dateApplied.slice(0, 10)}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                onDateChange(job.id, e.target.value);
                setEditingDate(false);
              }}
              onBlur={() => setEditingDate(false)}
            />
          ) : (
            <span
              className="job-date"
              title="Click to edit date"
              onClick={() => setEditingDate(true)}
            >
              {new Date(job.dateApplied).toLocaleDateString()}
            </span>
          )}
        </p>
      </div>

      <div className="job-right">
        <span
          className={`status-badge ${statusClass}`}
          onClick={cycleStatus}
          title="Click to change status"
        >
          {job.status}
        </span>

        <button onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </li>
  );
}

export default JobItem;
