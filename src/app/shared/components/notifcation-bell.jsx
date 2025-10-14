import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomToast } from "@/components/custom/CustomToast";

const socket = io("http://localhost:3000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: false,
});

const NotificationBell = ({
  className = "",
  variant = "ghost",
  size = "icon",
}) => {
  const { user, isLoading: userLoading } = useAuth();
  const isMobile = useIsMobile();
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
      Furniture: { icon: Package, color: "text-orange-500" },
      Documents: { icon: FileText, color: "text-green-500" },
      Events: { icon: Calendar, color: "text-purple-500" },
    };
    return iconMap[category] || { icon: Bell, color: "text-muted-foreground" };
  };

  // Mark notification as read
  const markAsRead = useCallback(
    async (notificationId, currentStatus) => {
      if (currentStatus) return;

      try {
        const result = await customRequest({
          path: "/api/notification/update",
          attributes: {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ user_id: user._id }),
            credentials: "include",
          },
        });
        if (!result.success) {
          throw new Error();
        }
        refetch();
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [refetch, user]
  );

  // Delete notification
  const deleteNotification = async (notif_id) => {
    try {
      const result = await customRequest({
        path: "/api/notification/delete",
        attributes: {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notif_id }),
        },
      });
      if (result?.success) {
        CustomToast({
          description: "Notification has been deleted",
          status: "success",
        });
        return refetch();
      }
      CustomToast({
        description: "Failed to delete notification",
        status: "error",
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  useEffect(() => {
    if (!userLoading && user && isOpen) {
      markAsRead();
    }
  }, [user, userLoading, markAsRead, isOpen]);

  return (
    <div className="relative">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className={`
              absolute z-50 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden
              ${isMobile ? "right-0 w-72" : "right-0 w-96"}
            `}
          >
            <div
              className={`p-3 ${
                isMobile ? "" : "p-4"
              } border-b border-border bg-muted flex justify-between items-center`}
            >
              <h3
                className={`font-semibold ${
                  isMobile ? "text-sm" : "text-base"
                }`}
              >
                Notifications
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div
              className={`overflow-y-auto ${
                isMobile ? "max-h-64" : "max-h-96"
              }`}
            >
              {isLoading ? (
                <div className={`${isMobile ? "p-4" : "p-6"} text-center`}>
                  <p className="text-muted-foreground text-xs">Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className={`${isMobile ? "p-4" : "p-6"} text-center`}>
                  <Bell
                    className={`${
                      isMobile ? "h-6 w-6" : "h-8 w-8"
                    } mx-auto mb-2 text-muted-foreground/50`}
                  />
                  <p className="text-muted-foreground text-xs">
                    No notifications yet.
                  </p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const { icon: Icon, color } = getCategoryIcon(notif.category);
                  return (
                    <div
                      key={notif._id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`
                        ${
                          isMobile ? "p-2" : "p-4"
                        } flex gap-2 hover:bg-muted cursor-pointer border-b border-border transition-colors
                        ${!notif.isSeen ? "bg-primary/10" : "bg-background"}
                      `}
                    >
                      <div className="flex-shrink-0">
                        <Icon
                          className={`${
                            isMobile ? "h-3 w-3 mt-0.5" : "h-5 w-5 mt-1"
                          } ${color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4
                            className={`
                              font-medium leading-tight
                              ${isMobile ? "text-xs" : "text-sm"}
                              ${
                                !notif.isSeen
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            `}
                          >
                            {notif.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notif._id);
                            }}
                            className="opacity-60 hover:opacity-100 transition-opacity shrink-0"
                          >
                            <Trash2
                              className={`${
                                isMobile ? "h-3 w-3" : "h-4 w-4"
                              } text-destructive`}
                            />
                          </button>
                        </div>
                        <p
                          className={`${
                            isMobile ? "text-[10px]" : "text-xs"
                          } text-muted-foreground mb-1`}
                        >
                          {notif.details}
                        </p>
                        <div className="flex justify-between items-center">
                          <span
                            className={`${
                              isMobile ? "text-[9px]" : "text-[11px]"
                            } text-muted-foreground`}
                          >
                            {formatDistanceToNow(new Date(notif.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                          <span
                            className={`${
                              isMobile ? "text-[9px]" : "text-xs"
                            } px-2 py-0.5 rounded-full ${
                              !notif.isSeen
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {notif?.category ?? "No category"}
                          </span>
                        </div>
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
