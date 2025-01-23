import { useEffect, useState } from 'react'
import { onValue, off, Query } from 'firebase/database'
import React from 'react'

type FirebaseData<T> = T & { id: string }

function useFirebaseRealtimeMultiple<T>(
  firebaseQuery: Query
): FirebaseData<T>[] {
  const [data, setData] = useState<FirebaseData<T>[]>([])

  useEffect(() => {
    const unsubscribe = onValue(firebaseQuery, (snapshot) => {
      const items: FirebaseData<T>[] = []
      snapshot.forEach((childSnapshot) => {
        items.push({ id: childSnapshot.key as string, ...childSnapshot.val() })
      })
      setData(items)
    })

    return () => {
      off(firebaseQuery, 'value', unsubscribe)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

function useFirebaseRealtimeValue<T>(firebaseQuery: Query): T | null {
  const [data, setData] = React.useState<T | null>(null)

  React.useEffect(() => {
    const unsubscribe = onValue(firebaseQuery, (snapshot) => {
      setData(snapshot.val())
    })

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}

export { useFirebaseRealtimeValue, useFirebaseRealtimeMultiple }
