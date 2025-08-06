
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Reply, Star, StarOff, Trash2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmailItem } from "./EmailListItem";
import SmartReply from "./SmartReply";
import EmailComposer from "./EmailComposer";

interface EmailDetailProps {
  email: EmailItem;
  onBack: () => void;
}

const EmailDetail = ({ email, onBack }: EmailDetailProps) => {
  const [isStarred, setIsStarred] = useState(email.starred);
  const [showReply, setShowReply] = useState(false);
  
  // Sample email body content
  const emailBody = `
    Hello,
    
    ${email.preview}
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
    
    Best regards,
    ${email.from.name}
  `;
  
  const handleSmartReply = (reply: string) => {
    setShowReply(true);
  };
  
  return (
    <div className="bg-card rounded-md border shadow-sm">
      {!showReply ? (
        <div>
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft size={18} />
              </Button>
              <h2 className="font-medium">{email.subject}</h2>
              {email.urgent && (
                <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle size={12} />
                  Urgent
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsStarred(!isStarred)}
                className="text-yellow-400 hover:text-yellow-400 hover:bg-yellow-50"
              >
                {isStarred ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <div className="bg-primary text-white w-full h-full flex items-center justify-center font-medium">
                  {email.from.name.charAt(0)}
                </div>
              </Avatar>
              
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-medium">{email.from.name}</h3>
                  <span className="text-xs text-muted-foreground">{email.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{email.from.email}</p>
              </div>
            </div>
            
            <div className="whitespace-pre-line mt-4">
              {emailBody}
            </div>
            
            <Separator className="my-6" />
            
            <SmartReply onSelectReply={handleSmartReply} />
            
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setShowReply(true)}
              >
                <Reply size={16} />
                Reply
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmailComposer 
          replyTo={{
            to: email.from.email,
            subject: email.subject,
            originalMessage: emailBody,
          }}
        />
      )}
    </div>
  );
};

export default EmailDetail;
