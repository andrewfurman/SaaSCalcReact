
export default function CostSidebyside({ 
  users, 
  opsAnnualPerFTE, 
  itFTEs, 
  itAnnualPerFTE,
  sfOpsLabor,
  sfITLabor,
  licenseRate,
  licenseAnnual,
  opsReductionRate,
  itReductionRate
}) {
  // Salesforce calculations (using actual values from state)
  const sfLicenseAnnual = users * licenseRate * 12
  const sfTotalAnnual = sfLicenseAnnual + sfOpsLabor + sfITLabor

  // 8090 calculations (using actual values from state)
  const reducedUsers = Math.round(users * ((100 - opsReductionRate) / 100))
  const eightyNinetyOpsLabor = sfOpsLabor * ((100 - opsReductionRate) / 100)
  const eightyNinetyITLabor = sfITLabor * ((100 - itReductionRate) / 100)
  const eightyNinetyTotalAnnual = licenseAnnual + eightyNinetyOpsLabor + eightyNinetyITLabor

  // Savings calculations
  const licenseSavings = sfLicenseAnnual - licenseAnnual
  const opsLaborSavings = sfOpsLabor - eightyNinetyOpsLabor
  const itLaborSavings = sfITLabor - eightyNinetyITLabor
  const totalSavings = sfTotalAnnual - eightyNinetyTotalAnnual

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
      {/* Headers Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">☁️ Salesforce Solution</h2>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">🔵 8090 Solution</h2>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">💰 Savings with 8090</h2>
        </div>
      </div>

      {/* Users Row */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Total Users</h3>
            <div className="text-3xl font-bold text-black">{users} users</div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-black mb-4">Total Users</h3>
            <div className="text-3xl font-bold text-black">{reducedUsers} users</div>
            <div className="text-sm text-gray-600 mt-2">
              Reduced by {opsReductionRate}% from Salesforce
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">User Efficiency</h3>
            <div className="text-3xl font-bold text-green-600">⬇️ {users - reducedUsers}</div>
            <div className="text-lg text-gray-600 mt-2">
              fewer users needed
            </div>
          </div>
        </div>
      </div>

      {/* License Row */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">License Costs</h3>
            <div className="text-lg text-gray-600 mb-2">
              ${licenseRate}/user/month × {users} users × 12 months
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(sfLicenseAnnual)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">License Costs</h3>
            <div className="text-lg text-gray-600 mb-2">
              Annual Software License
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(licenseAnnual)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">
              {licenseSavings >= 0 ? 'License Savings' : 'License Cost Increase'}
            </h3>
            <div className="text-lg text-gray-600 mb-2">
              Salesforce - 8090 License
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className={`text-3xl font-bold text-center ${licenseSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {licenseSavings >= 0 ? '⬇️' : '⬆️'} {formatCurrency(Math.abs(licenseSavings))}
              </div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Labor Row */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Operations Labor</h3>
            <div className="text-lg text-gray-600 mb-2">
              {formatCurrency(opsAnnualPerFTE)}/year × {users} users
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(sfOpsLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Operations Labor</h3>
            <div className="text-lg text-gray-600 mb-2">
              SF Ops Labor × {100 - opsReductionRate}% reduction
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(eightyNinetyOpsLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">Ops Labor Savings</h3>
            <div className="text-lg text-gray-600 mb-2">
              {opsReductionRate}% reduction in operations
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-green-600 text-center">⬇️ {formatCurrency(sfOpsLabor - eightyNinetyOpsLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
        </div>
      </div>

      {/* IT Labor Row */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">IT Labor</h3>
            <div className="text-lg text-gray-600 mb-2">
              {formatCurrency(itAnnualPerFTE)}/year × {itFTEs} FTEs
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(sfITLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">IT Labor</h3>
            <div className="text-lg text-gray-600 mb-2">
              SF IT Labor × {100 - itReductionRate}% reduction
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(eightyNinetyITLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-black mb-4">IT Labor Savings</h3>
            <div className="text-lg text-gray-600 mb-2">
              {itReductionRate}% reduction in IT support
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-green-600 text-center">⬇️ {formatCurrency(sfITLabor - eightyNinetyITLabor)}</div>
              <div className="text-xs text-gray-600 text-center">annual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Row */}
      <div className="bg-black rounded-2xl p-6 shadow-xl border border-white">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Cost With Salesforce</h3>
            <div className="text-sm text-gray-400 mb-4">
              License + Ops Labor + IT Labor
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(sfTotalAnnual)}</div>
              <div className="text-xs text-gray-600 text-center">total annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Cost With 8090</h3>
            <div className="text-sm text-gray-400 mb-4">
              License + Ops Labor + IT Labor
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <div className="text-3xl font-bold text-black text-center">{formatCurrency(eightyNinetyTotalAnnual)}</div>
              <div className="text-xs text-gray-600 text-center">total annual</div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              {totalSavings >= 0 ? 'Annual Savings With 8090' : 'Annual Cost Increase With 8090'}
            </h3>
            <div className="text-sm text-gray-400 mb-4">
              Salesforce Total - 8090 Total
            </div>
            <div className={`p-4 rounded-lg border border-gray-300 ${totalSavings >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`text-3xl font-bold text-center ${totalSavings >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                {totalSavings >= 0 ? '⬇️' : '⬆️'} {formatCurrency(Math.abs(totalSavings))}
              </div>
              <div className={`text-xs text-center ${totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalSavings >= 0 ? 'saved annually' : 'additional cost annually'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}