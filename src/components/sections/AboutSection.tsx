import { ProfileData } from "@/types/profile";

export default function AboutSection({profile} : {profile: ProfileData}) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 overflow-hidden py-24">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20"></div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent leading-tight">
              {profile.greetings}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {profile.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg prose-invert max-w-none">
                {profile.about_me.split('\n').map((line, idx) => (
                  <p key={idx} className="text-gray-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">What I Bring to the Table</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                      <span className="text-gray-300">Problem Solving</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                      <span className="text-gray-300">Clean Code</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                      <span className="text-gray-300">Team Collaboration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-lime-400 to-green-400 rounded-full"></div>
                      <span className="text-gray-300">Continuous Learning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}