export default function HeaderTabs({ activeTab, onTabChange }) {
  const handleTabClick = (tab) => {
    onTabChange(tab)
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-2">
        <button
          onClick={() => handleTabClick('introduction')}
          className={`relative w-48 py-3 font-semibold transition-all duration-200 text-center ${
            activeTab === 'introduction'
              ? 'bg-white text-black shadow-lg z-10'
              : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800'
          }`}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
          }}
        >
          📖 Introduction
        </button>
        <button
          onClick={() => handleTabClick('salesforce')}
          className={`relative w-48 py-3 font-semibold transition-all duration-200 text-center ${
            activeTab === 'salesforce'
              ? 'bg-white text-black shadow-lg z-10'
              : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800'
          }`}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
          }}
        >
          ☁️ Salesforce Cost
        </button>
        <button
          onClick={() => handleTabClick('8090')}
          className={`relative w-48 py-3 font-semibold transition-all duration-200 text-center ${
            activeTab === '8090'
              ? 'bg-white text-black shadow-lg z-10'
              : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800'
          }`}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
          }}
        >
          🔵 8090 Cost
        </button>
        <button
          onClick={() => handleTabClick('compare')}
          className={`relative w-48 py-3 font-semibold transition-all duration-200 text-center ${
            activeTab === 'compare'
              ? 'bg-white text-black shadow-lg z-10'
              : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800'
          }`}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
          }}
        >
          ↔️ Compare Costs
        </button>
      </div>
    </div>
  )
}