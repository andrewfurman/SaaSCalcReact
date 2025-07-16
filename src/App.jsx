
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Tabs from './components/Tabs'
import SalesforceCalculator from './components/SalesforceCalculator'
import EightyNinetyCalculator from './components/EightyNinetyCalculator'

export default function App() {
  const [activeTab, setActiveTab] = useState('salesforce')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <Tabs onTabChange={handleTabChange} />
        
        {activeTab === 'salesforce' ? <SalesforceCalculator /> : <EightyNinetyCalculator />}
      </div>
    </div>
  )
}
