export default function LandingPage({ onNavigate }) {
  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] font-sans antialiased selection:bg-[#0070eb] selection:text-[#fefcff]">
      {/* Top Navbar */}
      <header className="bg-[#f9f9fc] shadow-sm fixed top-0 w-full z-50 transition-all">
        <div className="flex justify-between items-center px-8 h-16 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#0058bc] tracking-tight">Ascend</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#414755] hover:text-[#0058bc] transition-colors">Features</a>
            <a href="#about" className="text-[#414755] hover:text-[#0058bc] transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('login')}
              className="hidden md:inline-flex text-[#0058bc] hover:bg-[#e2e2e5] px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-[#0058bc] text-white px-5 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 flex flex-col gap-32">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-8 flex flex-col items-center text-center mt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1c1e] max-w-4xl tracking-tight mb-6">
            Track your fitness. Understand your progress. Reach your goals.
          </h1>
          <p className="text-lg text-[#414755] max-w-2xl mb-10">
            The all-in-one platform for recording workouts, monitoring health, and achieving your fitness targets with absolute clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-[#0058bc] text-white px-8 py-3.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity w-full sm:w-auto font-medium"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-transparent border border-[#c1c6d7] text-[#0058bc] px-8 py-3.5 rounded-lg hover:bg-[#e2e2e5] transition-colors w-full sm:w-auto font-medium"
            >
              Sign In
            </button>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-[1280px] mx-auto px-8" id="features">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[#1a1c1e] mb-4">Intelligent Tracking</h2>
            <p className="text-[#414755]">Everything you need to maintain momentum, organized perfectly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* Progress Analytics */}
            <div className="md:col-span-8 md:row-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-[#0070eb] rounded-full flex items-center justify-center mb-6 text-white font-bold">
                 
                </div>
                <h3 className="text-2xl font-semibold mb-3">Progress Analytics</h3>
                <p className="text-[#414755] max-w-md">Visualize your journey with clarity. Our advanced analytics break down your performance over time.</p>
              </div>
            </div>

            {/* Workout Tracking */}
            <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                
              </div>
              <h3 className="text-lg font-semibold mb-2">Workout Tracking</h3>
              <p className="text-sm text-[#414755]">Log sets, reps, and routines effortlessly with our frictionless interface.</p>
            </div>

            {/* Health Tracking */}
            <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
              <p className="text-sm text-[#414755]">Monitor vitals, sleep, and recovery metrics alongside your active routines.</p>
            </div>

            {/* Goal Tracking */}
            <div className="md:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-1">Goal Tracking</h3>
              <p className="text-sm text-[#414755]">Set specific targets and let Ascend map the trajectory to reach them.</p>
            </div>

            {/* Calorie Tracking */}
            <div className="md:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold mb-1">Calorie Tracking</h3>
              <p className="text-sm text-[#414755]">Understand your energy balance with simple, intuitive nutritional logging.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1280px] mx-auto w-full px-8 mb-12">
          <div className="bg-[#0070eb] rounded-3xl p-12 md:p-20 text-center flex flex-col items-center shadow-lg text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your wellness?</h2>
            <p className="max-w-xl mb-10 text-white/80">Join Ascend Today and start building a healthier, more organized life.</p>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-white text-[#0070eb] px-10 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Join Ascend Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}