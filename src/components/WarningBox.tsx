type WarningBoxProps = {
  title?: string;
  messages: string[];
};

export default function WarningBox({
  title = "Check these inputs",
  messages,
}: WarningBoxProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="warning-box" role="alert">
      <strong>{title}</strong>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
