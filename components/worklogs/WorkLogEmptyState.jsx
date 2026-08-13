import { Calendar, Clock } from "lucide-react";

export default function WorkLogEmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-10 h-10 text-app/30" />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">No past logs yet</h3>
      <p className="text-app/50 mb-6">Start building your work history by logging today</p>
      <div className="inline-flex items-center gap-2 text-sm text-primary">
        <Clock className="w-4 h-4" />
        <span>Your journey begins now</span>
      </div>
    </div>
  );
}
