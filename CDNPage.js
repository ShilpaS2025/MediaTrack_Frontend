import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiGlobe, 
  FiArrowLeft, 
  FiRefreshCw, 
  FiChevronDown, 
  FiActivity, 
  FiServer,
  FiZap,
  FiLayers,
  FiWifi
} from "react-icons/fi";
import "../../styles/cdn.css";

const CDNPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const regions = [
    { name: "North America", short: "NA", latency: "13.5ms", uptime: "99.97%", bandwidth: "82%", conn: "40,525", perf: "EXCELLENT", color: "purple" },
    { name: "Europe", short: "EU", latency: "19ms", uptime: "99.95%", bandwidth: "73.5%", conn: "31,637", perf: "GOOD", color: "purple" },
    { name: "Asia Pacific", short: "AP", latency: "45ms", uptime: "99.82%", bandwidth: "91%", conn: "12,483", perf: "WARNING", color: "orange" },
    { name: "South America", short: "SA", latency: "22ms", uptime: "99.91%", bandwidth: "68%", conn: "8,927", perf: "GOOD", color: "purple" },
  ];

  const nodes = [
    { id: "CDN-NA-01", name: "North America Primary", region: "us-east-1", url: "https://na-primary.mediatrack.cdn", latency: "12ms", throughput: "2.4 Gbps", conn: "24,847", uptime: "99.98%", bandwidth: "85%", status: "Active" },
    { id: "CDN-EU-01", name: "Europe Primary", region: "eu-west-1", url: "https://eu-primary.mediatrack.cdn", latency: "18ms", throughput: "1.8 Gbps", conn: "18,392", uptime: "99.95%", bandwidth: "72%", status: "Active" },
    { id: "CDN-AP-01", name: "Asia Pacific Primary", region: "an-southeast-1", url: "https://ap-primary.mediatrack.cdn", latency: "45ms", throughput: "1.2 Gbps", conn: "12,483", uptime: "99.82%", bandwidth: "91%", status: "Degraded" },
    { id: "CDN-SA-01", name: "South America Primary", region: "sa-east-1", url: "https://sa-primary.mediatrack.cdn", latency: "22ms", throughput: "890 Mbps", conn: "8,927", uptime: "99.91%", bandwidth: "68%", status: "Active" },
  ];

  const filteredNodes = nodes.filter(node => {
    if (selectedRegion === "All Regions") return true;
    return node.name.includes(selectedRegion) || node.region.includes(selectedRegion.toLowerCase().replace(" ", "-"));
  });

  return (
    <div className="cdn-page-wrapper">
      <div className="container-fluid p-0">
        <div className="cdn-header px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/operator")} className="btn-back-link">
              ← Back to Platform Dashboard
            </button>
          </div>
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="header-icon-box">
              <FiGlobe size={24} color="white" />
            </div>
            <div className="header-title-text">
              <h1 className="h3 fw-bold text-white mb-0">CDN Infrastructure</h1>
              <p className="subtitle-bright small mb-0">Global Network Health & Delivery Monitoring</p>
            </div>
            <button className="btn btn-dark-purple ms-auto d-flex align-items-center gap-2">
              <FiRefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* SUMMARY METRICS */}
        <div className="row g-3 px-4 mb-4">
          <div className="col-md-6">
            <div className="summary-card p-4 rounded-3 d-flex align-items-center gap-3 border-subtle">
              <div className="metric-icon-box"><FiLayers size={22} color="#c9b3f9" /></div>
              <div>
                <span className="label-bright smallest d-block text-uppercase mb-1 fw-bold">Active Endpoints</span>
                <h2 className="fw-bold mb-0 text-purple-bright">5/6</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="summary-card p-4 rounded-3 d-flex align-items-center gap-3 border-subtle">
              <div className="metric-icon-box"><FiWifi size={22} color="#ff9800" /></div>
              <div>
                <span className="label-bright smallest d-block text-uppercase mb-1 fw-bold">Avg Latency</span>
                <h2 className="fw-bold mb-0 text-orange-bright">22ms</h2>
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL PERFORMANCE HEATMAP */}
        <div className="px-4 mb-5">
           <h4 className="text-white fw-bold mb-4">Global Regional Performance Heatmap</h4>
           <div className="row g-3">
             {regions.map((region, idx) => (
               <div key={idx} className="col-md-3">
                 <div className={`heatmap-card p-3 rounded-3 ${region.color}`}>
                   <div className="d-flex justify-content-between mb-3">
                     <span className="smallest fw-bold opaque-white">{region.short}</span>
                     <FiGlobe size={18} className="opaque-white" />
                   </div>
                   <h5 className="text-white fw-bold mb-4">{region.name}</h5>
                   
                   {[
                     { l: "Latency", v: region.latency },
                     { l: "Uptime", v: region.uptime },
                     { l: "Bandwidth", v: region.bandwidth },
                     { l: "Connections", v: region.conn },
                   ].map((m, i) => (
                     <div key={i} className="d-flex justify-content-between mb-2">
                       <span className="smallest text-white opaque-80">{m.l}</span>
                       <span className="smallest text-white fw-bold">{m.v}</span>
                     </div>
                   ))}
                   
                   <div className="mt-4 d-flex align-items-center gap-2">
                     <span className="dot-white"></span>
                     <span className="smallest fw-bold text-white text-uppercase">{region.perf}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* CDN NODE DETAILS */}
        <div className="px-4 pb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h4 className="text-white fw-bold mb-0">CDN Node Details</h4>
             <div className="dropdown position-relative">
              <button 
                className={`btn btn-dark-dropdown d-flex justify-content-between align-items-center gap-5`} 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {selectedRegion}
                <FiChevronDown />
              </button>
              {isFilterOpen && (
                <ul className="custom-dropdown-menu">
                  {["All Regions", "North America", "Europe", "Asia Pacific", "South America"].map((opt) => (
                    <li key={opt} onClick={() => { setSelectedRegion(opt); setIsFilterOpen(false); }} className={selectedRegion === opt ? 'selected' : ''}>
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="row g-4">
            {filteredNodes.map((node, idx) => (
              <div key={idx} className="col-md-6">
                <div className="node-card-modern p-4 rounded-3 border-dark-subtle">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="node-icon-box-small"><FiServer size={20} color="#c9b3f9" /></div>
                      <div>
                        <h6 className="text-white fw-bold mb-0">{node.name}</h6>
                        <span className="smallest text-muted">{node.id}</span>
                      </div>
                    </div>
                    <span className={`status-pill-modern ${node.status.toLowerCase()}`}>{node.status}</span>
                  </div>

                  <div className="url-box mb-4 p-2 rounded-2">
                    <span className="label-bright smallest d-block mb-1">Base URL</span>
                    <span className="text-white small fw-bold">{node.url}</span>
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <FiGlobe size={14} className="text-purple-light" />
                        <div>
                          <span className="label-bright smallest d-block">Region</span>
                          <span className="text-white small fw-bold">{node.region}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FiZap size={14} className="text-purple-light" />
                        <div>
                          <span className="label-bright smallest d-block">Throughput</span>
                          <span className="text-white small fw-bold">{node.throughput}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <FiWifi size={14} className="text-orange-bright" />
                        <div>
                          <span className="label-bright smallest d-block">Latency</span>
                          <span className="text-orange-bright small fw-bold">{node.latency}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FiLayers size={14} className="text-purple-light" />
                        <div>
                          <span className="label-bright smallest d-block">Connections</span>
                          <span className="text-white small fw-bold">{node.conn}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                       <div className="d-flex justify-content-between mb-1">
                          <span className="label-bright smallest">Uptime</span>
                          <span className="text-white smallest fw-bold">{node.uptime}</span>
                       </div>
                       <div className="progress thin-progress bg-dark">
                          <div className="progress-bar bg-purple" style={{ width: node.uptime }}></div>
                       </div>
                    </div>
                    <div className="col-6">
                       <div className="d-flex justify-content-between mb-1">
                          <span className="label-bright smallest">Bandwidth</span>
                          <span className="text-white smallest fw-bold">{node.bandwidth}</span>
                       </div>
                       <div className="progress thin-progress bg-dark">
                          <div className="progress-bar" style={{ width: node.bandwidth, backgroundColor: node.status === 'Degraded' ? '#ff9800' : '#6a0dad' }}></div>
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

export default CDNPage;