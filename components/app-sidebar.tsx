"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { SidebarHistory, getChatHistoryPaginationKey } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAll = () => {
    const deletePromise = fetch("/api/history", {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Deleting all chats...",
      success: () => {
        mutate(unstable_serialize(getChatHistoryPaginationKey));
        router.push("/");
        setShowDeleteAllDialog(false);
        return "All chats deleted successfully";
      },
      error: "Failed to delete all chats",
    });
  };

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <SidebarHeader className="border-b border-gray-100 dark:border-gray-800">
          <SidebarMenu>
            <div className="flex flex-row items-center justify-between p-4">
              <Link
                className="flex flex-row items-center gap-3"
                href="/"
                onClick={() => {
                  setOpenMobile(false);
                }}
              >
                <div className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="relative w-6 h-6 overflow-hidden rounded-md">
                    <Image
                      src="/images/TOMO.jpg"
                      alt="TOMO Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    TOMO CHAT
                  </span>
                </div>
              </Link>
              
              <Button
                className="h-9 w-9 rounded-lg border border-gray-200 bg-white p-0 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                onClick={() => {
                  setOpenMobile(false);
                  router.push("/");
                  router.refresh();
                }}
                type="button"
                variant="ghost"
              >
                <PlusIcon size={16} />
              </Button>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <div className="py-2">
            <SidebarHistory user={user} />
          </div>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-gray-100 p-4 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {user && <SidebarUserNav user={user} />}
            {user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="h-8 w-8 rounded-lg bg-transparent p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    onClick={() => setShowDeleteAllDialog(true)}
                    type="button"
                    variant="ghost"
                  >
                    <TrashIcon size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">
                  Delete All Chats
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog onOpenChange={setShowDeleteAllDialog} open={showDeleteAllDialog}>
        <AlertDialogContent className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Delete all chats?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              This action cannot be undone. This will permanently delete all your
              chats and remove them from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAll}
              className="rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
