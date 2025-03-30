import { CustomScrollArea } from "@/components/ui/custom-scroll-area";
import UserDirectory from "@/components/userdirectory";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="md:flex max-w-[120rem] mx-auto relative items-start">
        <aside className="hidden md:sticky bg-neutral-900 text-white md:top-0 md:overflow-hidden md:block md:w-[340px] md:max-w-[340px] md:min-w-[340px] h-screen">
          <CustomScrollArea className="h-full flex flex-col w-full gap-4 pr-2">
            <UserDirectory />
          </CustomScrollArea>
        </aside>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </section>
  );
}