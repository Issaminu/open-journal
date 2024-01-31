"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

function Providers({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <MantineProvider>{children}</MantineProvider>
    </SessionProvider>
  );
}

export default Providers;
