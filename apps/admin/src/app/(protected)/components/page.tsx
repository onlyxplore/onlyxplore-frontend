import { WebGLFluidGradient, Theme } from "../../../components/ui/webgl-fluid-gradient";

const themes: Theme[] = ["navy", "ocean", "mint", "cream", "gold"];

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Fluid Gradients</h1>
          <p className="text-muted-foreground text-lg">
            A showcase of the WebGL Fluid Gradient component across different themes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div key={theme} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold capitalize tracking-tight">{theme}</h2>
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                  {'<WebGLFluidGradient theme="' + theme + '" />'}
                </span>
              </div>
              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-border shadow-sm group hover:shadow-md transition-shadow">
                <WebGLFluidGradient theme={theme} />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
