import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Get Started</h1>
          <p className="text-muted-foreground">Create your account to start optimizing your resume</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-primary/10",
            },
          }}
        />
      </div>
    </div>
  )
}
