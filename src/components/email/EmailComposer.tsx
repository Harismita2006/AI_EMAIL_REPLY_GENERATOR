
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Send, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type ToneType = "friendly" | "professional" | "short" | "detailed";
type LanguageType = "english" | "spanish" | "french" | "german" | "chinese";

interface EmailComposerProps {
  replyTo?: {
    to: string;
    subject: string;
    originalMessage: string;
  };
}

const EmailComposer = ({ replyTo }: EmailComposerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [to, setTo] = useState(replyTo?.to || "");
  const [subject, setSubject] = useState(replyTo?.subject ? `Re: ${replyTo.subject}` : "");
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<ToneType>("professional");
  const [language, setLanguage] = useState<LanguageType>("english");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleGenerateEmail = async () => {
    if (!subject) {
      toast({
        title: "Subject required",
        description: "Please provide a subject for AI generation",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let generatedEmail = "";
      
      switch (tone) {
        case "friendly":
          generatedEmail = `Hi there!\n\nI hope this email finds you well! I wanted to reach out about "${subject}".\n\nWould love to discuss this further when you have a moment.\n\nBest wishes,\nYour Name`;
          break;
        case "professional":
          generatedEmail = `Dear Recipient,\n\nI am writing regarding "${subject}".\n\nPlease let me know if you require any additional information.\n\nBest regards,\nYour Name`;
          break;
        case "short":
          generatedEmail = `Re: ${subject}\n\nBriefly following up on this matter. Let's discuss soon.\n\nRegards,\nYour Name`;
          break;
        case "detailed":
          generatedEmail = `Dear Recipient,\n\nI hope this message finds you well. I am writing to discuss "${subject}" in detail.\n\nAs we previously discussed, there are several important aspects to consider:\n1. First key point\n2. Second key point\n3. Third key point\n\nI look forward to your thoughts on these matters and would be happy to schedule a call to discuss further.\n\nBest regards,\nYour Name`;
          break;
      }
      
      setMessage(generatedEmail);
      setIsGenerating(false);
      
      toast({
        title: "Email generated",
        description: "AI has drafted your email based on your preferences",
      });
    }, 1500);
  };
  
  const handleSend = () => {
    if (!to || !subject || !message) {
      toast({
        title: "Incomplete email",
        description: "Please fill in all required fields before sending",
        variant: "destructive",
      });
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const confirmSend = () => {
    // Simulate sending
    setShowConfirmation(false);
    
    toast({
      title: "Email sent successfully",
      description: "Your message has been sent",
    });
    
    navigate("/");
  };
  
  return (
    <div className="bg-card rounded-md border shadow-sm p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-xl font-semibold">
          {replyTo ? "Reply to Email" : "New Email"}
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <Input
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        
        <div>
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="flex-1">
            <Select value={tone} onValueChange={(value) => setTone(value as ToneType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={language} onValueChange={(value) => setLanguage(value as LanguageType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerateEmail} 
            disabled={isGenerating || !subject}
            className="gap-2"
          >
            <Sparkles size={16} />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
        
        {replyTo && (
          <div className="bg-secondary/50 p-3 rounded-md border text-sm mb-4">
            <p className="text-muted-foreground">Original message:</p>
            <p className="line-clamp-3">{replyTo.originalMessage}</p>
          </div>
        )}
        
        <Textarea
          placeholder="Write your message here or generate with AI..."
          className="min-h-[200px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleSend} className="gap-2">
            <Send size={16} />
            Send
          </Button>
        </div>
      </div>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm sending email</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this email to {to}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-secondary/30 p-3 rounded-md border text-sm my-4">
            <p><strong>Subject:</strong> {subject}</p>
            <p className="whitespace-pre-line mt-2 line-clamp-4">{message}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSend}>
              Confirm and Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailComposer;
