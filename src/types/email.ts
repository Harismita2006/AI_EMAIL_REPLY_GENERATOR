
export interface EmailSender {
  name: string;
  email: string;
}

export interface EmailItem {
  id: string;
  from: EmailSender;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  urgent: boolean;
  spam: boolean;
  body?: string;
}

export interface EmailListProps {
  category: "inbox" | "urgent" | "spam" | "sent" | "archive" | "trash";
}
