export default function DashboardHeader() {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-app p-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-app/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-2">{dayName} 👋</h1>
        <p className="text-app/80 text-lg mb-1">{dateStr}</p>
        <p className="text-app/60">Prioritize and manage your work effectively</p>
      </div>
    </div>
  );
}
