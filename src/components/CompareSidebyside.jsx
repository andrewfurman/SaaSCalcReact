import CostSalesforce from './CostSalesforce'
import Cost8090 from './Cost8090'

export default function CompareSidebyside({ 
  users, 
  setUsers, 
  opsAnnualPerFTE, 
  setOpsAnnualPerFTE, 
  itFTEs, 
  setItFTEs, 
  itAnnualPerFTE, 
  setItAnnualPerFTE,
  sfOpsLabor,
  sfITLabor
}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Salesforce Calculator */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          ☁️ Salesforce Solution
        </h2>
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
      </div>

      {/* 8090 Calculator */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          🔵 8090 Solution
        </h2>
        <Cost8090 
          sfOpsLabor={sfOpsLabor}
          sfITLabor={sfITLabor}
          users={users}
        />
      </div>
    </div>
  )
}