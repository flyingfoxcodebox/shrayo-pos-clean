import React from 'react'
import foxLogo from '../assets/fox-logo.png'

const FoxLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  return (
    <img 
      src={foxLogo} 
      alt="Flying Fox Solutions" 
      className={className}
    />
  )
}

export default FoxLogo
