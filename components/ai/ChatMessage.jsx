const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatMarkdownLikeText = (content) => {
  let safe = escapeHtml(content || "");

  safe = safe
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");

  const lines = safe.split(/\n+/).filter(Boolean);
  let html = "";
  let listOpen = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^[-*]\s+/.test(trimmed)) {
      if (!listOpen) {
        html += "<ul class=\"list-disc pl-5\">";
        listOpen = true;
      }

      html += `<li>${trimmed.replace(/^[-*]\s+/, "")}</li>`;
      return;
    }

    if (listOpen) {
      html += "</ul>";
      listOpen = false;
    }

    html += `<p>${trimmed}</p>`;
  });

  if (listOpen) {
    html += "</ul>";
  }

  return html || "<p></p>";
};

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm ${
          isUser
            ? "border-primary bg-primary text-secondary"
            : "border-app bg-secondary/30 text-app"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words text-sm leading-7">{message.content}</p>
        ) : (
          <div
            className="space-y-2 text-sm leading-7 [&_p]:mb-1 [&_ul]:my-2 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic [&_code]:rounded [&_code]:bg-primary/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[11px]"
            dangerouslySetInnerHTML={{ __html: formatMarkdownLikeText(message.content) }}
          />
        )}
      </div>
    </div>
  );
}
