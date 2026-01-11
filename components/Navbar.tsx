"use client";

import { chulapa } from "@/app/fonts";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z"
    />
  </svg>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/login");
  };

  return (
    <nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://mrnxn.vercel.app/"
          className={`${chulapa.className} chulapa-ligatures flex items-center space-x-3 rtl:space-x-reverse`}
        >
          <Image
            width={30}
            height={30}
            src="/images/logo.png"
            alt="Mrnxn Logo"
            className="mr-4"
          />
          Mrnxn.
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {session ? (
            <button
              onClick={handleSignOut}
              type="button"
              className="text-white bg-brand hover:border hover:rounded shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 flex items-center gap-2 cursor-pointer"
            >
              <UserIcon />
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              type="button"
              className="hover:scale-110 transition-all duration-200 text-white bg-brand hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 flex items-center gap-2 cursor-pointer"
            >
              <UserIcon />
              Login
            </Link>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex cursor-pointer items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          {session && (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/add-review"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  Add review
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
