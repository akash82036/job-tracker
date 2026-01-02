import JobItem from "./JobItem";

function JobList({ jobs, onDelete, onStatusChange, onDateChange }) {
  if (jobs.length === 0) {
    return (
      <p className="empty-state">
        No applications yet. Start tracking your job hunt.
      </p>
    );
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onDateChange={onDateChange}
        />
      ))}
    </ul>
  );
}

export default JobList;


