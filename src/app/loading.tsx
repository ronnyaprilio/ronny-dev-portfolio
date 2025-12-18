export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-background px-8 py-6 shadow-lg">
        
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

        <p className="text-sm text-muted-foreground">
          Loading… please wait
        </p>
      </div>
    </div>
  );
}