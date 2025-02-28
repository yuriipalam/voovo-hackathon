import { Link } from "@remix-run/react";

export function AppNavbar() {
  return (
    <nav className="fixed w-full">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/">
          <img
            src={"/logo-2.svg"}
            alt="PDFury logotype"
            width={950}
            height={313}
            className="w-28"
          />
        </Link>
        <div className="flex items-center">
          <ul className="text-sm">
            <li className="flex items-center gap-4">
              <Link
                to="/pricing"
                className="text-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground-darker hover:underline"
              >
                Pricing
              </Link>

              <Link
                to="/sign-in"
                className="font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground-darker hover:underline"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
