import React, { createContext, useCallback, useContext, useState } from 'react'

interface IDrawerOption {
  icon: string
  path: string
  label: string
}
interface IDrawerContextData {
  isDrawerOpen: boolean
  drawerOptions: IDrawerOption[]
  toggleDrawerOpen: () => void
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

interface IDrawerProviderProps {
  children: React.ReactNode
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  const handleSetDrawerOption = useCallback(
    (newDrawerOption: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOption)
    },
    [],
  )

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
