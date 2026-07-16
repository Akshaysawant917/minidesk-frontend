"use client";

import { useEffect, useState } from "react";
import { createJob, getJobs, updateJob, deleteJob } from "@/api/jobs.api";
import Nav from '@/components/home/Nav';
import Footer from '@/components/home/Footer';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // form
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("applied");
  const [notes, setNotes] = useState("");
  const [salary, setSalary] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [interviewDate, setInterviewDate] = useState("");

  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'

  const loadJobs = async () => {
    try {
      const data = await getJobs({ limit: 10 });
      setJobs(data.items || []);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (e) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await getJobs({ limit: 10, cursor });
      setJobs((p) => [...p, ...(data.items || [])]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load more jobs");
    } finally {
      setLoadingMore(false);
    }
  };

  const resetForm = () => {
    setCompany("");
    setRole("");
    setLocation("");
    setSource("");
    setStatus("applied");
    setNotes("");
    setSalary("");
    setApplicationDate("");
    setInterviewDate("");
    setEditing(null);
    setError("");
    setShowModal(false);
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!company.trim() || !role.trim() || !location.trim() || !source.trim() || !status.trim() || !notes.trim()) return;

    setSaving(true);
    try {
      const job = await createJob({ company, role, location, source, status, notes, salary, applicationDate: applicationDate || null, interviewDate: interviewDate || null });
      setJobs((p) => [job, ...p]);
      resetForm();
    } catch {
      setError("Failed to create job");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (job) => {
    setEditing(job);
    setCompany(job.company || "");
    setRole(job.role || "");
    setLocation(job.location || "");
    setSource(job.source || "");
    setStatus(job.status || "applied");
    setNotes(job.notes || "");
    setSalary(job.salary || "");
    setApplicationDate(job.applicationDate ? job.applicationDate.slice(0,10) : "");
    setInterviewDate(job.interviewDate ? job.interviewDate.slice(0,10) : "");
    setShowModal(true);
  };

  const handleUpdate = async (id) => {
    if (!company.trim() || !role.trim() || !location.trim() || !source.trim() || !status.trim() || !notes.trim()) return;
    setSaving(true);
    try {
      const updated = await updateJob(id, { company, role, location, source, status, notes, salary, applicationDate: applicationDate || null, interviewDate: interviewDate || null });
      setJobs((p) => p.map((j) => (j.id === id ? updated : j)));
      resetForm();
    } catch {
      setError("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job? This can't be undone.")) return;

    try {
      await deleteJob(id);
      setJobs((p) => p.filter((j) => j.id !== id));
    } catch {
      setError("Failed to delete job");
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">Loading jobs...</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Jobs</h2>
          <p className="text-app/60">Track your job applications</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <button onClick={() => { resetForm(); setShowModal(true); }} className="bg-primary text-secondary px-4 py-2 rounded">Add Job</button>
        </div>
      </div>

      {/* Modal (create/edit) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b1220] rounded-lg p-6 shadow-lg z-10">
            <h3 className="font-semibold text-primary mb-3">{editing ? 'Edit Job' : 'Add Job'}</h3>
            <form onSubmit={editing ? (e) => { e.preventDefault(); handleUpdate(editing.id); } : handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)} className="p-3 border rounded" />
                <input placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} className="p-3 border rounded" />
                <input placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} className="p-3 border rounded" />
                <input placeholder="Source" value={source} onChange={(e)=>setSource(e.target.value)} className="p-3 border rounded" />
                <select value={status} onChange={(e)=>setStatus(e.target.value)} className="p-3 border rounded">
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="offer_accepted">Offer Accepted</option>
                  <option value="offer_rejected">Offer Rejected</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input placeholder="Salary" value={salary} onChange={(e)=>setSalary(e.target.value)} className="p-3 border rounded" />
                <div className="col-span-1">
                  <label className="text-sm text-app/60 block mb-1">Application date <span className="text-xs text-app/40">(optional)</span></label>
                  <input type="date" aria-label="Application date" value={applicationDate} onChange={(e)=>setApplicationDate(e.target.value)} className="w-full p-3 border rounded" />
                </div>

                <div className="col-span-1">
                  <label className="text-sm text-app/60 block mb-1">Interview date <span className="text-xs text-app/40">(optional)</span></label>
                  <input type="date" aria-label="Interview date" value={interviewDate} onChange={(e)=>setInterviewDate(e.target.value)} className="w-full p-3 border rounded" />
                </div>
              </div>

              <textarea placeholder="Notes (required)" value={notes} onChange={(e)=>setNotes(e.target.value)} className="w-full p-3 border rounded h-28" />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-3">
                <button type="submit" disabled={saving || !company.trim() || !role.trim() || !location.trim() || !source.trim() || !status.trim() || !notes.trim()} className="bg-primary text-secondary px-4 py-2 rounded">{saving ? 'Saving...' : editing ? 'Update Job' : 'Add Job'}</button>
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded border">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-app/60">Showing {jobs.length} jobs</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('table')} className={`px-3 py-1 rounded ${viewMode==='table' ? 'bg-primary text-secondary' : 'border'}`}>Table</button>
            <button onClick={() => setViewMode('cards')} className={`px-3 py-1 rounded ${viewMode==='cards' ? 'bg-primary text-secondary' : 'border'}`}>Cards</button>
          </div>
        </div>

        {viewMode === 'table' ? (
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
                    <td className="p-3 align-top">{job.applicationDate ? new Date(job.applicationDate).toLocaleDateString() : '-'}</td>
                    <td className="p-3 align-top">{job.interviewDate ? new Date(job.interviewDate).toLocaleDateString() : '-'}</td>
                    <td className="p-3 align-top">{job.salary || '-'}</td>
                    <td className="p-3 align-top">{job.notes}</td>
                    <td className="p-3 align-top">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(job)} className="px-2 py-1 border rounded text-sm">Edit</button>
                        <button onClick={() => handleDelete(job.id)} className="px-2 py-1 border rounded text-sm text-red-500">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          jobs.map((job) => (
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
                  <button onClick={() => startEdit(job)} className="px-3 py-1 border rounded text-sm">Edit</button>
                  <button onClick={() => handleDelete(job.id)} className="px-3 py-1 border rounded text-sm text-red-500">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button onClick={loadMore} disabled={loadingMore} className="px-6 py-3 bg-secondary rounded">{loadingMore ? 'Loading...' : 'Load More'}</button>
        </div>
      )}
    </div>
  );
}
