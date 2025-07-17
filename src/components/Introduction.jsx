export default function Introduction() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Enterprise Salesforce Workflow Challenges
        </h1>
        
        <div className="text-gray-700 text-lg leading-relaxed space-y-4">
          <p>
            Many large enterprises have invested heavily in Salesforce workflows that, while functional, 
            come with significant challenges that impact their bottom line and operational efficiency.
          </p>
          
          <p>
            These custom workflows and processes built within Salesforce often become expensive to maintain, 
            difficult to scale, and struggle to meet the evolving needs of modern business operations.
          </p>
          
          <p>
            Organizations frequently find themselves trapped in costly licensing models, complex customizations, 
            and workflows that don't align with their actual business requirements, leading to reduced productivity 
            and increased operational overhead.
          </p>
          
          <p>
            The following cost analysis tools will help you understand the true financial impact of your current 
            Salesforce implementation and explore potential alternatives that could better serve your organization's needs.
          </p>
        </div>
        
        <div className="mt-6 mb-4 text-center">
          <p className="text-gray-600 italic">
            Your teams know the pain of looking at these six dots
          </p>
        </div>
        
        <div className="relative w-3/4 mx-auto">
          <img 
            src="/Salesforce_Screenshot.png" 
            alt="Salesforce Dashboard Screenshot" 
            className="w-full rounded-lg shadow-md border border-gray-200"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <img 
              src="/Salesforce_Loading_GIF.gif" 
              alt="Salesforce Loading" 
              className="w-40 h-40"
            />
          </div>
        </div>
      </div>
    </div>
  )
}