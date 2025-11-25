import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar/sidebar';

// Menu items.
const items = [
  {
    title: 'マイページ',
    url: '#',
    icon: Home,
  },
  {
    title: '記録する',
    url: '#',
    icon: Inbox,
  },
  {
    title: '一覧',
    url: '#',
    icon: Calendar,
  },
  {
    title: '振り返り',
    url: '#',
    icon: Search,
  },
  {
    title: 'プライバシーポリシー',
    url: '#',
    icon: Settings,
  },
  {
    title: '利用規約',
    url: '#',
    icon: Settings,
  },
  {
    title: 'お問い合わせ',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
