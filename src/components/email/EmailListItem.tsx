
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, StarOff, AlertCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmailItem {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  urgent: boolean;
  spam: boolean;
}

interface EmailListItemProps {
  email: EmailItem;
  onSelect: (id: string) => void;
  onStar: (id: string, starred: boolean) => void;
  selected: boolean;
  onViewEmail: (email: EmailItem) => void;
}

const EmailListItem = ({ email, onSelect, onStar, selected, onViewEmail }: EmailListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.email-content')) {
      onViewEmail(email);
    }
  };

  return (
    <div 
      className={cn(
        "border-b border-border px-4 py-3 flex items-start gap-3 cursor-pointer",
        email.read ? "bg-background" : "bg-blue-50/50",
        selected && "bg-blue-100/50",
        isHovered && "bg-secondary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="pt-1" onClick={e => e.stopPropagation()}>
        <Checkbox 
          checked={selected}
          onCheckedChange={() => onSelect(email.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-7 w-7 text-yellow-400 hover:text-yellow-400 hover:bg-yellow-50"
        onClick={(e) => {
          e.stopPropagation();
          onStar(email.id, !email.starred);
        }}
      >
        {email.starred ? <Star size={18} fill="currentColor" /> : <StarOff size={18} />}
      </Button>
      
      <div className="flex-1 min-w-0 email-content">
        <div className="flex justify-between items-baseline">
          <h4 className={cn(
            "font-medium truncate",
            !email.read && "font-semibold"
          )}>
            {email.from.name}
          </h4>
          <span className="text-xs text-muted-foreground">{email.date}</span>
        </div>
        
        <div className="flex items-center gap-1 mt-0.5">
          {email.urgent && (
            <AlertCircle size={14} className="text-amber-500" />
          )}
          {email.spam && (
            <ShieldAlert size={14} className="text-red-500" />
          )}
          <p className="font-medium truncate">{email.subject}</p>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
          {email.preview}
        </p>
      </div>
    </div>
  );
};

export default EmailListItem;
