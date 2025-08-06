
import EmailList from "@/components/email/EmailList";

const ArchivePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Archive</h1>
      <EmailList category="archive" />
    </div>
  );
};

export default ArchivePage;
