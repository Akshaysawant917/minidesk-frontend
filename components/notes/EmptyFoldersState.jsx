import { Folder, Plus } from "lucide-react";

export default function EmptyFoldersState({ onCreate }) {
  return (
    <div className="text-center py-16 border border-dashed border-app rounded-xl bg-app/50">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Folder className="w-10 h-10 text-app/30" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">No folders yet</h3>
      <p className="text-app/50 mb-6">Create your first folder to start organizing notes.</p>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 text-primary cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Create folder
      </button>
    </div>
  );
}
