import { useQuasar } from 'quasar'

export const useFullscreen = () => {
  const {
    isActive: isFullscreen,
    isCapable: isFullscreenAvailable,
    toggle: toggleFullscreen,
  } = useQuasar().fullscreen

  return { isFullscreen, isFullscreenAvailable, toggleFullscreen }
}
