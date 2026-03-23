import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiClock, 
  FiRefreshCw, 
  FiChevronDown, 
  FiPackage,
  FiZap,
  FiArrowLeft
} from "react-icons/fi";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement 
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import "../../styles/packaging.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const PackagingPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All QC Status");

  const qcItems = [
    { id: "PKG-7241", title: "Interstellar_Final_Master", assetId: "AST-9021", res: "4K UHD", pkgTime: "12m 45s", qcTime: "14:23:18", bitrates: "15, 25, 40 Mbps", formats: "HLS, DASH", drm: "Widevine, FairPlay", status: "Passed" },
    { id: "PKG-7242", title: "Gravity_Teaser_v2", assetId: "AST-9022", res: "1080p HD", pkgTime: "08m 12s", qcTime: "14:31:05", bitrates: "8, 12 Mbps", formats: "DASH", drm: "PlayReady", status: "Failed" },
    { id: "PKG-7243", title: "Nature_Documentary_E1", assetId: "AST-9023", res: "4K UHD", pkgTime: "15m 30s", qcTime: "--:--:--", bitrates: "20, 35 Mbps", formats: "HLS, MSS", drm: "None", status: "Pending" },
    { id: "PKG-7244", title: "Cyberpunk_Animation_Short", assetId: "AST-9024", res: "1080p HD", pkgTime: "05m 22s", qcTime: "13:52:18", bitrates: "10 Mbps", formats: "HLS", drm: "Widevine", status: "Passed" },
    { id: "PKG-7245", title: "Wildlife_4K_Series_P1", assetId: "AST-9025", res: "4K UHD", pkgTime: "18m 45s", qcTime: "13:18:42", bitrates: "25, 45 Mbps", formats: "HLS, DASH, MSS", drm: "Widevine", status: "Failed" },
    { id: "PKG-7246", title: "Space_Odyssey_Classic", assetId: "AST-9026", res: "UHD HDR", pkgTime: "22m 10s", qcTime: "13:11:22", bitrates: "30, 50 Mbps", formats: "DASH", drm: "FairPlay", status: "Passed" },
    { id: "PKG-7247", title: "Ocean_Life_vfx_master", assetId: "AST-9027", res: "4K UHD", pkgTime: "10m 05s", qcTime: "12:45:10", bitrates: "20 Mbps", formats: "HLS, DASH", drm: "None", status: "Passed" },
    { id: "PKG-7248", title: "Epic_Trailer_Final", assetId: "AST-9028", res: "4K UHD", pkgTime: "06m 50s", qcTime: "--:--:--", bitrates: "18 Mbps", formats: "HLS", drm: "Widevine", status: "Pending" },
  ];

  const filteredItems = qcItems.filter(item => {
    if (selectedFilter === "All QC Status") return true;
    return item.status === selectedFilter;
  });

  const donutData = {
    labels: ['Passed', 'Failed', 'Pending'],
    datasets: [{
      data: [4, 2, 2],
      backgroundColor: ['#c9b3f9', '#ff7b72', '#a371f7'],
      borderColor: '#121821',
      borderWidth: 2,
    }],
  };

  const barData = {
    labels: ['HLS', 'DASH', 'MSS'],
    datasets: [{
      label: 'Format Count',
      data: [6, 4, 2],
      backgroundColor: '#6a0dad',
      borderRadius: 4,
    }],
  };

  return (
    <div className="packaging-page-wrapper">
      <div className="container-fluid p-0">
        <div className="packaging-header px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/operator")} className="btn-back-link">
              ← Back to Platform Dashboard
            </button>
          </div>
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="header-icon-box">
              <FiPackage size={24} color="white" />
            </div>
            <div className="header-title-text">
              <h1 className="h3 fw-bold text-white mb-0">Packaging & Quality Control</h1>
              <p className="subtitle-bright small mb-0">Format Packaging & QC Validation</p>
            </div>
            <button className="btn btn-dark-purple ms-auto d-flex align-items-center gap-2">
              <FiRefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="row g-3 px-4 mb-4">
          {[
            { label: "QC Passed", value: "4", color: "#c9b3f9" },
            { label: "QC Failed", value: "2", color: "#ff7b72" },
            { label: "Pending QC", value: "2", color: "#a371f7" },
            { label: "Pass Rate", value: "50%", color: "#ffffff" },
          ].map((item, idx) => (
            <div key={idx} className="col-md-3">
              <div className="summary-card p-3 rounded-2">
                <h2 className="fw-bold mb-1" style={{ color: item.color }}>{item.value}</h2>
                <span className="label-bright smallest">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 px-4 mb-4">
          <div className="col-md-6">
            <div className="chart-card p-4 rounded-3 h-100">
              <h5 className="text-white fw-bold mb-4">QC Status Distribution</h5>
              <div style={{ height: '220px' }}>
                <Doughnut data={donutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#c9d1d9' } } } }} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="chart-card p-4 rounded-3 h-100">
              <h5 className="text-white fw-bold mb-4">Format Distribution</h5>
              <div style={{ height: '220px' }}>
                <Bar data={barData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#c9d1d9' }, grid: { display: false } }, y: { ticks: { color: '#c9d1d9' }, grid: { color: 'rgba(255,255,255,0.05)' } } } } } />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 d-flex justify-content-end mb-3 position-relative">
          <div className="dropdown">
            <button 
              className={`btn btn-dark-dropdown ${isFilterOpen ? 'active' : ''} d-flex justify-content-between align-items-center gap-5`} 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {selectedFilter}
              <FiChevronDown />
            </button>
            {isFilterOpen && (
              <ul className="custom-dropdown-menu">
                {["All QC Status", "Passed", "Failed", "Pending"].map((option) => (
                  <li key={option} onClick={() => { setSelectedFilter(option); setIsFilterOpen(false); }} className={selectedFilter === option ? 'selected' : ''}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="px-4 pb-5">
          <div className="row g-3">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 col-xl-3">
                <div className="qc-item-card p-3 rounded-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-purple-light smallest fw-bold">{item.id}</span>
                    <QCStatusIcon status={item.status} />
                  </div>
                  <h6 className="text-white fw-bold mb-3">{item.title}</h6>
                  
                  <div className="item-detail mb-2">
                    <span className="label-bright smallest">Asset ID:</span>
                    <span className="text-white smallest ms-2">{item.assetId}</span>
                  </div>
                  <div className="item-detail mb-2">
                    <span className="label-bright smallest">Resolution:</span>
                    <span className="text-white smallest ms-2">{item.res}</span>
                  </div>
                  <div className="item-detail mb-2">
                    <span className="label-bright smallest">Pkg Time:</span>
                    <span className="text-white smallest ms-2">{item.pkgTime}</span>
                  </div>
                  <div className="item-detail mb-3">
                    <span className="label-bright smallest">QC Time:</span>
                    <span className="text-white smallest ms-2">{item.qcTime}</span>
                  </div>
                  
                  <div className="tags-container d-flex flex-wrap gap-2">
                    <span className="tag-pill">HLS</span>
                    <span className="tag-pill">4K</span>
                    <span className="tag-pill">Widevine</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const QCStatusIcon = ({ status }) => {
  if (status === "Passed") return <FiCheckCircle color="#3fb950" size={20} />;
  if (status === "Failed") return <FiXCircle color="#f85149" size={20} />;
  return <FiClock color="#d29922" size={20} />;
};

export default PackagingPage;