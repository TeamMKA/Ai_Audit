import  { useState } from 'react';

const Anomalities = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  const anomalies = {
    low: [
      { id: 1, name: 'Low Anomaly 1', description: 'This is a low-level anomaly.' },
      { id: 2, name: 'Low Anomaly 2', description: 'This is a low-level anomaly.' },
    ],
    mid: [
      { id: 3, name: 'Mid Anomaly 1', description: 'This is a mid-level anomaly.' },
      { id: 4, name: 'Mid Anomaly 2', description: 'This is a mid-level anomaly.' },
    ],
    high: [
      { id: 5, name: 'High Anomaly 1', description: 'This is a high-level anomaly.' },
      { id: 6, name: 'High Anomaly 2', description: 'This is a high-level anomaly.' },
    ],
  };

  const handleSelect = (level) => {
    setSelectedAnomaly(level);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Anomalies</h1>
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedAnomaly === 'low' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}
          onClick={() => handleSelect('low')}
        >
          Low
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedAnomaly === 'mid' ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 border border-yellow-500'}`}
          onClick={() => handleSelect('mid')}
        >
          Mid
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedAnomaly === 'high' ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-500'}`}
          onClick={() => handleSelect('high')}
        >
          High
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedAnomaly &&
          anomalies[selectedAnomaly].map((anomaly) => (
            <div key={anomaly.id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">{anomaly.name}</h2>
              <p className="text-gray-600">{anomaly.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Anomalities;