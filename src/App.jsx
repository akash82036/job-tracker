import { useEffect, useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import ConfirmModal from "./components/ConfirmModal";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [confirmType, setConfirmType] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const toSmartTitleCase = (text) => {
    return text
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => {
        if (word === word.toUpperCase() || /\d/.test(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const addJob = ({ company, role }) => {
    const newJob = {
      id: Date.now(),
      company: toSmartTitleCase(company),
      role: toSmartTitleCase(role),
      status: "Applied",
      dateApplied: new Date().toISOString(),
    };

    setJobs((prev) => [...prev, newJob]);
  };

  const requestDelete = (id) => {
    setSelectedId(id);
    setConfirmType("single");
  };

  const requestClearAll = () => {
    setConfirmType("all");
  };

  const handleConfirm = () => {
    if (confirmType === "single") {
      setJobs((prev) => prev.filter((job) => job.id !== selectedId));
    }

    if (confirmType === "all") {
      setJobs([]);
    }

    setConfirmType(null);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setConfirmType(null);
    setSelectedId(null);
  };

  const updateStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );
  };

  const updateDate = (id, date) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, dateApplied: date } : job
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  const sortedJobs = [...filteredJobs].sort((a, b) =>
    sortOrder === "latest"
      ? new Date(b.dateApplied) - new Date(a.dateApplied)
      : new Date(a.dateApplied) - new Date(b.dateApplied)
  );

  return (
    <div className="app-container">
      <h1>Job Tracker</h1>

      <JobForm onAddJob={addJob} />

      {jobs.length > 0 && (
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onClearAll={requestClearAll}
        />
      )}

      <JobList
        jobs={sortedJobs}
        onDelete={requestDelete}
        onStatusChange={updateStatus}
        onDateChange={updateDate}
      />

      <ConfirmModal
        open={!!confirmType}
        title="Confirm Deletion"
        message={
          confirmType === "all"
            ? "Are you sure you want to delete all job applications? This cannot be undone."
            : "Are you sure you want to delete this job application?"
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );

}

export default App;
