import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Map, Sliders, ArrowUpRight, LineChart, Droplets, Tractor } from 'lucide-react';

// Mock data based on the M query structure
const data = [
  {
    State: "Maharashtra",
    "Average Crop Yield": 2850,
    "Total Production": 187500,
    "Total Land Area": 65000,
    "Avg Irrigation Coverage": 62,
    "Avg Fertilizer Consumption": 145,
    "Avg Pesticide Use": 1.8,
    "Avg Mechanization Level": 52,
    "Avg Rainfall": 950
  },
  {
    State: "Punjab",
    "Average Crop Yield": 3950,
    "Total Production": 142000,
    "Total Land Area": 36000,
    "Avg Irrigation Coverage": 98,
    "Avg Fertilizer Consumption": 210,
    "Avg Pesticide Use": 2.4,
    "Avg Mechanization Level": 85,
    "Avg Rainfall": 650
  },
  {
    State: "Uttar Pradesh",
    "Average Crop Yield": 3250,
    "Total Production": 265000,
    "Total Land Area": 82000,
    "Avg Irrigation Coverage": 78,
    "Avg Fertilizer Consumption": 180,
    "Avg Pesticide Use": 2.1,
    "Avg Mechanization Level": 62,
    "Avg Rainfall": 750
  },
  {
    State: "Karnataka",
    "Average Crop Yield": 2450,
    "Total Production": 112000,
    "Total Land Area": 45000,
    "Avg Irrigation Coverage": 45,
    "Avg Fertilizer Consumption": 125,
    "Avg Pesticide Use": 1.5,
    "Avg Mechanization Level": 48,
    "Avg Rainfall": 825
  },
  {
    State: "Gujarat",
    "Average Crop Yield": 2650,
    "Total Production": 128000,
    "Total Land Area": 48000,
    "Avg Irrigation Coverage": 58,
    "Avg Fertilizer Consumption": 155,
    "Avg Pesticide Use": 1.7,
    "Avg Mechanization Level": 56,
    "Avg Rainfall": 675
  },
  {
    State: "Madhya Pradesh",
    "Average Crop Yield": 2750,
    "Total Production": 192000,
    "Total Land Area": 70000,
    "Avg Irrigation Coverage": 52,
    "Avg Fertilizer Consumption": 140,
    "Avg Pesticide Use": 1.6,
    "Avg Mechanization Level": 50,
    "Avg Rainfall": 925
  },
  {
    State: "West Bengal",
    "Average Crop Yield": 3050,
    "Total Production": 145000,
    "Total Land Area": 47500,
    "Avg Irrigation Coverage": 72,
    "Avg Fertilizer Consumption": 165,
    "Avg Pesticide Use": 1.9,
    "Avg Mechanization Level": 45,
    "Avg Rainfall": 1450
  },
  {
    State: "Tamil Nadu",
    "Average Crop Yield": 2950,
    "Total Production": 110000,
    "Total Land Area": 37000,
    "Avg Irrigation Coverage": 65,
    "Avg Fertilizer Consumption": 160,
    "Avg Pesticide Use": 1.8,
    "Avg Mechanization Level": 58,
    "Avg Rainfall": 950
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

export default function AgricultureDashboard() {
  const [selectedState, setSelectedState] = useState('All States');

  const filteredData = selectedState === 'All States' 
    ? data 
    : data.filter(item => item.State === selectedState);

  const inputFactors = [
    { name: 'Irrigation', value: 'Avg Irrigation Coverage', icon: <Droplets size={16} /> },
    { name: 'Fertilizer', value: 'Avg Fertilizer Consumption', icon: <Sliders size={16} /> },
    { name: 'Pesticide', value: 'Avg Pesticide Use', icon: <Sliders size={16} /> },
    { name: 'Mechanization', value: 'Avg Mechanization Level', icon: <Tractor size={16} /> },
    { name: 'Rainfall', value: 'Avg Rainfall', icon: <Droplets size={16} /> }
  ];

  // For radar chart
  const getRadarData = (state) => {
    const stateData = data.find(item => item.State === state);
    if (!stateData) return [];
    
    return [
      { subject: 'Irrigation', A: stateData['Avg Irrigation Coverage'], fullMark: 100 },
      { subject: 'Fertilizer', A: stateData['Avg Fertilizer Consumption'] / 2.5, fullMark: 100 }, // Normalized
      { subject: 'Pesticide', A: stateData['Avg Pesticide Use'] * 30, fullMark: 100 }, // Normalized
      { subject: 'Mechanization', A: stateData['Avg Mechanization Level'], fullMark: 100 },
      { subject: 'Rainfall', A: stateData['Avg Rainfall'] / 15, fullMark: 100 }, // Normalized
    ];
  };

  // For correlation scatter plot
  const getCorrelationData = () => {
    return data.map(item => ({
      State: item.State,
      x: item['Avg Fertilizer Consumption'], 
      y: item['Average Crop Yield']
    }));
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Agricultural Performance Dashboard</h1>
          </div>
          <div className="flex items-center">
            <select 
              className="bg-green-600 text-white px-3 py-1 rounded border border-green-500"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All States">All States</option>
              {data.map(item => (
                <option key={item.State} value={item.State}>{item.State}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {selectedState !== 'All States' ? (
            // Single state KPIs
            <>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <LineChart className="mr-2" size={20} />
                  <span className="font-semibold">Average Crop Yield</span>
                </div>
                <div className="text-2xl font-bold">{filteredData[0]["Average Crop Yield"].toLocaleString()} kg/ha</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <ArrowUpRight className="mr-2" size={20} />
                  <span className="font-semibold">Total Production</span>
                </div>
                <div className="text-2xl font-bold">{filteredData[0]["Total Production"].toLocaleString()} tonnes</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <Map className="mr-2" size={20} />
                  <span className="font-semibold">Land Area</span>
                </div>
                <div className="text-2xl font-bold">{filteredData[0]["Total Land Area"].toLocaleString()} ha</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <Droplets className="mr-2" size={20} />
                  <span className="font-semibold">Avg Rainfall</span>
                </div>
                <div className="text-2xl font-bold">{filteredData[0]["Avg Rainfall"].toLocaleString()} mm</div>
              </div>
            </>
          ) : (
            // All states KPIs
            <>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <LineChart className="mr-2" size={20} />
                  <span className="font-semibold">Avg Crop Yield (All)</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(data.reduce((sum, item) => sum + item["Average Crop Yield"], 0) / data.length).toLocaleString()} kg/ha
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <ArrowUpRight className="mr-2" size={20} />
                  <span className="font-semibold">Total Production (All)</span>
                </div>
                <div className="text-2xl font-bold">
                  {data.reduce((sum, item) => sum + item["Total Production"], 0).toLocaleString()} tonnes
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <Map className="mr-2" size={20} />
                  <span className="font-semibold">Total Land Area</span>
                </div>
                <div className="text-2xl font-bold">
                  {data.reduce((sum, item) => sum + item["Total Land Area"], 0).toLocaleString()} ha
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                <div className="flex items-center text-green-700 mb-2">
                  <Tractor className="mr-2" size={20} />
                  <span className="font-semibold">Avg Mechanization</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(data.reduce((sum, item) => sum + item["Avg Mechanization Level"], 0) / data.length).toLocaleString()}%
                </div>
              </div>
            </>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crop Yield by State */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Crop Yield by State</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={selectedState === 'All States' ? data : filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="State" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Average Crop Yield" fill="#4CAF50" name="Average Yield (kg/ha)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Production vs Land Area */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Production vs Land Area</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Total Land Area" name="Land Area (ha)" type="number" />
                <YAxis dataKey="Total Production" name="Production (tonnes)" type="number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={value => value.toLocaleString()} />
                <Legend />
                <Scatter name="States" data={filteredData} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Fertilizer Impact on Yield */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Fertilizer Impact on Yield</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" name="Fertilizer (kg/ha)" type="number" />
                <YAxis dataKey="y" name="Yield (kg/ha)" type="number" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={value => value.toLocaleString()} />
                <Legend />
                <Scatter name="States" data={getCorrelationData()} fill="#FF8042" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Farming Practices (Radar Chart) */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              {selectedState !== 'All States' ? `${selectedState} Farming Practices` : 'Select a State to View Practices'}
            </h2>
            {selectedState !== 'All States' ? (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData(selectedState)}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name={selectedState} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Please select a state to view detailed farming practices
              </div>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b text-gray-700">
            Agricultural Data Summary {selectedState !== 'All States' ? `- ${selectedState}` : ''}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Yield (kg/ha)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production (tonnes)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land Area (ha)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Irrigation (%)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fertilizer (kg/ha)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanization (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.State}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Average Crop Yield"].toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Total Production"].toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Total Land Area"].toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Avg Irrigation Coverage"]}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Avg Fertilizer Consumption"]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item["Avg Mechanization Level"]}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white p-2 text-center text-sm">
        Agricultural Data Dashboard based on Power Query M Analysis | Last updated: May 18, 2025
      </footer>
    </div>
  );
}
