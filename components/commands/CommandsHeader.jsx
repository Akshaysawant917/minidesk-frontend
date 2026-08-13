export default function CommandsHeader({ onAddCommand }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Commands</h2>
        <p className="text-app/60">Save and manage your frequently used commands</p>
      </div>

      <button
        type="button"
        onClick={onAddCommand}
        className="bg-primary text-secondary px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer"
      >
        Add Command
      </button>
    </div>
  );
}
