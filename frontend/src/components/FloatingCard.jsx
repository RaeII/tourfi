export default function FloatingCard() {
  return (
    <div className="md:w-2/5 flex justify-center">
    <div className="relative perspective-1000">
      <div className="relative w-full max-w-sm mx-auto animate-float-slow">
        {/* Card glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600 blur-xl opacity-30 animate-pulse"></div>
        
        {/* Credit card */}
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 border border-yellow-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full filter blur-2xl opacity-20"></div>
          
          <div className="relative">
            {/* Card chip */}
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1 overflow-hidden shadow-inner">
                <div className="bg-black/20 rounded-sm"></div>
                <div className="bg-black/10 rounded-sm"></div>
                <div className="bg-black/10 rounded-sm"></div>
                <div className="bg-black/20 rounded-sm"></div>
              </div>
              <div className="flex space-x-1">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 backdrop-blur-sm"></div>
                <div className="w-5 h-5 rounded-full bg-yellow-600/20 backdrop-blur-sm"></div>
              </div>
            </div>
            
            {/* Card number */}
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-2">
                <div className="text-gray-400 font-mono text-center">
                  <span className="text-xs block mb-1 text-gray-500">BNB</span>
                  <span className="text-sm text-white">••••</span>
                </div>
                <div className="text-gray-400 font-mono text-center">
                  <span className="text-xs block mb-1 text-gray-500">CHAIN</span>
                  <span className="text-sm text-white">••••</span>
                </div>
                <div className="text-gray-400 font-mono text-center">
                  <span className="text-xs block mb-1 text-gray-500">WEB</span>
                  <span className="text-sm text-white">••••</span>
                </div>
                <div className="text-gray-400 font-mono text-center">
                  <span className="text-xs block mb-1 text-gray-500">3.0</span>
                  <span className="text-sm text-white">••••</span>
                </div>
              </div>
            </div>
            
            {/* Card info */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-xs mb-1">CARD HOLDER</p>
                <p className="text-white text-sm font-medium">TRAVEL PRO</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-gray-500 text-xs mb-1">EXPIRES</p>
                <p className="text-white text-sm font-medium">∞/∞</p>
              </div>
            </div>
            
            {/* Card logo */}
            <div className="absolute bottom-1 right-1 text-white font-bold text-base">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">TOURFI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
