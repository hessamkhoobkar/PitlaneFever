import Sidebar from "@/app/components/Sidebar";
import Userside from "@/app/components/Userside";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto flex justify-start items-start gap-4 py-4">
      <main className="w-8/12">{children}</main>
      <Sidebar />
    </div>
  );
}
