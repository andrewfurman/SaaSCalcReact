import { useState } from 'react'
import './App.css'
import HeaderContent from './components/HeaderContent'
import HeaderTabs from './components/HeaderTabs'
import CostSalesforce from './components/CostSalesforce'
import Cost8090 from './components/Cost8090'
import CostSidebyside from './components/CostSidebyside'

export default function App() {
  const [activeTab, setActiveTab] = useState('salesforce')
  const [users, setUsers] = useState(200)
  const [opsAnnualPerFTE, setOpsAnnualPerFTE] = useState(80000)
  const [itFTEs, setItFTEs] = useState(20)
  const [itAnnualPerFTE, setItAnnualPerFTE] = useState(120000)

  const sfOpsLabor = users * opsAnnualPerFTE
  const sfITLabor = itFTEs * itAnnualPerFTE

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <HeaderContent />
        
        <HeaderTabs onTabChange={handleTabChange} />
        
        {activeTab === 'salesforce' ? (
          <CostSalesforce 
            users={users}
            setUsers={setUsers}
            opsAnnualPerFTE={opsAnnualPerFTE}
            setOpsAnnualPerFTE={setOpsAnnualPerFTE}
            itFTEs={itFTEs}
            setItFTEs={setItFTEs}
            itAnnualPerFTE={itAnnualPerFTE}
            setItAnnualPerFTE={setItAnnualPerFTE}
          />
        ) : activeTab === '8090' ? (
          <Cost8090 
            sfOpsLabor={sfOpsLabor}
            sfITLabor={sfITLabor}
            users={users}
          />
        ) : (
          <CostSidebyside 
            users={users}
            opsAnnualPerFTE={opsAnnualPerFTE}
            itFTEs={itFTEs}
            itAnnualPerFTE={itAnnualPerFTE}
            sfOpsLabor={sfOpsLabor}
            sfITLabor={sfITLabor}
          />
        )}
      </div>
    </div>
  )
}