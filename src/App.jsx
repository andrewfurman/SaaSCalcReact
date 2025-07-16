import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Tabs from './components/Tabs'
import SalesforceCalculator from './components/SalesforceCalculator'
import EightyNinetyCalculator from './components/EightyNinetyCalculator'

export default function App() {
  const [activeTab, setActiveTab] = useState('8090')
  const [users, setUsers] = useState(100)
  const [opsAnnualPerFTE, setOpsAnnualPerFTE] = useState(80000)
  const [itFTEs, setItFTEs] = useState(10)
  const [itAnnualPerFTE, setItAnnualPerFTE] = useState(120000)

  const sfOpsLabor = users * opsAnnualPerFTE
  const sfITLabor = itFTEs * itAnnualPerFTE

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <Tabs onTabChange={handleTabChange} />
        
        {activeTab === 'salesforce' ? (
          <SalesforceCalculator 
            users={users}
            setUsers={setUsers}
            opsAnnualPerFTE={opsAnnualPerFTE}
            setOpsAnnualPerFTE={setOpsAnnualPerFTE}
            itFTEs={itFTEs}
            setItFTEs={setItFTEs}
            itAnnualPerFTE={itAnnualPerFTE}
            setItAnnualPerFTE={setItAnnualPerFTE}
          />
        ) : (
          <EightyNinetyCalculator 
            sfOpsLabor={sfOpsLabor}
            sfITLabor={sfITLabor}
            users={users}
          />
        )}
      </div>
    </div>
  )
}