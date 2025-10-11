import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/core/contexts/ThemeProvider";
import {
  Bell,
  BellRing,
  X,
  Check,
  Clock,
  AlertTriangle,
  FileText,
  Package,
  RefreshCw,
  Settings,
  Trash2,
  Search,
} from "lucide-react";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuthProvider";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});
const NotificationBell = ({
  className = "",
  variant = "ghost",
  size = "icon",
}) => {
  const { user, isLoading: userLoading } = useAuth();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all , unread, read
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    if (!userLoading) {
      socket.on("connect", () => {
        console.log("connect");
        socket.emit("join_room", user?._id);
      });
    }
    return () => socket.disconnect();
  }, [user, userLoading]);
  const mockNotifications = [
    {
      id: "1",
      user_id: "resident_1",
      type: "document_request",
      title: "Barangay Clearance Approved",
      message:
        "Your request for Barangay Clearance has been approved. Please claim it at the Barangay Hall.",
      is_read: false,
      created_at: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "2",
      user_id: "resident_1",
      type: "item_booking",
      title: "Chair & Table Request Pending",
      message:
        "Your request for 20 chairs and 5 tables is pending approval from the Barangay Office.",
      is_read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "3",
      user_id: "resident_1",
      type: "item_return",
      title: "Return Reminder",
      message:
        "Reminder: Please return the borrowed sound system set by tomorrow.",
      is_read: true,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      id: "4",
      user_id: "resident_1",
      type: "announcement",
      title: "Barangay Assembly",
      message:
        "Barangay-wide General Assembly will be held on Sunday, 9:00 AM at the Covered Court.",
      is_read: false,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ];

  // Load notifications
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual Supabase call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setNotifications(mockNotifications);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNotifications();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter + Search
  const filteredNotifications = notifications.filter((n) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !n.is_read) ||
      (filter === "read" && n.is_read);
    const matchesSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Unread count
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Icon by type
  const getNotificationIcon = (type) => {
    const map = {
      document_request: { icon: FileText, color: "text-primary" },
      item_booking: { icon: Package, color: "text-warning" },
      item_return: { icon: RefreshCw, color: "text-destructive" },
      announcement: { icon: Settings, color: "text-info" },
    };
    return map[type] || { icon: Bell, color: "text-muted-foreground" };
  };

  // Actions
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        ref={bellRef}
        variant={variant}
        size={size}
        className={`relative hover:bg-sidebar-accent transition-colors ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4 text-primary" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="h-5 w-5 p-0 text-xs bg-destructive text-white flex items-center justify-center">
              {unreadCount}
            </Badge>
          </motion.div>
        )}
      </Button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-96 z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-background border rounded-lg"
                />
              </div>
            </div>
            {/* List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <p className="p-6 text-center text-muted-foreground text-sm">
                  Loading notifications...
                </p>
              ) : filteredNotifications.length === 0 ? (
                <p className="p-6 text-center text-muted-foreground text-sm">
                  No notifications found.
                </p>
              ) : (
                filteredNotifications.map((n) => {
                  const { icon: Icon, color } = getNotificationIcon(n.type);
                  return (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 flex gap-3 hover:bg-muted/50 cursor-pointer ${
                        !n.is_read ? "bg-primary/5" : ""
                      }`}
                    >
                      <Icon className={`h-5 w-5 mt-1 ${color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4
                            className={`font-medium text-sm ${
                              !n.is_read
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {n.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(n.id);
                            }}
                            className="opacity-60 hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {n.message}
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          {formatDistanceToNow(new Date(n.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
