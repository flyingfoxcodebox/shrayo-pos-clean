import React from 'react'

const FoxLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#3B82F6"/>
      <path d="M8 12C8 10.8954 8.89543 10 10 10H22C23.1046 10 24 10.8954 24 12V20C24 21.1046 23.1046 22 22 22H10C8.89543 22 8 21.1046 8 20V12Z" fill="white"/>
      <circle cx="12" cy="16" r="2" fill="#3B82F6"/>
      <circle cx="20" cy="16" r="2" fill="#3B82F6"/>
      <path d="M14 18C14 17.4477 14.4477 17 15 17H17C17.5523 17 18 17.4477 18 18V19C18 19.5523 17.5523 20 17 20H15C14.4477 20 14 19.5523 14 19V18Z" fill="#3B82F6"/>
    </svg>
  )
}

export default FoxLogo
