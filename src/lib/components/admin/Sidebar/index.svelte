<script>
  import CalendarIcon from "$lib/components/icons/Calendar.svelte";
  import ImageIcon from "$lib/components/icons/Image.svelte";
  import CartIcon from "$lib/components/icons/Cart.svelte";
  import ArchiveIcon from "$lib/components/icons/Archive.svelte";
  import SchoolIcon from "$lib/components/icons/School.svelte";
  import LoveIcon from "$lib/components/icons/Love.svelte";
  import PeopleIcon from "$lib/components/icons/People.svelte";
  import DocumentIcon from "$lib/components/icons/Document.svelte";
  import NewsIcon from "$lib/components/icons/News.svelte";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import ProjectsIcon from "$lib/components/icons/Projects.svelte";

  import SidebarLink from "./SidebarLink.svelte";
</script>

<aside
  id="sidebar"
  class="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
  aria-label="Sidebar"
>
  <!-- {$page.path}
  {$page.path === "/admin"} -->
  <div
    class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
  >
    <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <div class="flex-1 px-3 bg-white divide-y space-y-1">
        <ul class="space-y-2 pb-2">
          <li>
            <SidebarLink href="/admin/" label="Dashboard">
              <PieChartIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/projects/" label="Projects">
              <ProjectsIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/news/" label="News">
              <NewsIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/events/" label="Events">
              <CalendarIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/shop/" label="Shop">
              <CartIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/inventory/" label="Resources">
              <ArchiveIcon />
            </SidebarLink>
          </li>
        </ul>

        <ul class="py-2">
          <li>
            <SidebarLink href="/admin/trustees/" label="Trustees">
              <PeopleIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/partners/" label="Partners">
              <LoveIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/schools/" label="Schools">
              <SchoolIcon />
            </SidebarLink>
          </li>
        </ul>

        <ul class="py-2">
          <li>
            <SidebarLink href="/admin/files/" label="Files">
              <DocumentIcon />
            </SidebarLink>
          </li>

          <li>
            <SidebarLink href="/admin/images/" label="Images">
              <ImageIcon />
            </SidebarLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</aside>
