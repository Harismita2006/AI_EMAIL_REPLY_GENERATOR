
import React from "react";
import EmailComposer from "@/components/email/EmailComposer";

const ComposePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Email</h1>
      <EmailComposer />
    </div>
  );
};

export default ComposePage;
