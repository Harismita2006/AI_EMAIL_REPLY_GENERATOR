
import EmailList from "@/components/email/EmailList";

const SentEmailsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sent Emails</h1>
      <EmailList category="sent" />
    </div>
  );
};

export default SentEmailsPage;
