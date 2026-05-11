import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#09090b] grid-pattern flex items-center justify-center p-4">
      <div className="absolute inset-0 gradient-bg" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center neon-glow">
              <span className="text-white text-lg">⚡</span>
            </div>
            <span className="text-2xl font-bold gradient-text">ViralForge AI</span>
          </div>
          <p className="text-zinc-500 text-sm">Sign in to start creating viral content</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-[#111113] border border-zinc-800 rounded-2xl shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-zinc-500",
              socialButtonsBlockButton: "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800",
              formFieldInput: "bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-600",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-500",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              dividerLine: "bg-zinc-800",
              dividerText: "text-zinc-600",
            },
          }}
        />
      </div>
    </div>
  );
}
