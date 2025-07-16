import { useState } from 'react'

export default function HeaderTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('compare')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
        <button
          onClick={() => handleTabClick('salesforce')}
          className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
            activeTab === 'salesforce'
              ? 'bg-white text-black shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          ☁️ Salesforce Cost
        </button>
        <button
          onClick={() => handleTabClick('8090')}
          className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
            activeTab === '8090'
              ? 'bg-white text-black shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          🔵 8090 Cost
        </button>
        <button
          onClick={() => handleTabClick('compare')}
          className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
            activeTab === 'compare'
              ? 'bg-white text-black shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          ↔️ Side by Side
        </button>
      </div>
    </div>
  )
}