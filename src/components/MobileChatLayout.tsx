"use client";

import { Transition, Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { FC, Fragment, useEffect, useState } from "react";
import Button, { buttonVariants } from "./ui/Button";
import SignOutButton from "./SignOutButton";
import SidebarChatList from "./SidebarChatList";
import Image from "next/image";
import FriendRequestsSideBarOptions from "@/components/FriendRequestsSideBarOptions";
import { Session } from "next-auth";
import { SidebarOption } from "@/types/typings";
import { usePathname } from "next/navigation";

interface MobileChatLayoutProps {
  friends: User[];
  session: Session;
  sidebarOptions: SidebarOption[];
  unseenRequestCount: number;
}

const MobileChatLayout: FC<MobileChatLayoutProps> = ({
  friends,
  session,
  sidebarOptions,
  unseenRequestCount,
}) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="fixed bg-zinc-50 border-b border-zinc-200 top-0 inset-x-0 py-2 px-4">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "ghost" })}
        >
          <Icons.Logo className="h-6 w-auto text-sunset" />
        </Link>
        <Button onClick={() => setOpen(true)} className="gap-4">
          Menu <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-hidden bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-petroleum">
                            Dashboard
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sunset focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Content */}

                        {friends.length > 0 ? (
                          <div className="text-xs font-semibold leading-6 text-petroleum-light">
                            Your chats
                          </div>
                        ) : null}

                        <nav className="flex flex-1 flex-col">
                          <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                          >
                            <li>
                              <SidebarChatList
                                friends={friends}
                                sessionId={session.user.id}
                              />
                            </li>

                            <li>
                              <div className="text-xs font-semibold leading-6 text-petroleum-light">
                                Overview
                              </div>
                              <ul role="list" className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map((option) => {
                                  const Icon = Icons[option.Icon];
                                  return (
                                    <li key={option.id}>
                                      <Link
                                        href={option.href}
                                        className="sidebar_option_hover group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      >
                                        <span className="sidebar_option_hover_group">
                                          <Icon className="h-4 w-4" />
                                        </span>

                                        <span className="truncate">
                                          {option.name}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}

                                <li>
                                  <FriendRequestsSideBarOptions
                                    initialUnseenRequestCount={
                                      unseenRequestCount
                                    }
                                    sessionId={session.user.id}
                                  />
                                </li>
                              </ul>
                            </li>

                            <li className="-ml-6 mt-auto flex items-center">
                              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                                <div className="relative h-8 w-8 bg-gray-50">
                                  <Image
                                    fill
                                    referrerPolicy="no-referrer"
                                    className="rounded-full"
                                    src={session.user.image || ""}
                                    alt="Your profile picture"
                                  />
                                </div>

                                <span className="sr-only">Your profile</span>
                                <div className="flex flex-col">
                                  <span aria-hidden="true">
                                    {session.user.name}
                                  </span>
                                  <span
                                    className="text-xs text-zinc-400"
                                    aria-hidden="true"
                                  >
                                    {session.user.email}
                                  </span>
                                </div>
                              </div>

                              <SignOutButton className="h-full aspect-square" />
                            </li>
                          </ul>
                        </nav>

                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MobileChatLayout;
