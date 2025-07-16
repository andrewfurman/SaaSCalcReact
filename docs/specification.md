Below is a practical, phased roadmap for turning your single‑page calculator into a three‑tab “wizard”:

*Tab 1 – **Model Salesforce Spend*** →
*Tab 2 – **Model 8090 Spend*** →
*Tab 3 – **Compare & ROI***

Each phase builds on the previous one, so you can push small, working commits at every step.

for color scheme make sure to use black and grey text and a black background (can have white / grey boxes within) and no other colors

---

## 0  Bootstrap & plumbing

1. **Scaffold with Vite**

   ```bash
   npm create vite@latest sf‑8090‑calculator -- --template react
   cd sf‑8090‑calculator && npm i
   npm run dev
   ```

   Vite’s pre‑configured Rollup build and lightning‑fast dev server keep iteration tight. ([vitejs][1])

2. **Add libraries**

   ```bash
   npm i @mui/material @emotion/react @emotion/styled \
         react-router-dom@6
   ```

   * MUI gives you an accessible `<Tabs>` implementation straight out of the box. ([MUI][2])
   * React Router 6 lets each tab be a real route (`/salesforce`, `/8090`, `/compare`) so browser Back/Forward work. ([Stack Overflow][3])

3. **Centralise state**
   *Create* `src/context/CostModelContext.jsx` using React Context + `useReducer`; this avoids prop‑drilling across tabs and is easily testable. ([React][4], [React][5])

---

## 1  Tab 1 – Model **Salesforce Spend**

### 1.1  UI

*Component:* `SalesforceTab.jsx`
*Layout:* two‑column grid — sliders/inputs on the left, live totals on the right.

| Input                     | Default   | Notes                                                                                                            |
| ------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Users on Salesforce       | 100       | `users`                                                                                                          |
| License \$/user/mo        | \$100     | Pull from public pricing table; make editable for Enterprise, Unlimited, etc. ([Salesforce][6], [Salesforce][7]) |
| Ops annual labor per user | \$100 000 |                                                                                                                  |
| IT FTEs                   | 2         |                                                                                                                  |
| IT annual labor per FTE   | \$150 000 |                                                                                                                  |

### 1.2  Calculations (stored in reducer)

```ts
sfLicenseAnnual = users * licenseRate * 12
sfOpsLabor      = users * opsAnnualPerUser
sfITLabor       = itFTEs * itAnnualPerFTE
sfTotalAnnual   = sfLicenseAnnual + sfOpsLabor + sfITLabor
```

Expose each subtotal so the Compare tab can reuse them.

*UX hint:* give the License slider a range **\$25–\$550** to match Essentials → Einstein tiers. ([Salesforce][6], [Salesforce][7])

---

## 2  Tab 2 – Model **8090 Spend**

*Component:* `Platform8090Tab.jsx`

### 2.1  Inputs

| Input                   | Default   | Derived from         | Notes                                      |
| ----------------------- | --------- | -------------------- | ------------------------------------------ |
| 8090 flat annual fee    | \$500 000 | —                    | Publish as constant until pricing changes. |
| Ops labor reduction (%) | 30 %      | Salesforce Ops labor | User can drag 0–100 %.                     |
| IT labor reduction (%)  | 50 %      | Salesforce IT labor  | " "                                        |

### 2.2  Calculations

```ts
adjOpsLabor = sfOpsLabor * (1 - opsReduction/100)
adjITLabor  = sfITLabor * (1 - itReduction/100)
p8090Total  = platformFee + adjOpsLabor + adjITLabor
```

*Rationale:* 8090 markets itself as a “software factory” that compresses both Ops and IT effort with automation. ([8090.ai][8])

*Design cue:* reuse the same `CostCard` component from Tab 1 so numbers feel familiar.

---

## 3  Tab 3 – **Compare & ROI**

*Component:* `CompareTab.jsx`

1. **Read** both totals from context.
2. **Compute**

   ```ts
   annualSavings   = sfTotalAnnual - p8090Total
   percentSavings  = annualSavings / sfTotalAnnual
   ```
3. **Present**

   * Side‑by‑side cards (“Salesforce”, “8090”).
   * A savings banner (green ↑/red ↓).
   * Optional bar chart for exec decks (add later with `recharts`).

