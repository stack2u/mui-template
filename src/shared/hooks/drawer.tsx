import React, { createContext, useCallback, useContext, useState } from 'react'

export type IMenuProps = {
  icon: string
  path: string
  label: string
}

interface IDrawerOption {
  title: string
  icon: string
  items: IMenuProps[]
}

interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
  drawerOptions: IDrawerOption[]
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

interface DrawerProps {
  children: React.ReactNode
}

const DrawerContext = createContext<IDrawerContextData>(
  {} as IDrawerContextData,
)

const DrawerProvider: React.FC<DrawerProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])

  const handleSetDrawerOption = useCallback(
    (newDrawerOption: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOption)
    },
    [],
  )

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOption,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

function useDrawer(): IDrawerContextData {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { DrawerProvider, useDrawer }
