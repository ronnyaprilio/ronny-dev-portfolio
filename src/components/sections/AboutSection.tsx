import { ProfileData } from "@/types/profile";

export default function AboutSection({profile} : {profile: ProfileData}) {
  return (
    <section id="home" className="py-24 bg-linear-to-b from-slate-900 to-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent leading-tight">
              {profile.greetings}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {profile.description}
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-1 md:order-1">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <div className="w-40 h-40 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-linear-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
              </div>
            </div>

            <div className="space-y-6 order-2 md:order-2">
              <div className="prose prose-lg prose-invert max-w-none">
                {profile.about_me.split('\n').map((line, idx) => (
                  <p key={idx} className="text-gray-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              <div className="flex justify-center mt-12 gap-8 flex-wrap">
                <div className="w-32 h-32 flex items-center justify-center text-center bg-emerald-500/20 text-emerald-300 text-lg font-medium rounded-full border border-emerald-500/30">
                  Innovative
                </div>

                <div className="w-32 h-32 flex items-center justify-center text-center bg-emerald-500/20 text-emerald-300 text-lg font-medium rounded-full border border-emerald-500/30">
                  Builder
                </div>

                <div className="w-32 h-32 flex items-center justify-center text-center bg-emerald-500/20 text-emerald-300 text-base font-medium rounded-full border border-emerald-500/30 px-3">
                  Problem Solver
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}