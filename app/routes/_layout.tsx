import { AppNavbar } from "@/components/app-navbar";
import { Outlet, useOutletContext } from "@remix-run/react";
import { OutletContext } from "@/providers";

export default function LandingLayout() {
  const context = useOutletContext<OutletContext>();

  return (
    <>
      <AppNavbar />
      <main>
        <Outlet context={context} />
      </main>
    </>
  );
}
