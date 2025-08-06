
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archive, Trash2, MailOpen, Mail, RefreshCcw, ShieldAlert } from "lucide-react";
import EmailListItem from "./EmailListItem";
import EmailDetail from "./EmailDetail";
import { EmailItem, EmailListProps } from "@/types/email";

// Mock data
const mockEmails: EmailItem[] = [
  {
    id: "1",
    from: { name: "John Davis", email: "john@example.com" },
    subject: "Meeting tomorrow at 10 AM",
    preview: "Hi there, just a reminder about our meeting tomorrow at 10 AM in the conference room...",
    date: "10:30 AM",
    read: false,
    starred: true,
    urgent: true,
    spam: false
  },
  {
    id: "2",
    from: { name: "Marketing Team", email: "marketing@company.com" },
    subject: "Weekly Newsletter - Latest Updates",
    preview: "Check out our latest products and announcements in this week's newsletter...",
    date: "9:15 AM",
    read: true,
    starred: false,
    urgent: false,
    spam: false
  },
  {
    id: "3",
    from: { name: "Alice Johnson", email: "alice@example.com" },
    subject: "Project update - New timeline",
    preview: "Based on our recent discussion, I've updated the project timeline...",
    date: "Yesterday",
    read: true,
    starred: true,
    urgent: false,
    spam: false
  },
  {
    id: "4",
    from: { name: "Bob Smith", email: "bob@example.com" },
    subject: "Contract renewal",
    preview: "We need to discuss the contract renewal for next year. Can we schedule a call?",
    date: "Yesterday",
    read: false,
    starred: false,
    urgent: true,
    spam: false
  },
  {
    id: "5",
    from: { name: "Security Team", email: "security@company.com" },
    subject: "Important: Security Update Required",
    preview: "Please update your password within the next 24 hours...",
    date: "Mar 15",
    read: true,
    starred: false,
    urgent: false,
    spam: false
  },
  {
    id: "6",
    from: { name: "Linda Wilson", email: "linda@example.com" },
    subject: "Feedback on your presentation",
    preview: "I wanted to give you some feedback on your presentation yesterday...",
    date: "Mar 14",
    read: true,
    starred: false,
    urgent: false,
    spam: false
  },
  {
    id: "7",
    from: { name: "UnknownSender", email: "claim@yourprize.com" },
    subject: "YOU WON $5,000,000!!!",
    preview: "Click here to claim your prize immediately before it expires...",
    date: "Mar 13",
    read: true,
    starred: false,
    urgent: false,
    spam: true
  }
];

const EmailList = ({ category = "inbox" }: EmailListProps) => {
  const [emails, setEmails] = useState<EmailItem[]>(mockEmails);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("primary");
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);

  const handleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(filteredEmails.map(email => email.id));
    } else {
      setSelectedEmails([]);
    }
  };

  const handleStarEmail = (id: string, starred: boolean) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred } : email
    ));
  };

  const handleViewEmail = (email: EmailItem) => {
    setSelectedEmail(email);
    // Mark email as read when viewed
    setEmails(emails.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    ));
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  let filteredEmails = emails;
  
  if (category === "inbox") {
    filteredEmails = activeTab === "primary" 
      ? emails.filter(email => !email.spam)
      : emails.filter(email => email.spam);
  } else if (category === "urgent") {
    filteredEmails = emails.filter(email => email.urgent);
  } else if (category === "spam") {
    filteredEmails = emails.filter(email => email.spam);
  } else if (category === "sent") {
    // For demo purposes, just show a couple of sent emails
    filteredEmails = emails.slice(0, 2);
  } else if (category === "archive") {
    // For demo purposes, just show a sample of archived emails
    filteredEmails = emails.slice(1, 3);
  } else if (category === "trash") {
    // For demo purposes, just show one email in trash
    filteredEmails = [emails[0]];
  }

  const allSelected = selectedEmails.length > 0 && selectedEmails.length === filteredEmails.length;
  const someSelected = selectedEmails.length > 0 && selectedEmails.length < filteredEmails.length;

  if (selectedEmail) {
    return <EmailDetail email={selectedEmail} onBack={handleBackToList} />;
  }

  return (
    <div className="bg-card rounded-md border shadow-sm">
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={allSelected || someSelected}
            className={someSelected ? "opacity-50" : ""}
            onCheckedChange={handleSelectAll}
          />
          
          <Button variant="ghost" size="icon" disabled={selectedEmails.length === 0}>
            <Archive size={18} />
          </Button>
          
          <Button variant="ghost" size="icon" disabled={selectedEmails.length === 0}>
            <Trash2 size={18} />
          </Button>
          
          <Button variant="ghost" size="icon" disabled={selectedEmails.length === 0}>
            <MailOpen size={18} />
          </Button>

          <Button variant="ghost" size="icon">
            <RefreshCcw size={18} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {emails.filter(e => !e.read).length} unread
          </span>
        </div>
      </div>
      
      {category === "inbox" && (
        <Tabs defaultValue="primary" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
            <TabsTrigger value="primary" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Mail size={16} className="mr-2" />
              Primary
            </TabsTrigger>
            <TabsTrigger value="spam" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <ShieldAlert size={16} className="mr-2" />
              Spam
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="p-0 m-0">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-2 text-lg font-medium">No emails</h3>
                <p className="text-muted-foreground">Your inbox is empty</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredEmails.map(email => (
                  <EmailListItem
                    key={email.id}
                    email={email}
                    onSelect={handleSelectEmail}
                    onStar={handleStarEmail}
                    selected={selectedEmails.includes(email.id)}
                    onViewEmail={handleViewEmail}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="spam" className="p-0 m-0">
            {filteredEmails.length === 0 ? (
              <div className="p-8 text-center">
                <ShieldAlert className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-2 text-lg font-medium">No spam</h3>
                <p className="text-muted-foreground">No spam emails found</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredEmails.map(email => (
                  <EmailListItem
                    key={email.id}
                    email={email}
                    onSelect={handleSelectEmail}
                    onStar={handleStarEmail}
                    selected={selectedEmails.includes(email.id)}
                    onViewEmail={handleViewEmail}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {category !== "inbox" && (
        <div className="divide-y divide-border">
          {filteredEmails.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-medium">No emails</h3>
              <p className="text-muted-foreground">No emails found in this category</p>
            </div>
          ) : (
            filteredEmails.map(email => (
              <EmailListItem
                key={email.id}
                email={email}
                onSelect={handleSelectEmail}
                onStar={handleStarEmail}
                selected={selectedEmails.includes(email.id)}
                onViewEmail={handleViewEmail}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EmailList;
