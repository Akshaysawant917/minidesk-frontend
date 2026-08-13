export default function JobCardList({ jobs, onEdit, onDelete }) {
  return (
    <>
      {jobs.map((job) => (
        <div key={job.id} className="bg-app border rounded-xl p-4 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold">{job.company}</h4>
              <div className="text-sm text-app/50">{job.role}</div>
            </div>
            <div className="text-sm text-app/60 mt-1">{job.location} • {job.source}</div>
            <div className="text-sm text-app/70 mt-2">{job.notes}</div>
            {job.applicationDate && <div className="text-xs text-app/50 mt-2">Applied: {new Date(job.applicationDate).toLocaleDateString()}</div>}
            {job.interviewDate && <div className="text-xs text-app/50">Interview: {new Date(job.interviewDate).toLocaleDateString()}</div>}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-sm text-app/50">{job.status}</div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(job)} className="px-3 py-1 border rounded text-sm">Edit</button>
              <button onClick={() => onDelete(job.id)} className="px-3 py-1 border rounded text-sm text-red-500">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
