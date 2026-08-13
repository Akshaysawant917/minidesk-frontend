export default function JobFormModal({
  show,
  editing,
  company,
  setCompany,
  role,
  setRole,
  location,
  setLocation,
  source,
  setSource,
  status,
  setStatus,
  notes,
  setNotes,
  salary,
  setSalary,
  applicationDate,
  setApplicationDate,
  interviewDate,
  setInterviewDate,
  error,
  saving,
  onSubmit,
  onCancel,
  onCloseBackdrop,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCloseBackdrop} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b1220] rounded-lg p-6 shadow-lg z-10">
        <h3 className="font-semibold text-primary mb-3">{editing ? "Edit Job" : "Add Job"}</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="p-3 border rounded" />
            <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="p-3 border rounded" />
            <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="p-3 border rounded" />
            <input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} className="p-3 border rounded" />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-3 border rounded">
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="offer_accepted">Offer Accepted</option>
              <option value="offer_rejected">Offer Rejected</option>
              <option value="rejected">Rejected</option>
            </select>
            <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="p-3 border rounded" />
            <div className="col-span-1">
              <label className="text-sm text-app/60 block mb-1">Application date <span className="text-xs text-app/40">(optional)</span></label>
              <input type="date" aria-label="Application date" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} className="w-full p-3 border rounded" />
            </div>

            <div className="col-span-1">
              <label className="text-sm text-app/60 block mb-1">Interview date <span className="text-xs text-app/40">(optional)</span></label>
              <input type="date" aria-label="Interview date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full p-3 border rounded" />
            </div>
          </div>

          <textarea placeholder="Notes (required)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 border rounded h-28" />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" disabled={saving || !company.trim() || !role.trim() || !location.trim() || !source.trim() || !status.trim() || !notes.trim()} className="bg-primary text-secondary px-4 py-2 rounded">{saving ? "Saving..." : editing ? "Update Job" : "Add Job"}</button>
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
