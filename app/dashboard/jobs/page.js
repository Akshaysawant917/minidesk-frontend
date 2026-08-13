"use client";

import { useEffect, useState } from "react";
import { createJob, getJobs, updateJob, deleteJob } from "@/api/jobs.api";
import EmptyJobsState from "@/components/jobs/EmptyJobsState";
import JobCardList from "@/components/jobs/JobCardList";
import JobFormModal from "@/components/jobs/JobFormModal";
import JobTable from "@/components/jobs/JobTable";


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

      <JobFormModal
        show={showModal}
        editing={editing}
        company={company}
        setCompany={setCompany}
        role={role}
        setRole={setRole}
        location={location}
        setLocation={setLocation}
        source={source}
        setSource={setSource}
        status={status}
        setStatus={setStatus}
        notes={notes}
        setNotes={setNotes}
        salary={salary}
        setSalary={setSalary}
        applicationDate={applicationDate}
        setApplicationDate={setApplicationDate}
        interviewDate={interviewDate}
        setInterviewDate={setInterviewDate}
        error={error}
        saving={saving}
        onSubmit={editing ? (e) => { e.preventDefault(); handleUpdate(editing.id); } : handleCreate}
        onCancel={resetForm}
        onCloseBackdrop={() => setShowModal(false)}
      />

      {/* List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-app/60">Showing {jobs.length} jobs</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('table')} className={`px-3 py-1 rounded ${viewMode==='table' ? 'bg-primary text-secondary' : 'border'}`}>Table</button>
            <button onClick={() => setViewMode('cards')} className={`px-3 py-1 rounded ${viewMode==='cards' ? 'bg-primary text-secondary' : 'border'}`}>Cards</button>
          </div>
        </div>

        {jobs.length === 0 ? (
          <EmptyJobsState onAddJob={() => { resetForm(); setShowModal(true); }} />
        ) : viewMode === 'table' ? (
          <JobTable jobs={jobs} onEdit={startEdit} onDelete={handleDelete} />
        ) : (
          <JobCardList jobs={jobs} onEdit={startEdit} onDelete={handleDelete} />
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
