'use client'

import { useEffect, useState } from 'react'

export default function QdrantTest() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('http://16.16.63.182:8000/qdrant-connection')
      .then(res => res.json())
      .then(setData)
      .catch(err => setData({ error: err.message }))
  }, [])

  return (
    <main className="p-10">
      <h1 className="text-xl font-bold mb-4">Qdrant Connection Test</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
