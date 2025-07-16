
import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [sfLicenseCost, setSfLicenseCost] = useState(100)
  const [laborCost, setLaborCost] = useState(100000)
  const [numUsers, setNumUsers] = useState(100)
  const [itLaborHours, setItLaborHours] = useState(40)
  const [itHourlyRate, setItHourlyRate] = useState(75)
  
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
    const monthlyLicenseCost = sfLicenseCost
    const annualLicenseCost = monthlyLicenseCost * 12
    const annualLaborCost = laborCost
    const laborCostPerUser = annualLaborCost / numUsers
    const itConfigCost = itLaborHours * itHourlyRate
    const totalMonthlyCost = monthlyLicenseCost + (annualLaborCost / 12) + (itConfigCost / 12)
    const totalAnnualCost = annualLicenseCost + annualLaborCost + itConfigCost
    const costPerUserPerMonth = totalMonthlyCost / numUsers
    const costPerUserPerYear = totalAnnualCost / numUsers

    setCalculations({
      monthlyLicenseCost,
      annualLicenseCost,
      annualLaborCost,
      laborCostPerUser,
      itConfigCost,
      totalMonthlyCost,
      totalAnnualCost,
      costPerUserPerMonth,
      costPerUserPerYear
    })
  }, [sfLicenseCost, laborCost, numUsers, itLaborHours, itHourlyRate])

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
        <p>Calculate your complete Salesforce investment including licenses, labor, and IT costs</p>
      </header>

      <div className="calculator-grid">
        <div className="inputs-section">
          <h2>Input Parameters</h2>
          
          <div className="input-group">
            <label htmlFor="sfLicense">Salesforce License Cost ($/month)</label>
            <input
              id="sfLicense"
              type="number"
              value={sfLicenseCost}
              onChange={(e) => setSfLicenseCost(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="input-group">
            <label htmlFor="laborCost">Annual Labor Cost for SF Users ($)</label>
            <input
              id="laborCost"
              type="number"
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="input-group">
            <label htmlFor="numUsers">Number of Salesforce Users</label>
            <input
              id="numUsers"
              type="number"
              value={numUsers}
              onChange={(e) => setNumUsers(Number(e.target.value))}
              min="1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="itHours">IT Configuration Hours</label>
            <input
              id="itHours"
              type="number"
              value={itLaborHours}
              onChange={(e) => setItLaborHours(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="input-group">
            <label htmlFor="itRate">IT Hourly Rate ($/hour)</label>
            <input
              id="itRate"
              type="number"
              value={itHourlyRate}
              onChange={(e) => setItHourlyRate(Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="results-section">
          <h2>Cost Breakdown</h2>
          
          <div className="results-grid">
            <div className="result-card license">
              <h3>Licensing Costs</h3>
              <div className="metric">
                <span className="label">Monthly</span>
                <span className="value">{formatCurrency(calculations.monthlyLicenseCost)}</span>
              </div>
              <div className="metric">
                <span className="label">Annual</span>
                <span className="value">{formatCurrency(calculations.annualLicenseCost)}</span>
              </div>
            </div>

            <div className="result-card labor">
              <h3>Labor Costs</h3>
              <div className="metric">
                <span className="label">Annual Total</span>
                <span className="value">{formatCurrency(calculations.annualLaborCost)}</span>
              </div>
              <div className="metric">
                <span className="label">Per User/Year</span>
                <span className="value">{formatCurrency(calculations.laborCostPerUser)}</span>
              </div>
            </div>

            <div className="result-card it">
              <h3>IT Configuration</h3>
              <div className="metric">
                <span className="label">One-time Cost</span>
                <span className="value">{formatCurrency(calculations.itConfigCost)}</span>
              </div>
              <div className="metric">
                <span className="label">Hours</span>
                <span className="value">{itLaborHours}</span>
              </div>
            </div>

            <div className="result-card total">
              <h3>Total Investment</h3>
              <div className="metric large">
                <span className="label">Monthly Total</span>
                <span className="value">{formatCurrency(calculations.totalMonthlyCost)}</span>
              </div>
              <div className="metric large">
                <span className="label">Annual Total</span>
                <span className="value">{formatCurrency(calculations.totalAnnualCost)}</span>
              </div>
            </div>

            <div className="result-card per-user">
              <h3>Per User Costs</h3>
              <div className="metric">
                <span className="label">Monthly/User</span>
                <span className="value">{formatCurrency(calculations.costPerUserPerMonth)}</span>
              </div>
              <div className="metric">
                <span className="label">Annual/User</span>
                <span className="value">{formatCurrency(calculations.costPerUserPerYear)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h2>Executive Summary</h2>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="stat-value">{formatCurrency(calculations.totalAnnualCost)}</div>
            <div className="stat-label">Total Annual Investment</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">{formatCurrency(calculations.costPerUserPerYear)}</div>
            <div className="stat-label">Cost Per User Per Year</div>
          </div>
          <div className="summary-stat">
            <div className="stat-value">{numUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
