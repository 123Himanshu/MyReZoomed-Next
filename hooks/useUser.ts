"use client"

import { useUser as useClerkUser } from "@clerk/nextjs"

export function useUser() {
  const { user, isLoaded, isSignedIn } = useClerkUser()

  return {
    user,
    isLoaded,
    isSignedIn,
    // Add any additional user-related logic here
    displayName:
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.emailAddresses[0]?.emailAddress || "User",
  }
}
