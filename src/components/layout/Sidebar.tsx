
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Plus, 
  Inbox, 
  Send, 
  Archive, 
  Trash2, 
  AlertCircle, 
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: Inbox, label: "Inbox", count: 24, path: "/" },
  { icon: AlertCircle, label: "Urgent", count: 7, path: "/urgent" },
  { icon: ShieldAlert, label: "Spam", count: 12, path: "/spam" },
  { icon: Send, label: "Sent", path: "/sent" },
  { icon: Archive, label: "Archive", path: "/archive" },
  { icon: Trash2, label: "Trash", path: "/trash" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="w-64 border-r border-border h-[calc(100vh-60px)] p-4 hidden md:block">
      <Button 
        className="w-full gap-2 mb-6 justify-start" 
        onClick={() => navigate("/compose")}
      >
        <Plus size={18} />
        <span>Compose</span>
      </Button>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              location.pathname === item.path && "bg-secondary"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={18} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.count && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
