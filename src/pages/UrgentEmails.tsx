
import EmailList from "@/components/email/EmailList";

const UrgentEmailsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Urgent Emails</h1>
      <EmailList category="urgent" />
    </div>
  );
};

export default UrgentEmailsPage;