### Routing glue

```jsx
<BrowserRouter>
  <Tabs value={location.pathname}>
    <Tab label="Salesforce Spend" value="/salesforce" to="/salesforce" component={Link} />
    <Tab label="8090 Spend"       value="/8090"       to="/8090"       component={Link} />
    <Tab label="Compare"          value="/compare"    to="/compare"    component={Link} />
  </Tabs>
  <Routes>
    <Route path="/salesforce" element={<SalesforceTab/>}/>
    <Route path="/8090"       element={<Platform8090Tab/>}/>
    <Route path="/compare"    element={<CompareTab/>}/>
    <Route path="*"           element={<Navigate to="/salesforce" replace/>}/>
  </Routes>
</BrowserRouter>
```

Keyboard navigation and deep‑linking now “just work” with router‑aware tabs. ([MUI][2], [ariakit.org][9])

---

## 4  Testing & QA

| Layer   | What to test                               | Tool                    |
| ------- | ------------------------------------------ | ----------------------- |
| Reducer | All formulas return expected numbers       | `vitest` ⟷ Jest API     |
| UI      | Tabs change URL & restore state on refresh | Cypress component tests |
| Perf    | Sliders update totals < 16 ms              | React DevTools Profiler |

---

## 5  Why this order works

1. **Start with Salesforce** – Everyone understands current spend; validates math against published TCO calculators. ([Clientell Sales & Salesforce Resources][10])
2. **Layer 8090** – Adds only three new fields, reusing state & display components.
3. **Compare** – Final tab needs *zero* new inputs; only reads existing state, so risk of regression is low.

---

## 6  Next‑step ideas

* Add **wizard‑style Next/Back buttons** for linear flow. ([Medium][11], [Medium][12])
* Persist scenarios in `localStorage` or Supabase so finance and ops can share links.
* Extend model with one‑time migration costs, sandbox fees, and third‑party apps (see Salesforce commerce TCO framework). ([Salesforce][13])

Follow this checklist and you’ll have a clean, testable three‑step calculator that speaks the language of both finance and IT—ready for demos or board decks.

[1]: https://vitejs.dev/guide/?utm_source=chatgpt.com "Getting Started - Vite"
[2]: https://mui.com/material-ui/react-tabs/?utm_source=chatgpt.com "React Tabs component - Material UI - MUI"
[3]: https://stackoverflow.com/questions/74642093/how-to-make-tabs-routing-with-react-router-v6-with-cross-linking-on-nested-page?utm_source=chatgpt.com "How to make tabs routing with React Router v6 with cross linking on ..."
[4]: https://react.dev/learn/managing-state?utm_source=chatgpt.com "Managing State - React"
[5]: https://react.dev/learn/scaling-up-with-reducer-and-context?utm_source=chatgpt.com "Scaling Up with Reducer and Context - React"
[6]: https://www.salesforce.com/sales/pricing/?utm_source=chatgpt.com "Salesforce Sales Pricing"
[7]: https://www.salesforce.com/news/stories/pricing-update-2025/?utm_source=chatgpt.com "Salesforce Announces Pricing Update"
[8]: https://8090.ai/?utm_source=chatgpt.com "8090"
[9]: https://ariakit.org/examples/tab-react-router?utm_source=chatgpt.com "Tab with React Router - Ariakit"
[10]: https://tools.getclientell.com/sales-calculator/tco?utm_source=chatgpt.com "Total Cost of Ownership (TCO) Calculator - Clientell"
[11]: https://medium.com/%40vandanpatel29122001/react-building-a-multi-step-form-with-wizard-pattern-85edec21f793?utm_source=chatgpt.com "React: Building a Multi-Step Form with Wizard Pattern - Medium"
[12]: https://medium.com/doctolib/how-to-build-a-smart-multi-step-form-in-react-359469c32bbe?utm_source=chatgpt.com "How to build a smart multi-step form in React | by Emmanuel Gautier"
[13]: https://www.salesforce.com/commerce/ecommerce-tco-total-cost-of-ownership/?utm_source=chatgpt.com "Ecommerce TCO: How to Calculate, Optimize, and Reduce Costs"
