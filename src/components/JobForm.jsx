import { useState } from "react";

function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !role) return;

    onAddJob({ company, role });
    setCompany("");
    setRole("");

    document.activeElement.blur();
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button>Add Job</button>
    </form>
  );
}

export default JobForm;
