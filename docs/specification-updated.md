# Salesforce Cost Calculator - Updated Specification

Based on the implementation discussion, here are the final specifications for the Salesforce cost calculator:

## UI/UX Requirements

### Color Scheme
- **Background:** Black
- **Content:** White/grey content boxes
- **Text:** Black and grey text only (no other colors)

### Layout Structure
- **Horizontal flow:** Left-to-right mathematical progression
- **Visual flow:** Inputs → calculations → results
- **Alignment:** Perfect vertical alignment of all mathematical operators
- **Result boxes:** Uniform width (160px) and height (80px)
- **Equals signs:** Positioned to the left of result boxes

## Input Controls

### Row 1 - Total Users
- **Type:** Slider (prominent at top, centered)
- **Default:** 100 users
- **Range:** 0-1000 users
- **Step:** 10 users

### Row 2 - License Costs
**Formula:** `License Rate × Users × 12 months = Annual License Cost`

- **License $/user/month**
  - **Type:** Slider
  - **Default:** $100
  - **Range:** $50-$150
  - **Step:** $10

### Row 3 - Operations Labor  
**Formula:** `Ops Salary per FTE × Users = Annual Ops Cost`
*(Assumes 1 ops person per user)*

- **Ops salary per FTE**
  - **Type:** Slider
  - **Default:** $80,000
  - **Range:** $50k-$150k
  - **Step:** $5k
  - **Label:** "Salary and Overhead per Ops Team Member"
- **User count display:** Shows same user count as Row 1 under "# Of Ops FTEs"

### Row 4 - IT Labor
**Formula:** `IT Salary per FTE × # IT FTEs = Annual IT Cost`

- **IT FTEs**
  - **Type:** Number input
  - **Default:** 10
  - **Range:** 1-50 FTEs
  - **Position:** Aligned with user count columns
- **IT salary per FTE**
  - **Type:** Slider
  - **Default:** $120,000
  - **Range:** $50k-$150k
  - **Step:** $5k
  - **Label:** "Salary and Overhead per IT Team Member"

### Row 5 - Total
**Formula:** `License + Ops + IT = Total Annual Cost`

## Calculations

```typescript
sfLicenseAnnual = users * licenseRate * 12
sfOpsLabor      = users * opsAnnualPerFTE
sfITLabor       = itFTEs * itAnnualPerFTE
sfTotalAnnual   = sfLicenseAnnual + sfOpsLabor + sfITLabor
```

## Visual Elements

- **Currency formatting:** All dollar amounts formatted as currency
- **Labels:** Clear labels for quantities ("# of Users", "# Of Ops FTEs", "# IT FTEs")
- **Mathematical operators:** × and = symbols clearly visible
- **Alignment:** Perfect vertical alignment across all rows
- **Result highlighting:** Grey boxes for all calculated results

## Implementation Notes

- Uses React with Vite bundler
- Tailwind CSS for styling
- Real-time calculations as users adjust inputs
- Responsive design with grid layouts
- Clean, professional appearance suitable for business use

This specification reflects the final implemented version with all user-requested modifications.