
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [sfLicenseCost, setSfLicenseCost] = useState(150)
  const [laborCost, setLaborCost] = useState(100000)
  const [numUsers, setNumUsers] = useState(100)
  const [itAnnualCost, setItAnnualCost] = useState(150000)
  const [itFtes, setItFtes] = useState(3)
  const [opsLaborReduction, setOpsLaborReduction] = useState(25)
  const [itLaborReduction, setItLaborReduction] = useState(15)
  const [calculations, setCalculations] = useState({})

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  useEffect(() => {
    // Salesforce calculations
    const monthlyLicenseCost = sfLicenseCost * numUsers  // $100 per user per month
    const annualLicenseCost = monthlyLicenseCost * 12
    const annualLaborCost = laborCost  // This is the annual labor cost per user
    const totalItCost = itAnnualCost * itFtes     // Annual IT cost per FTE * number of IT FTEs
    const laborCostPerUser = laborCost
    const totalMonthlyCost = monthlyLicenseCost + ((annualLaborCost * numUsers) / 12) + (totalItCost / 12)
    const totalAnnualCost = annualLicenseCost + (annualLaborCost * numUsers) + totalItCost
    const costPerUserPerMonth = totalMonthlyCost / numUsers
    const costPerUserPerYear = totalAnnualCost / numUsers

    // 8090 Software calculations
    const softwareCost8090 = 500000
    const totalOpsLabor = annualLaborCost * numUsers
    const reducedOpsLabor = totalOpsLabor * (1 - opsLaborReduction / 100)
    const reducedItLabor = totalItCost * (1 - itLaborReduction / 100)
    const total8090Cost = softwareCost8090 + reducedOpsLabor + reducedItLabor
    const cost8090PerUser = total8090Cost / numUsers
    const monthlyCost8090 = total8090Cost / 12
    const monthlyCost8090PerUser = monthlyCost8090 / numUsers

    // Savings comparison
    const annualSavings = totalAnnualCost - total8090Cost
    const monthlySavings = totalMonthlyCost - monthlyCost8090
    const savingsPerUser = costPerUserPerYear - cost8090PerUser

    setCalculations({
      // Salesforce calculations
      monthlyLicenseCost,
      annualLicenseCost,
      annualLaborCost,
      totalItCost,
      laborCostPerUser,
      totalMonthlyCost,
      totalAnnualCost,
      costPerUserPerMonth,
      costPerUserPerYear,
      // 8090 calculations
      softwareCost8090,
      totalOpsLabor,
      reducedOpsLabor,
      reducedItLabor,
      total8090Cost,
      cost8090PerUser,
      monthlyCost8090,
      monthlyCost8090PerUser,
      // Savings
      annualSavings,
      monthlySavings,
      savingsPerUser
    })
  }, [sfLicenseCost, laborCost, numUsers, itAnnualCost, itFtes, opsLaborReduction, itLaborReduction])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Cost Comparison Calculator</h1>
          <p className="text-slate-600">Salesforce vs 8090 Software Solutions</p>
        </div>

        {/* Input Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Input Parameters</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Software Licensing */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-4 border-blue-500">Software Licensing</h3>
              <div className="mb-6">
                <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                  SF License Cost per User: 
                  <span className="font-semibold text-blue-600">{formatCurrency(sfLicenseCost)}/month</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="800"
                  value={sfLicenseCost}
                  onChange={(e) => setSfLicenseCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              </div>
            </div>

            {/* Operations Labor */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-4 border-blue-500">Operations Labor</h3>
              <div className="mb-6">
                <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                  Annual Labor Cost: 
                  <span className="font-semibold text-blue-600">{formatCurrency(laborCost)}</span>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="500000"
                  step="5000"
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              </div>
            </div>

            {/* Number of Users */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-4 border-blue-500">User Configuration</h3>
              <div className="mb-6">
                <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                  Number of Users: 
                  <span className="font-semibold text-blue-600">{numUsers}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={numUsers}
                  onChange={(e) => setNumUsers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              </div>
            </div>

            {/* IT Labor */}
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-4 border-blue-500">IT Labor</h3>
              <div className="mb-4">
                <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                  Annual IT Cost per FTE: 
                  <span className="font-semibold text-blue-600">{formatCurrency(itAnnualCost)}</span>
                </label>
                <input
                  type="range"
                  min="80000"
                  max="300000"
                  step="5000"
                  value={itAnnualCost}
                  onChange={(e) => setItAnnualCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                  Number of IT FTEs: 
                  <span className="font-semibold text-blue-600">{itFtes}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={itFtes}
                  onChange={(e) => setItFtes(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                />
              </div>
            </div>

            {/* Labor Reduction */}
            <div className="border-b border-slate-200 pb-6 md:col-span-2">
              <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-4 border-blue-500">Labor Reduction with 8090</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                    Ops Labor Reduction: 
                    <span className="font-semibold text-blue-600">{opsLaborReduction}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={opsLaborReduction}
                    onChange={(e) => setOpsLaborReduction(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                    IT Labor Reduction: 
                    <span className="font-semibold text-blue-600">{itLaborReduction}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={itLaborReduction}
                    onChange={(e) => setItLaborReduction(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Salesforce</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(calculations.totalAnnualCost)}</div>
                  <div className="text-sm opacity-90">Total Annual Cost</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(calculations.costPerUserPerYear)}</div>
                  <div className="text-sm opacity-90">Cost Per User/Year</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">8090 Software</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(calculations.total8090Cost)}</div>
                  <div className="text-sm opacity-90">Total Annual Cost</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(calculations.cost8090PerUser)}</div>
                  <div className="text-sm opacity-90">Cost Per User/Year</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Potential Savings</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(Math.abs(calculations.annualSavings))}</div>
                  <div className="text-sm opacity-90">{calculations.annualSavings >= 0 ? 'Annual Savings' : 'Annual Premium'}</div>
                </div>
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white p-6 rounded-xl">
                  <div className="text-2xl font-bold mb-2">{formatCurrency(Math.abs(calculations.savingsPerUser))}</div>
                  <div className="text-sm opacity-90">{calculations.savingsPerUser >= 0 ? 'Savings Per User' : 'Premium Per User'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4 text-center p-2 bg-slate-100 rounded-lg">Salesforce Breakdown</h4>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h5 className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">Software Licensing</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">License (Annual for {numUsers} users)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.annualLicenseCost)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h5 className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wider">Operations Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Total Labor Cost ({numUsers} users)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.annualLaborCost * numUsers)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h5 className="text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wider">IT Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">IT Cost ({itFtes} FTEs)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.totalItCost)}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Annual Cost</span>
                    <span className="text-lg font-bold">{formatCurrency(calculations.totalAnnualCost)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4 text-center p-2 bg-slate-100 rounded-lg">8090 Software Breakdown</h4>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h5 className="text-xs font-semibold text-orange-600 mb-2 uppercase tracking-wider">Software License</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Annual License</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.softwareCost8090)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h5 className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wider">Reduced Operations Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Total Labor (-{opsLaborReduction}%)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.reducedOpsLabor)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h5 className="text-xs font-semibold text-purple-600 mb-2 uppercase tracking-wider">Reduced IT Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">IT Cost (-{itLaborReduction}%)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.reducedItLabor)}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Annual Cost</span>
                    <span className="text-lg font-bold">{formatCurrency(calculations.total8090Cost)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
