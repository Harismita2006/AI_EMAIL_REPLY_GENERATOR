
import React from "react";
import EmailList from "@/components/email/EmailList";

const InboxPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>
      <EmailList category="inbox" />
    </div>
  );
};

export default InboxPage;
