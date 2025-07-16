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
    <div className="calculator-container">
      <header className="header">
        <h1>Salesforce Total Cost Calculator</h1>
        <p>Calculate your complete Salesforce investment</p>
      </header>

      <div className="main-content">
        <div className="inputs-section">
          <h2>Input Parameters</h2>

          <div className="input-category">
            <h3>Software Licensing</h3>
            <div className="slider-group">
              <label>SF License Cost per User: <span className="value">{formatCurrency(sfLicenseCost)}/month</span></label>
              <input
                type="range"
                min="100"
                max="800"
                value={sfLicenseCost}
                onChange={(e) => setSfLicenseCost(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="input-category">
            <h3>Operations Labor</h3>
            <div className="slider-group">
              <label>Annual Labor Cost: <span className="value">{formatCurrency(laborCost)}</span></label>
              <input
                type="range"
                min="50000"
                max="500000"
                step="5000"
                value={laborCost}
                onChange={(e) => setLaborCost(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="slider-group">
              <label>Number of Users: <span className="value">{numUsers}</span></label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={numUsers}
                onChange={(e) => setNumUsers(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="input-category">
            <h3>IT Labor</h3>
            <div className="slider-group">
              <label>Annual IT Labor Cost: <span className="value">{formatCurrency(itAnnualCost)}</span></label>
              <input
                type="range"
                min="100000"
                max="500000"
                step="10000"
                value={itAnnualCost}
                onChange={(e) => setItAnnualCost(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="slider-group">
              <label>Number of IT FTEs: <span className="value">{itFtes}</span></label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={itFtes}
                onChange={(e) => setItFtes(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          <div className="comparison-section">
            <h3>8090 Software Comparison</h3>
            
            <div className="slider-group">
              <label>Ops Labor Reduction: <span className="value">{opsLaborReduction}%</span></label>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={opsLaborReduction}
                onChange={(e) => setOpsLaborReduction(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="slider-group">
              <label>IT Labor Reduction: <span className="value">{itLaborReduction}%</span></label>
              <input
                type="range"
                min="0"
                max="70"
                step="5"
                value={itLaborReduction}
                onChange={(e) => setItLaborReduction(Number(e.target.value))}
                className="slider"
              />
            </div>

            
          </div>
        </div>

        <div className="results-section">
          <div className="comparison-grid">
            <div className="salesforce-summary">
              <h3>Salesforce</h3>
              <div className="cost-summary">
                <div className="total-cost sf">
                  <div className="cost-value">{formatCurrency(calculations.totalAnnualCost)}</div>
                  <div className="cost-label">Total Annual Cost</div>
                </div>
                <div className="per-user-cost sf">
                  <div className="cost-value">{formatCurrency(calculations.costPerUserPerYear)}</div>
                  <div className="cost-label">Cost Per User/Year</div>
                </div>
              </div>
            </div>

            <div className="software-8090-summary">
              <h3>8090 Software</h3>
              <div className="cost-summary">
                <div className="total-cost alt">
                  <div className="cost-value">{formatCurrency(calculations.total8090Cost)}</div>
                  <div className="cost-label">Total Annual Cost</div>
                </div>
                <div className="per-user-cost alt">
                  <div className="cost-value">{formatCurrency(calculations.cost8090PerUser)}</div>
                  <div className="cost-label">Cost Per User/Year</div>
                </div>
              </div>
            </div>

            <div className="savings-summary">
              <h3>Potential Savings</h3>
              <div className="cost-summary">
                <div className="total-cost savings">
                  <div className="cost-value">{formatCurrency(Math.abs(calculations.annualSavings))}</div>
                  <div className="cost-label">{calculations.annualSavings >= 0 ? 'Annual Savings' : 'Annual Premium'}</div>
                </div>
                <div className="per-user-cost savings">
                  <div className="cost-value">{formatCurrency(Math.abs(calculations.savingsPerUser))}</div>
                  <div className="cost-label">{calculations.savingsPerUser >= 0 ? 'Savings Per User' : 'Premium Per User'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="breakdown-comparison">
            <div className="breakdown-column">
              <h4>Salesforce Breakdown</h4>
              <div className="breakdown-category">
                <h5>Software Licensing</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">License (Annual for {numUsers} users)</span>
                  <span className="breakdown-value">{formatCurrency(calculations.annualLicenseCost)}</span>
                </div>
              </div>

              <div className="breakdown-category">
                <h5>Operations Labor</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">Total Labor Cost ({numUsers} users)</span>
                  <span className="breakdown-value">{formatCurrency(calculations.annualLaborCost * numUsers)}</span>
                </div>
              </div>

              <div className="breakdown-category">
                <h5>IT Labor</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">Total IT Cost ({itFtes} FTEs)</span>
                  <span className="breakdown-value">{formatCurrency(calculations.totalItCost)}</span>
                </div>
              </div>
            </div>

            <div className="breakdown-column">
              <h4>8090 Software Breakdown</h4>
              <div className="breakdown-category">
                <h5>Software Cost</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">Annual License</span>
                  <span className="breakdown-value">{formatCurrency(calculations.softwareCost8090)}</span>
                </div>
              </div>

              <div className="breakdown-category">
                <h5>Reduced Operations Labor</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">Reduced Labor ({opsLaborReduction}% savings)</span>
                  <span className="breakdown-value">{formatCurrency(calculations.reducedOpsLabor)}</span>
                </div>
              </div>

              <div className="breakdown-category">
                <h5>Reduced IT Labor</h5>
                <div className="breakdown-item">
                  <span className="breakdown-label">Reduced IT ({itLaborReduction}% savings)</span>
                  <span className="breakdown-value">{formatCurrency(calculations.reducedItLabor)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}