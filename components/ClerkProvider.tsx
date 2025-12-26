
import {
  ClerkProvider,
} from '@clerk/nextjs'

export default function MyClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
   {children}
    </ClerkProvider>
  )
}




