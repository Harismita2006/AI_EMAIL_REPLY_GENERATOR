
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SmartReplyProps {
  onSelectReply: (reply: string) => void;
}

const SmartReply = ({ onSelectReply }: SmartReplyProps) => {
  const smartReplies = [
    "Thanks for your email. I'll review this and get back to you soon.",
    "I appreciate the update. Let's discuss this further on our next call.",
    "Got it, thanks for letting me know.",
    "This looks great! I approve the changes.",
  ];

  return (
    <div className="mt-2 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-primary" />
        <span className="text-sm font-medium">Smart Reply</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {smartReplies.map((reply, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs bg-secondary/50"
            onClick={() => onSelectReply(reply)}
          >
            {reply}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SmartReply;
