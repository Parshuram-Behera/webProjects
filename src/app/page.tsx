"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string>("No data fetched yet. Click the button to fetch data.")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`) 
      }

      const data = await response.json()
      setApiResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setApiResponse(`Error fetching data: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-3xl mx-[15%] shadow-lg rounded-lg border bg-white px-6 py-4 h-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">API Response Viewer</CardTitle>
          <CardDescription>Click the button below to fetch data from an API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={fetchData} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching Data...
              </>
            ) : (
              "Fetch API Data"
            )}
          </Button>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Response:</h2>
            <pre className="bg-gray-200 p-4 rounded-md overflow-auto max-h-[300px] text-sm whitespace-pre-wrap">{apiResponse}</pre>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
