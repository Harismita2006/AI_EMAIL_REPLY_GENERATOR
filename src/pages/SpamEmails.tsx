
import EmailList from "@/components/email/EmailList";

const SpamEmailsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Spam Folder</h1>
      <EmailList category="spam" />
    </div>
  );
};

export default SpamEmailsPage;
