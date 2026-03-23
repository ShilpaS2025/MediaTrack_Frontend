import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiZap, 
  FiCheckCircle, 
  FiGlobe, 
  FiShield, 
  FiArrowRight, 
  FiActivity,
  FiClock,
  FiDatabase,
  FiSmile
} from "react-icons/fi";
import { FaWaveSquare } from "react-icons/fa";
import { operatorApi } from "../../api/operatorApi";
import "../../styles/operator.css";

const PlatformOperation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    ingest: { active: 2, queued: 2, completed: 3, health: 87, trend: "+5%" },
    packaging: { passed: 4, failed: 2, pending: 2, health: 50, trend: "-10%" },
    cdn: { active: 5, total: 6, throughput: "7.2 Gbps", health: 99.9, trend: "0%" },
    drm: { granted: 6, denied: 3, rate: "67%", health: 67, trend: "+2%" },
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {/* DASHBOARD HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="platform-icon">
            <FaWaveSquare color="white" />
          </div>
          <div className="header-text">
            <h1>Platform Operations</h1>
            <p>High‑Scale OTT Delivery System Monitoring</p>
          </div>
          
          <div className="header-controls">
            <div className="time-box">
              <FiClock className="me-2" />
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </div>
            <div className="live-pill">
              <span className="dot" style={{ width: 8, height: 8, background: '#a371f7', borderRadius: '50%' }}></span>
              Live
            </div>
          </div>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid-container">
        {/* Ingest & Transcode */}
        <div className="metric-card" onClick={() => navigate("/ingest")}>
          <div className="card-head">
            <div className="card-icon-box">
              <FiZap color="white" />
            </div>
            <FiArrowRight className="arrow-link" />
          </div>
          <h3>Ingest & Transcode</h3>
          <p>Monitor pipeline queue and job status</p>
          <div className="badge-container">
            <div className="status-badge">active: {data.ingest.active}</div>
            <div className="status-badge">queued: {data.ingest.queued}</div>
            <div className="status-badge">completed: {data.ingest.completed}</div>
          </div>
        </div>

        {/* Packaging & QC */}
        <div className="metric-card" onClick={() => navigate("/packaging")}>
          <div className="card-head">
            <div className="card-icon-box" style={{ background: '#7952b3' }}>
              <FiCheckCircle color="white" />
            </div>
            <FiArrowRight className="arrow-link" />
          </div>
          <h3>Packaging & QC</h3>
          <p>Quality control and format packaging</p>
          <div className="badge-container">
            <div className="status-badge">passed: {data.packaging.passed}</div>
            <div className="status-badge">failed: {data.packaging.failed}</div>
            <div className="status-badge">pending: {data.packaging.pending}</div>
          </div>
        </div>

        {/* CDN Infrastructure */}
        <div className="metric-card" onClick={() => navigate("/cdn")}>
          <div className="card-head">
            <div className="card-icon-box">
              <FiGlobe color="white" />
            </div>
            <FiArrowRight className="arrow-link" />
          </div>
          <h3>CDN Infrastructure</h3>
          <p>Network health and global delivery</p>
          <div className="badge-container">
            <div className="status-badge">active: {data.cdn.active}</div>
            <div className="status-badge">total: {data.cdn.total}</div>
            <div className="status-badge">throughput: {data.cdn.throughput}</div>
          </div>
        </div>

        {/* Security & DRM */}
        <div className="metric-card" onClick={() => navigate("/drm")}>
          <div className="card-head">
            <div className="card-icon-box">
              <FiShield color="white" />
            </div>
            <FiArrowRight className="arrow-link" />
          </div>
          <h3>Security & DRM</h3>
          <p>License management and event monitoring</p>
          <div className="badge-container">
            <div className="status-badge">granted: {data.drm.granted}</div>
            <div className="status-badge">denied: {data.drm.denied}</div>
            <div className="status-badge">rate: {data.drm.rate}</div>
          </div>
        </div>
      </div>

      {/* SYSTEM HEALTH OVERVIEW */}
      <div className="health-section">
        <h2>System Health Overview</h2>
        <div className="health-grid">
          {/* Ingest Pipeline */}
          <div className="health-status-card">
            <div className="health-card-head">
              <FiDatabase className="health-icon-small" />
              <div className="trend-indicator trend-up">{data.ingest.trend}</div>
            </div>
            <div className="health-value">{data.ingest.health}%</div>
            <div className="health-label">Ingest Pipeline</div>
          </div>

          {/* CDN Availability */}
          <div className="health-status-card">
            <div className="health-card-head">
              <FiGlobe className="health-icon-small" />
              <div className="trend-indicator trend-neutral">{data.cdn.trend}</div>
            </div>
            <div className="health-value">{data.cdn.health}%</div>
            <div className="health-label">CDN Availability</div>
          </div>

          {/* QC Pass Rate */}
          <div className="health-status-card">
            <div className="health-card-head">
              <FiCheckCircle className="health-icon-small" style={{ color: '#e3b341' }} />
              <div className="trend-indicator trend-down">{data.packaging.trend}</div>
            </div>
            <div className="health-value">{data.packaging.health}%</div>
            <div className="health-label">QC Pass Rate</div>
          </div>

          {/* DRM Success */}
          <div className="health-status-card">
            <div className="health-card-head">
              <FiShield className="health-icon-small" />
              <div className="trend-indicator trend-up">{data.drm.trend}</div>
            </div>
            <div className="health-value">{data.drm.health}%</div>
            <div className="health-label">DRM Success</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOperation;