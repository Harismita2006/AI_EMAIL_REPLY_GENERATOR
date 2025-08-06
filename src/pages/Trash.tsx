
import EmailList from "@/components/email/EmailList";

const TrashPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trash</h1>
      <EmailList category="trash" />
    </div>
  );
};

export default TrashPage;
