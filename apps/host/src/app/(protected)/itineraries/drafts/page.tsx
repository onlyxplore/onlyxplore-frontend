import { Card } from "@/components/ui/card"
import { FileEdit } from "lucide-react"

export default function DraftsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0A3D62]">Drafts</h1>
        <p className="text-muted-foreground mt-1">Pick up right where you left off.</p>
      </div>

      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed bg-white/50 border-gray-200 mt-4">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FileEdit className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No drafts found</h3>
        <p className="text-gray-500 max-w-sm">
          Any itineraries you start but don&apos;t publish will appear here.
        </p>
      </Card>
    </div>
  )
}
