import Sidebar from "@/app/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto flex justify-start items-start gap-4 pt-11">
      <main className="w-8/12 bg-neutral pe-4 rounded-tr-2xl body-card before:bg-neutral">
        {children}
      </main>
      <Sidebar />
    </div>
  );
}
