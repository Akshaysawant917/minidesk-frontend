export default function EmptyJobsState({ onAddJob }) {
  return (
    <div className="rounded-xl border border-dashed border-app/40 bg-secondary/50 p-10 text-center">
      <h3 className="text-lg font-semibold text-primary">No jobs yet</h3>
      <p className="mt-2 text-sm text-app/60">Start by adding your first application to keep everything organized.</p>
      <button
        onClick={onAddJob}
        className="mt-4 rounded bg-primary px-4 py-2 text-sm font-medium text-secondary"
      >
        Add your first job
      </button>
    </div>
  );
}
