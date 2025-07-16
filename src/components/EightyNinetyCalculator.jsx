import { useState } from 'react'

export default function EightyNinetyCalculator({ sfOpsLabor, sfITLabor, users }) {
  const [licenseAnnual, setLicenseAnnual] = useState(500000)
  const [opsReductionRate, setOpsReductionRate] = useState(50)
  const [itReductionRate, setItReductionRate] = useState(50)

  const reducedUsers = Math.round(users * ((100 - opsReductionRate) / 100))
  const eightyNinetyOpsLabor = sfOpsLabor * ((100 - opsReductionRate) / 100)
  const eightyNinetyITLabor = sfITLabor * ((100 - itReductionRate) / 100)
  const eightyNinetyTotalAnnual = licenseAnnual + eightyNinetyOpsLabor + eightyNinetyITLabor

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Users Display at Top */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-black mb-4">Total Users</h3>
          <div className="text-3xl font-bold text-black">{reducedUsers} users</div>
          <div className="text-sm text-gray-600 mt-2">
            Reduced by {opsReductionRate}% from Salesforce ({users} users)
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
                Annual Software License
              </label>
              <input
                type="range"
                min="500000"
                max="2000000"
                step="100000"
                value={licenseAnnual}
                onChange={(e) => setLicenseAnnual(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>$500k</span>
                <span className="font-semibold text-black">{formatCurrency(licenseAnnual)}/year</span>
                <span>$2M</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black invisible">×</div>
            <div className="text-sm text-gray-600 mt-1 invisible">multiply</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-black mb-2 invisible">
              # of Users
            </label>
            <div className="text-2xl font-bold text-black invisible">{users}</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black invisible">× 12</div>
            <div className="text-sm text-gray-600 mt-1 invisible">months</div>
          </div>
          
          <div className="lg:col-span-1 flex items-center justify-center gap-3">
            <div className="text-2xl font-bold text-black">=</div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
              <div className="text-lg font-bold text-black text-center">{formatCurrency(licenseAnnual)}</div>
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
                Reduction from Salesforce (20-80%)
              </label>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={opsReductionRate}
                onChange={(e) => setOpsReductionRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>20%</span>
                <span className="font-semibold text-black">{opsReductionRate}% reduction</span>
                <span>80%</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black">×</div>
            <div className="text-sm text-gray-600 mt-1">apply to</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-black mb-2">
              SF Ops Labor
            </label>
            <div className="text-lg font-bold text-black">{formatCurrency(sfOpsLabor)}</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black invisible">× 12</div>
            <div className="text-sm text-gray-600 mt-1 invisible">months</div>
          </div>
          
          <div className="lg:col-span-1 flex items-center justify-center gap-3">
            <div className="text-2xl font-bold text-black">=</div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
              <div className="text-lg font-bold text-black text-center">{formatCurrency(eightyNinetyOpsLabor)}</div>
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
                Reduction from Salesforce (20-80%)
              </label>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={itReductionRate}
                onChange={(e) => setItReductionRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>20%</span>
                <span className="font-semibold text-black">{itReductionRate}% reduction</span>
                <span>80%</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black">×</div>
            <div className="text-sm text-gray-600 mt-1">apply to</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <label className="block text-sm font-medium text-black mb-2">
              SF IT Labor
            </label>
            <div className="text-lg font-bold text-black">{formatCurrency(sfITLabor)}</div>
          </div>
          
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-black invisible">× 12</div>
            <div className="text-sm text-gray-600 mt-1 invisible">months</div>
          </div>
          
          <div className="lg:col-span-1 flex items-center justify-center gap-3">
            <div className="text-2xl font-bold text-black">=</div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
              <div className="text-lg font-bold text-black text-center">{formatCurrency(eightyNinetyITLabor)}</div>
              <div className="text-xs text-gray-600 mt-1 text-center">annual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Row */}
      <div className="bg-blue-800 rounded-2xl p-6 shadow-xl border border-blue-600">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">Total Annual Cost</h3>
            <div className="text-sm text-blue-200">
              Licenses + Ops Labor + IT Labor
            </div>
          </div>
          
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-1"></div>
          
          <div className="lg:col-span-1 flex items-center justify-center gap-3">
            <div className="text-2xl font-bold text-white">=</div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-40 h-20 flex flex-col justify-center">
              <div className="text-lg font-bold text-black text-center">{formatCurrency(eightyNinetyTotalAnnual)}</div>
              <div className="text-xs text-gray-600 mt-1 text-center">total annual</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}