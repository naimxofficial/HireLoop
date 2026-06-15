
import {LayoutSideContentLeft, Suitcase, Gear, House, Factory, Files} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";

export function Sidebar() {
  const navItems = [
    {icon: House, label: "Dashboard"},
    {icon: Factory, label: "My Company"},
    {icon: Suitcase, label: "Manage Jobs"},
    {icon: Files, label: "Applications"},
    {icon: Gear, label: "Settings"},
  ];

  const navList = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
  return (
    <main>
    <aside className="hidden lg:block w-64 border-default shrink-0 border-r">
      {navList}
    </aside>
    <Drawer>
      <Button  className="lg:hidden" variant="secondary">
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