// Client Component by inheritance — rendered inside Upload.jsx which is "use client".
// Stateless display of prediction results.

export default function Results({ result }) {
  return (
    <div className="bg-white/5 border border-teal-500/20 rounded-2xl p-6 animate-fade-in">
      <h3 className="text-2xl font-semibold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
        Analysis Results
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 transform hover:scale-[1.02] transition-transform duration-300">
          <p className="text-gray-400 mb-2">Condition</p>
          <p className="text-xl font-semibold text-white" id="result-condition">
            {result.disease}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 transform hover:scale-[1.02] transition-transform duration-300">
          <p className="text-gray-400 mb-2">Confidence</p>
          <p className="text-xl font-semibold text-white" id="result-confidence">
            {result.accuracy}
          </p>
        </div>
      </div>
    </div>
  )
}
