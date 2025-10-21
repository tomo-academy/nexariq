"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { toast } from "sonner";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlusIcon, 
  SearchIcon, 
  DownloadIcon, 
  SettingsIcon,
  ShareIcon,
  MoreHorizontalIcon
} from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { width: windowWidth } = useWindowSize();

  const handleExportChat = () => {
    // Export functionality
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Exporting chat...",
        success: "Chat exported successfully!",
        error: "Failed to export chat",
      }
    );
  };

  const handleShareChat = () => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: "TOMO CHAT Conversation",
        text: "Check out this conversation from TOMO CHAT",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center gap-2 bg-background/80 backdrop-blur-md border-b border-border px-3 py-2 md:px-4">
      <SidebarToggle />

      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="w-full h-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            TOMO CHAT
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Advanced AI Assistant
          </p>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen ? (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in conversation..."
              className="pl-10 pr-4 h-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              autoFocus
              onBlur={() => !searchTerm && setSearchOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        {(!open || windowWidth < 768) && (
          <Button
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            variant="outline"
            size="sm"
            className="h-9 px-3"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">New Chat</span>
          </Button>
        )}

        {/* Search Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <SearchIcon className="w-4 h-4" />
        </Button>

        {/* More Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleShareChat}>
              <ShareIcon className="w-4 h-4 mr-2" />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportChat}>
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SettingsIcon className="w-4 h-4 mr-2" />
              Chat Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
          />
        )}
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
