import React, { useState } from 'react'

export function useSignUp() {
    const [error, setError] = useState(null)
    const [loading, setIsLoading] = useState(false)

    const signUp = async (email, password, displayName) => {

    }
  return (
    <div>useSignUp</div>
  )
}

