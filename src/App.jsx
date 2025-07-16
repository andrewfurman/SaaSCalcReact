
import { useState } from 'react'
import './App.css'

export default function App() {
  const [users, setUsers] = useState(100)
  const [licenseRate, setLicenseRate] = useState(100)
  const [opsFTEs, setOpsFTEs] = useState(3)
  const [opsAnnualPerFTE, setOpsAnnualPerFTE] = useState(80000)
  const [itFTEs, setItFTEs] = useState(10)
  const [itAnnualPerFTE, setItAnnualPerFTE] = useState(120000)

  const sfLicenseAnnual = users * licenseRate * 12
  const sfOpsLabor = users * opsAnnualPerFTE
  const sfITLabor = itFTEs * itAnnualPerFTE
  const sfTotalAnnual = sfLicenseAnnual + sfOpsLabor + sfITLabor

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDollarInput = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleDollarInput = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    if (numericValue === '') {
      setter(0)
    } else {
      setter(parseInt(numericValue))
    }
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Salesforce Cost Calculator
          </h1>
          <p className="text-gray-400">
            Calculate your annual Salesforce total cost of ownership
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Users Input at Top */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-black mb-4">Total Users</h3>
              <div className="max-w-md mx-auto">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={users}
                  onChange={(e) => setUsers(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0</span>
                  <span className="font-bold text-black text-2xl">{users} users</span>
                  <span>1000</span>
                </div>
              </div>
            </div>
          </div>

          {/* License Costs Row */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-black mb-4">License Costs</h3>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    License $/user/month
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    step="10"
                    value={licenseRate}
                    onChange={(e) => setLicenseRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>$50</span>
                    <span className="font-semibold text-black">${licenseRate}/user/month</span>
                    <span>$150</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black">×</div>
                <div className="text-sm text-gray-600 mt-1">multiply</div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-black mb-2">
                  # of Users
                </label>
                <div className="text-2xl font-bold text-black">{users}</div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black">× 12</div>
                <div className="text-sm text-gray-600 mt-1">months</div>
              </div>
              
              <div className="lg:col-span-1 flex items-center justify-center gap-3">
                <div className="text-2xl font-bold text-black">=</div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
                  <div className="text-lg font-bold text-black text-center">{formatCurrency(sfLicenseAnnual)}</div>
                  <div className="text-xs text-gray-600 mt-1 text-center">annual</div>
                </div>
              </div>
            </div>
          </div>

          {/* Operations Labor Row */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-black mb-4">Operations Labor</h3>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Salary and Overhead per Ops Team Member
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="150000"
                    step="5000"
                    value={opsAnnualPerFTE}
                    onChange={(e) => setOpsAnnualPerFTE(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>$50k</span>
                    <span className="font-semibold text-black">{formatCurrency(opsAnnualPerFTE)}/year</span>
                    <span>$150k</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black">×</div>
                <div className="text-sm text-gray-600 mt-1">multiply</div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-black mb-2">
                  # Of Ops FTEs
                </label>
                <div className="text-2xl font-bold text-black">{users}</div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black invisible">× 12</div>
                <div className="text-sm text-gray-600 mt-1 invisible">months</div>
              </div>
              
              <div className="lg:col-span-1 flex items-center justify-center gap-3">
                <div className="text-2xl font-bold text-black">=</div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
                  <div className="text-lg font-bold text-black text-center">{formatCurrency(sfOpsLabor)}</div>
                  <div className="text-xs text-gray-600 mt-1 text-center">annual</div>
                </div>
              </div>
            </div>
          </div>

          {/* IT Labor Row */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-black mb-4">IT Labor</h3>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Salary and Overhead per IT Team Member
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="150000"
                    step="5000"
                    value={itAnnualPerFTE}
                    onChange={(e) => setItAnnualPerFTE(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>$50k</span>
                    <span className="font-semibold text-black">{formatCurrency(itAnnualPerFTE)}/year</span>
                    <span>$150k</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black">×</div>
                <div className="text-sm text-gray-600 mt-1">multiply</div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-black mb-2">
                  # IT FTEs
                </label>
                <input
                  type="number"
                  value={itFTEs}
                  onChange={(e) => setItFTEs(Number(e.target.value))}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center"
                  min="1"
                  max="50"
                  placeholder="2"
                />
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-black invisible">× 12</div>
                <div className="text-sm text-gray-600 mt-1 invisible">months</div>
              </div>
              
              <div className="lg:col-span-1 flex items-center justify-center gap-3">
                <div className="text-2xl font-bold text-black">=</div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
                  <div className="text-lg font-bold text-black text-center">{formatCurrency(sfITLabor)}</div>
                  <div className="text-xs text-gray-600 mt-1 text-center">annual</div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Row */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-600">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-white mb-2">Total Annual Cost</h3>
                <div className="text-sm text-gray-400">
                  License Costs + Operations Labor + IT Labor
                </div>
              </div>
              
              <div className="lg:col-span-1"></div>
              <div className="lg:col-span-1"></div>
              <div className="lg:col-span-1"></div>
              
              <div className="lg:col-span-1 flex items-center justify-center gap-3">
                <div className="text-2xl font-bold text-white">=</div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
                  <div className="text-lg font-bold text-black text-center">{formatCurrency(sfTotalAnnual)}</div>
                  <div className="text-xs text-gray-600 mt-1 text-center">total annual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
