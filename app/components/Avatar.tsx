'use client'
import { User } from '@prisma/client'
import React from 'react'
interface AvatarProps {
    user: User
}

const Avatar:React.FC<AvatarProps> = ({user}) => {
  return (
    <div>
      
    </div>
  )
}

export default Avatar
