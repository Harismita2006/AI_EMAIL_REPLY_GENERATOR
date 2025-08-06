
import { 
  Inbox, 
  Send, 
  Archive, 
  Trash2, 
  AlertCircle, 
  ShieldAlert,
  Plus 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Inbox, label: "Inbox", path: "/" },
    { icon: AlertCircle, label: "Urgent", path: "/urgent" },
    { icon: ShieldAlert, label: "Spam", path: "/spam" },
    { icon: Send, label: "Sent", path: "/sent" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-10">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex flex-col items-center py-3 px-4 space-y-1 text-muted-foreground",
              location.pathname === item.path && "text-primary"
            )}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
        <button
          className="flex flex-col items-center py-3 px-4 space-y-1 text-primary"
          onClick={() => navigate("/compose")}
        >
          <div className="bg-primary rounded-full p-1">
            <Plus size={18} className="text-white" />
          </div>
          <span className="text-xs">Compose</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
