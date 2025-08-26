import { Link } from 'react-router'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export function AppHeader() {
  return (
    <div className="flex w-full items-center justify-between border-b-1 p-4">
      <SidebarTrigger />

      <Link to="https://github.com/sergioazoc/gamemind" target="_blank">
        GitHub
      </Link>
    </div>
  )
}
