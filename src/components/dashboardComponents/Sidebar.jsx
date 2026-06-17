
import {LayoutSideContentLeft, Suitcase, Gear, House, Factory, Files, SquarePlus} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";

export function Sidebar() {
  const navItems = [
    {icon: House, label: "Dashboard", href: "/dashboard/recruiter"},
    {icon: Factory, label: "My Company", href: "/dashboard/recruiter/company"},
    {icon: SquarePlus, label: "Post a Job", href: "/dashboard/recruiter/jobs/new"},
    {icon: Suitcase, label: "Manage Jobs", href: "/dashboard/recruiter/jobs"},
    {icon: Files, label: "Applications", href: "/dashboard/recruiter/applications"},
    {icon: Gear, label: "Settings", href: "/dashboard/recruiter/settings"},
  ];

  const navList = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
  return (
    <main>
    <aside className="hidden lg:block w-64 border-default shrink-0 border-r">
      {navList}
    </aside>
    <Drawer>
      <Button  className="lg:hidden absolute top-20 left-6" variant="secondary">
        <LayoutSideContentLeft />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navList}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </main>
  );
}