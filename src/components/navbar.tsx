import { useTheme } from '@/components/theme-provider'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Moon, Settings, Sun } from 'lucide-react'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const troggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="flex justify-between items-center pb-2 border-b border-solid border-primary/10">
      <div className="flex items-center">
        <Logo />
        <h2 className="ml-2 text-lg font-[Poppins]">marktodo</h2>
      </div>

      <div>
        <Button size="icon" variant="ghost" className="w-6 h-6 mr-2">
          <Settings className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={troggleTheme}
          className="w-6 h-6"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </nav>
  )
}
