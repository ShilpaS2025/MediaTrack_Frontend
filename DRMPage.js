import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiShield, 
  FiArrowLeft, 
  FiRefreshCw, 
  FiChevronDown, 
  FiActivity, 
  FiLock,
  FiUser,
  FiSmartphone,
  FiGlobe,
  FiDatabase,
  FiCpu
} from "react-icons/fi";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import "../../styles/drm.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

const DRMPage = () => {
  const navigate = useNavigate();
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All DRM Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const events = [
    { id: "DRM-18472", status: "Granted", type: "Widevine", time: "15:02:14", title: "Epic Adventure S2E8", asset: "AST-4728", user: "USR-8492", device: "Android TV", region: "NA", ip: "192.168.1.24" },
    { id: "DRM-18471", status: "Granted", type: "FairPlay", time: "15:01:58", title: "Future Vision Documentary", asset: "AST-4727", user: "USR-3821", device: "Apple TV", region: "EU", ip: "10.0.0.142" },
    { id: "DRM-18470", status: "Denied", type: "PlayReady", time: "15:01:42", title: "Cinema Classics", asset: "AST-4726", user: "USR-9472", device: "Xbox", region: "AP", ip: "172.16.0.88" },
    { id: "DRM-18469", status: "Granted", type: "Widevine", time: "15:01:28", title: "True Stories Ep12", asset: "AST-4725", user: "USR-7384", device: "Chrome Browser", region: "NA", ip: "192.168.2.15" },
    { id: "DRM-18468", status: "Expired", type: "FairPlay", time: "15:01:15", title: "Adventure Quest", asset: "AST-4724", user: "USR-5629", device: "iPhone", region: "SA", ip: "10.10.1.99" },
    { id: "DRM-18467", status: "Granted", type: "Widevine", time: "15:01:03", title: "Documentary Pilot", asset: "AST-4723", user: "USR-4738", device: "Smart TV", region: "EU", ip: "192.168.5.42" },
    { id: "DRM-18466", status: "Denied", type: "PlayReady", time: "15:00:49", title: "Sports Highlights", asset: "AST-4722", user: "USR-2847", device: "Windows PC", region: "AP", ip: "172.20.10.7" },
    { id: "DRM-18465", status: "Granted", type: "Widevine", time: "15:00:32", title: "Cinematic Reel", asset: "AST-4721", user: "USR-1192", device: "Fire TV", region: "US", ip: "192.168.1.10" },
    { id: "DRM-18464", status: "Granted", type: "FairPlay", time: "15:00:18", title: "Nature Vol 4", asset: "AST-4720", user: "USR-6430", device: "iPad", region: "EU", ip: "10.4.0.55" },
    { id: "DRM-18463", status: "Expired", type: "PlayReady", time: "15:00:05", title: "Classic Tales", asset: "AST-4719", user: "USR-9921", device: "Roku", region: "AU", ip: "172.18.2.3" },
  ];

  const filteredEvents = events.filter(e => {
    const typeMatch = selectedType === "All DRM Types" || e.type === selectedType;
    const statusMatch = selectedStatus === "All Status" || e.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const lineData = {
    labels: ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00'],
    datasets: [
      { 
        label: 'Activity', 
        data: [480, 520, 600, 680, 734, 820, 880], 
        borderColor: '#c9b3f9', 
        backgroundColor: 'rgba(106, 13, 173, 0.3)', 
        fill: true,
        tension: 0.4 
      }
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#12121e',
        bodyColor: '#a371f7',
        callbacks: {
           title: () => '14:40',
           label: () => [`Granted : 734`, `Denied : 18`, `Expired : 4`]
        }
      }
    },
    scales: {
      x: { ticks: { color: '#c9d1d9' }, grid: { display: false } },
      y: { ticks: { color: '#c9d1d9' }, grid: { color: 'rgba(255,255,255,0.05)' }, max: 1000 }
    }
  };

  const pieData = {
    labels: ['Widevine 40%', 'FairPlay 30%', 'PlayReady 30%'],
    datasets: [{
      data: [40, 30, 30],
      backgroundColor: ['#6a0dad', '#c9b3f9', '#ffa657'],
      borderWidth: 0,
    }],
  };

  return (
    <div className="drm-page-wrapper">
      <div className="container-fluid p-0">
        <div className="drm-header px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/operator")} className="btn-back-link">
              ← Back to Platform Dashboard
            </button>
          </div>
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="header-icon-box">
              <FiShield size={24} color="white" />
            </div>
            <div className="header-title-text">
              <h1 className="h3 fw-bold text-white mb-0">Security & DRM</h1>
              <p className="subtitle-bright small mb-0">License Management & Event Monitoring</p>
            </div>
            <button className="btn btn-dark-purple ms-auto d-flex align-items-center gap-2">
              <FiRefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* SUMMARY METRICS */}
        <div className="row g-3 px-4 mb-4">
          {[
            { label: "Licenses Granted", value: "6", color: "#c9b3f9" },
            { label: "Licenses Denied", value: "3", color: "#ff7b72" },
            { label: "Licenses Expired", value: "1", color: "#ffa657" },
            { label: "Success Rate", value: "60%", color: "#ffffff" },
          ].map((item, idx) => (
            <div key={idx} className="col-md-3">
              <div className="summary-card p-3 rounded-2">
                <h2 className="fw-bold mb-1" style={{ color: item.color }}>{item.value}</h2>
                <span className="label-bright smallest">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="row g-4 px-4 mb-5">
          <div className="col-md-8">
            <div className="chart-card p-4 rounded-3 h-100">
              <h5 className="text-white fw-bold mb-4">License Activity (Last Hour)</h5>
              <div style={{ height: '240px' }}>
                <Line data={lineData} options={lineOptions} />
              </div>
              <div className="d-flex justify-content-center gap-4 mt-3">
                <div className="d-flex align-items-center gap-2"><div className="legend-dot purple"></div><span className="smallest text-muted">Granted</span></div>
                <div className="d-flex align-items-center gap-2"><div className="legend-dot red"></div><span className="smallest text-muted">Denied</span></div>
                <div className="d-flex align-items-center gap-2"><div className="legend-dot orange"></div><span className="smallest text-muted">Expired</span></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="chart-card p-4 rounded-3 h-100">
              <h5 className="text-white fw-bold mb-4">DRM Type Distribution</h5>
              <div style={{ height: '240px' }}>
                <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#c9d1d9', padding: 20 } } } }} />
              </div>
            </div>
          </div>
        </div>

        {/* EVENT FEED HEADER & FILTER */}
        <div className="px-4 d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-white fw-bold mb-0">Live DRM Event Feed</h4>
          <div className="d-flex gap-3 align-items-center">
            <span className="text-muted smallest">{filteredEvents.length} events</span>
            
            <div className="dropdown position-relative">
              <button className="btn btn-dark-dropdown d-flex justify-content-between align-items-center gap-4" onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}>
                {selectedType} <FiChevronDown />
              </button>
              {isTypeFilterOpen && (
                <ul className="custom-dropdown-menu">
                  {["All DRM Types", "Widevine", "FairPlay", "PlayReady"].map(t => (
                    <li key={t} onClick={() => { setSelectedType(t); setIsTypeFilterOpen(false); }}>{t}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dropdown position-relative">
              <button className="btn btn-dark-dropdown d-flex justify-content-between align-items-center gap-4" onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}>
                {selectedStatus} <FiChevronDown />
              </button>
              {isStatusFilterOpen && (
                <ul className="custom-dropdown-menu">
                  {["All Status", "Granted", "Denied", "Expired"].map(s => (
                    <li key={s} onClick={() => { setSelectedStatus(s); setIsStatusFilterOpen(false); }}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* EVENT FEED LIST (CARDS) */}
        <div className="px-4 pb-5">
           <div className="event-list d-flex flex-column gap-3">
              {filteredEvents.map((event, idx) => (
                <div key={idx} className="event-item-card p-3 rounded-2">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <FiShield size={20} className={`icon-${event.status.toLowerCase()}`} />
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <span className={`pill status-${event.status.toLowerCase()}`}>{event.status}</span>
                        <span className="pill type-pill">{event.type}</span>
                        <span className="smallest text-muted">{event.id}</span>
                        <span className="smallest text-muted">{event.time}</span>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <span className="label-bright smallest d-block">Content:</span>
                          <span className="text-white small fw-bold">{event.title}</span>
                          <div className="smallest text-muted mt-1">IP: {event.ip}</div>
                        </div>
                        <div className="col-md-3">
                          <span className="label-bright smallest d-block">User:</span>
                          <span className="text-pink small fw-bold">{event.user}</span>
                          <div className="smallest text-muted mt-1">Asset ID: {event.asset}</div>
                        </div>
                        <div className="col-md-3">
                          <span className="label-bright smallest d-block">Device:</span>
                          <span className="text-white small">{event.device}</span>
                        </div>
                        <div className="col-md-3">
                          <span className="label-bright smallest d-block">Region:</span>
                          <span className="text-white small fw-bold">{event.region}</span>
                        </div>
                      </div>
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

export default DRMPage;