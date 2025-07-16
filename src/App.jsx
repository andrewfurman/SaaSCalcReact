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
  
  // Salesforce specific states
  const [licenseRate, setLicenseRate] = useState(100)
  
  // 8090 specific states
  const [licenseAnnual, setLicenseAnnual] = useState(500000)
  const [opsReductionRate, setOpsReductionRate] = useState(50)
  const [itReductionRate, setItReductionRate] = useState(50)

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
            licenseRate={licenseRate}
            setLicenseRate={setLicenseRate}
          />
        ) : activeTab === '8090' ? (
          <Cost8090 
            sfOpsLabor={sfOpsLabor}
            sfITLabor={sfITLabor}
            users={users}
            licenseAnnual={licenseAnnual}
            setLicenseAnnual={setLicenseAnnual}
            opsReductionRate={opsReductionRate}
            setOpsReductionRate={setOpsReductionRate}
            itReductionRate={itReductionRate}
            setItReductionRate={setItReductionRate}
          />
        ) : (
          <CostSidebyside 
            users={users}
            opsAnnualPerFTE={opsAnnualPerFTE}
            itFTEs={itFTEs}
            itAnnualPerFTE={itAnnualPerFTE}
            sfOpsLabor={sfOpsLabor}
            sfITLabor={sfITLabor}
            licenseRate={licenseRate}
            licenseAnnual={licenseAnnual}
            opsReductionRate={opsReductionRate}
            itReductionRate={itReductionRate}
          />
        )}
      </div>
    </div>
  )
}