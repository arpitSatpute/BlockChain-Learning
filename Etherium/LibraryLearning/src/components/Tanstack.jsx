import React from 'react'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function getter() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const data = await response.json();

}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
    </QueryClientProvider>
  )
}

function Posts() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: getter,
    refetchInterval: 10000
  });

  if(error) {
    return <>
      <h2>Error fetching posts</h2>
    </>
  }
}

export default App