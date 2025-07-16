
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [sfLicenseCost, setSfLicenseCost] = useState(150)
  const [laborCost, setLaborCost] = useState(100000)
  const [numUsers, setNumUsers] = useState(100)
  const [itAnnualCost, setItAnnualCost] = useState(150000)
  const [itFtes, setItFtes] = useState(3)

  // 8090 Software comparison inputs
  const [opsLaborReduction, setOpsLaborReduction] = useState(30) // percentage
  const [itLaborReduction, setItLaborReduction] = useState(25) // percentage

  const [calculations, setCalculations] = useState({
    monthlyLicenseCost: 0,
    annualLicenseCost: 0,
    annualLaborCost: 0,
    laborCostPerUser: 0,
    itConfigCost: 0,
    totalMonthlyCost: 0,
    totalAnnualCost: 0,
    costPerUserPerMonth: 0,
    costPerUserPerYear: 0
  })

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
      monthlyLicenseCost,
      annualLicenseCost,
      annualLaborCost,
      laborCostPerUser,
      totalItCost,
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
      annualSavings,
      monthlySavings,
      savingsPerUser
    })
  }, [sfLicenseCost, laborCost, numUsers, itAnnualCost, itFtes, opsLaborReduction, itLaborReduction])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Salesforce Total Cost Calculator</h1>
        <p className="text-slate-600">Calculate your complete Salesforce investment</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 pb-2 border-b-2 border-slate-200">Input Parameters</h2>

          <div className="mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-3 border-blue-500">Software Licensing</h3>
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider::-webkit-slider-thumb:appearance-none slider::-webkit-slider-thumb:h-5 slider::-webkit-slider-thumb:w-5 slider::-webkit-slider-thumb:rounded-full slider::-webkit-slider-thumb:bg-blue-500"
              />
            </div>
          </div>

          <div className="mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-3 border-blue-500">Operations Labor</h3>
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mb-6 pb-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-slate-100 rounded-md border-l-3 border-blue-500">IT Labor</h3>
            <div className="mb-6">
              <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                Annual IT Labor Cost: 
                <span className="font-semibold text-blue-600">{formatCurrency(itAnnualCost)}</span>
              </label>
              <input
                type="range"
                min="100000"
                max="500000"
                step="10000"
                value={itAnnualCost}
                onChange={(e) => setItAnnualCost(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                Number of IT FTEs: 
                <span className="font-semibold text-blue-600">{itFtes}</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={itFtes}
                onChange={(e) => setItFtes(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 px-3 py-2 bg-yellow-100 rounded-md border-l-3 border-yellow-500">8090 Software Comparison</h3>
            
            <div className="mb-6">
              <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                Ops Labor Reduction: 
                <span className="font-semibold text-blue-600">{opsLaborReduction}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={opsLaborReduction}
                onChange={(e) => setOpsLaborReduction(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label className="flex justify-between items-center font-medium text-slate-700 mb-2 text-sm">
                IT Labor Reduction: 
                <span className="font-semibold text-blue-600">{itLaborReduction}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="70"
                step="5"
                value={itLaborReduction}
                onChange={(e) => setItLaborReduction(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

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

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h5 className="text-xs font-semibold text-amber-600 mb-2 uppercase tracking-wider">IT Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Total IT Cost ({itFtes} FTEs)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.totalItCost)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-4 text-center p-2 bg-slate-100 rounded-lg">8090 Software Breakdown</h4>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h5 className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">Software Cost</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Annual License</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.softwareCost8090)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h5 className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wider">Reduced Operations Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Reduced Labor ({opsLaborReduction}% savings)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.reducedOpsLabor)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h5 className="text-xs font-semibold text-amber-600 mb-2 uppercase tracking-wider">Reduced IT Labor</h5>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-sm text-slate-600 font-medium">Reduced IT ({itLaborReduction}% savings)</span>
                    <span className="text-sm font-bold text-slate-800">{formatCurrency(calculations.reducedItLabor)}</span>
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
