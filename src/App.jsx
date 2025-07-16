
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Tailwind CSS
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Build modern, responsive websites with the utility-first CSS framework that gives you complete control over your design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200">
              Learn More
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Development</h3>
              <p className="text-white/80">Build your designs directly in your markup with utility classes.</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Responsive Design</h3>
              <p className="text-white/80">Every utility class can be applied conditionally at different screen sizes.</p>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customizable</h3>
              <p className="text-white/80">Easily customize your design system with configuration files.</p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center space-x-6">
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>React</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              <span>Vite</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
