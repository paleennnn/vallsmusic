'use client'
import { useAuthModal } from '@/store/playerStore'
import AuthModal from './AuthModal'

export default function AuthModalWrapper() {
  const { isOpen, close } = useAuthModal()
  if (!isOpen) return null
  return <AuthModal onClose={close} />
}