import React from "react";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { roboto_mono } from "@/app/fonts";
import clsx from "clsx";

export default function CheckEmailPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="size-10 rounded-full border flex items-center justify-around mb-4">
          <InboxArrowDownIcon className="size-6" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-lg text-center max-w-prose">
          We&apos;ve sent you a confirmation link. Please check your email to
          continue.
        </p>
        <section className="flex flex-col items-center mt-8">
          <p className={clsx("text-sm", roboto_mono.className)}>
            Didn&apos;t receive an email? Request a new one{" "}
            <a href="/register" className="underline hover:no-underline">
              here
            </a>
            .
          </p>
        </section>
      </main>
    </>
  );
}
