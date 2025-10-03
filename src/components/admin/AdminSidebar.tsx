import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "../ui/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

interface AdminSidebarProps {
  items: SidebarItem[];
  onItemClick: (id: any) => void;
}

export function AdminSidebar({ items, onItemClick }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  item.active && "bg-brand-navy hover:bg-brand-navy/90 text-white"
                )}
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}