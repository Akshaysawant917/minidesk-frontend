export default function JobTable({ jobs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-app/60">
            <th className="p-3 border-b">Company</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Source</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Applied</th>
            <th className="p-3 border-b">Interview</th>
            <th className="p-3 border-b">Salary</th>
            <th className="p-3 border-b">Notes</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="align-top border-b">
              <td className="p-3 align-top">{job.company}</td>
              <td className="p-3 align-top">{job.role}</td>
              <td className="p-3 align-top">{job.location}</td>
              <td className="p-3 align-top">{job.source}</td>
              <td className="p-3 align-top">{job.status}</td>
              <td className="p-3 align-top">{job.applicationDate ? new Date(job.applicationDate).toLocaleDateString() : "-"}</td>
              <td className="p-3 align-top">{job.interviewDate ? new Date(job.interviewDate).toLocaleDateString() : "-"}</td>
              <td className="p-3 align-top">{job.salary || "-"}</td>
              <td className="p-3 align-top">{job.notes}</td>
              <td className="p-3 align-top">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(job)} className="px-2 py-1 border rounded text-sm">Edit</button>
                  <button onClick={() => onDelete(job.id)} className="px-2 py-1 border rounded text-sm text-red-500">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
