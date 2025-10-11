import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/core/contexts/ThemeProvider";
import {
  Bell,
  BellRing,
  X,
  Trash2,
  FileText,
  Package,
  Wrench,
  Calendar,
} from "lucide-react";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import { useAuth } from "@/hooks/useAuthProvider";
import customRequest from "@/services/customRequest";
import { useQuery } from "@tanstack/react-query";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: false, // Don't connect automatically
});

const NotificationBell = ({
  className = "",
  variant = "ghost",
  size = "icon",
}) => {
  const { user, isLoading: userLoading } = useAuth();
  useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const bellRef = useRef(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications", user?._id],
    queryFn: () =>
      customRequest({
        path: `/api/notification/retrieve?user_id=${user._id}`,
        attributes: {
          method: "GET",
          credentials: "include",
        },
      }),
    enabled: !!user?._id,
  });

  const notifications = Array.isArray(data?.response?.notifs)
    ? data?.response?.notifs
    : [];
  const notifCount = data?.response?.notifCount || 0;

  // Socket connection
  useEffect(() => {
    if (!userLoading && user?._id) {
      // Connect socket when we have a user
      socket.connect();

      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
        socket.emit("join_room", user._id);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.on("room_joined", (data) => {
        console.log("Room joined confirmation:", data);
      });

      // Clean up function
      return () => {
        console.log("Cleaning up socket connection");
        socket.off("connect");
        socket.off("connect_error");
        socket.off("room_joined");
        socket.disconnect();
      };
    }
  }, [user, userLoading]);

  useEffect(() => {
    const onInvalidate = (invalidate) => {
      if (invalidate) {
        console.log("Invalidate is true");
        refetch();
      }
    };
    socket.on("NOTIF_UPDATE", onInvalidate);
    return () => {
      socket.off("NOTIF_UPDATE", onInvalidate);
    };
  }, [refetch]);

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

  // Get icon based on category
  const getCategoryIcon = (category) => {
    const iconMap = {
      Service: { icon: Wrench, color: "text-blue-500" },
      Item: { icon: Package, color: "text-amber-500" },
      Documents: { icon: FileText, color: "text-green-500" },
      Events: { icon: Calendar, color: "text-purple-500" },
    };
    return iconMap[category] || { icon: Bell, color: "text-muted-foreground" };
  };

  // Mark notification as read
  const markAsRead = async (notificationId, currentStatus) => {
    if (currentStatus) return; // Already seen

    try {
      // TODO: Add API call to mark as read
      // await customRequest({
      //   path: `/api/notifications/${notificationId}/read`,
      //   attributes: { method: "PATCH", credentials: "include" },
      // });

      // Refetch to update the list
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await customRequest({
        path: `/api/notifications?user_id=${notificationId}`,
        attributes: {
          method: "DELETE",
          credentials: "include",
        },
      });

      // Refetch to update the list
      refetch();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    markAsRead(notification._id, notification.isSeen);
    // Navigate to link if needed
    // window.location.href = notification.link;
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
        {notifCount > 0 ? (
          <BellRing className="h-4 w-4 text-primary" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        {notifCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="h-5 w-5 p-0 text-xs bg-destructive text-white flex items-center justify-center">
              {notifCount > 9 ? "9+" : notifCount}
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

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <p className="p-6 text-center text-muted-foreground text-sm">
                  Loading notifications...
                </p>
              ) : notifications.length === 0 ? (
                <p className="p-6 text-center text-muted-foreground text-sm">
                  No notifications yet.
                </p>
              ) : (
                notifications.map((notif) => {
                  const { icon: Icon, color } = getCategoryIcon(notif.category);
                  return (
                    <div
                      key={notif._id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`p-4 flex gap-3 hover:bg-muted/50 cursor-pointer border-b border-border ${
                        !notif.isSeen ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <Icon className={`h-5 w-5 mt-1 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4
                            className={`font-medium text-sm ${
                              !notif.isSeen
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notif.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notif._id);
                            }}
                            className="opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </button>
                        </div>
                        <span className="text-[11px] text-muted-foreground block mt-1">
                          {formatDistanceToNow(new Date(notif.createdAt), {
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
