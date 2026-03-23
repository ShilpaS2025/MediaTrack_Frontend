import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiZap, FiRefreshCw, FiChevronDown, FiDatabase, FiArrowLeft } from "react-icons/fi";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../../styles/ingest.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IngestPage = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Status");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const rawQueueData = [
    { ingestId: "ING-9247", assetId: "AST-4728", uri: "epic_adventure_s2e8_4k_master.mp4", subUri: "s3://mediatrack-ingest-primary/epic_adventure_s..", format: "4K HEVC", size: "4.2 GB", priority: "High", status: "InProgress", progress: 68, time: "Start: 14:23:18" },
    { ingestId: "ING-9246", assetId: "AST-4727", uri: "future_vision_doc_uhd_master.mp4", subUri: "s3://mediatrack-ingest-primary/future_vision_do..", format: "UHD HDR", size: "6.8 GB", priority: "Normal", status: "InProgress", progress: 42, time: "Start: 14:31:45" },
    { ingestId: "ING-9245", assetId: "AST-4726", uri: "cinema_classics_collection_hd.mp4", subUri: "s3://mediatrack ingest primary/cinema_classics_..", format: "HD H.264", size: "2.8 GB", priority: "Normal", status: "Queued", progress: 0, time: "Start: --:--:--" },
    { ingestId: "ING-9244", assetId: "AST-4725", uri: "true_stories_ep12_sd.mp4", subUri: "s3://mediatrack-ingest-primary/true_stories_ep1..", format: "SD H.264", size: "1.2 GB", priority: "Low", status: "Completed", progress: 0, time: "Start: 13:45:22", endTime: "End: 13:52:18" },
    { ingestId: "ING-9243", assetId: "AST-4724", uri: "adventure_quest_trailer_4k.mp4", subUri: "s3://mediatrack-ingest-primary/adventure_quest_..", format: "4K H.265", size: "890 MB", priority: "High", status: "Failed", progress: 0, time: "Start: 13:12:08", endTime: "End: 13:18:42" },
    { ingestId: "ING-9242", assetId: "AST-4723", uri: "documentary_series_pilot.mp4", subUri: "s3://mediatrack ingest primary/documentary_seri..", format: "HD H.264", size: "3.1 GB", priority: "Normal", status: "Completed", progress: 0, time: "Start: 12:58:33", endTime: "End: 13:11:22" },
    { ingestId: "ING-9241", assetId: "AST-4722", uri: "wildlife_nature_4k_master.mp4", subUri: "s3://mediatrack ingest primary/wildlife_nature_..", format: "4K HEVC", size: "5.1 GB", priority: "Normal", status: "Queued", progress: 0, time: "Start: --:--:--" },
    { ingestId: "ING-9240", assetId: "AST-4721", uri: "tech_review_vlog_hd.mp4", subUri: "s3://mediatrack ingest primary/tech_review_vlog..", format: "HD H.264", size: "900 MB", priority: "Low", status: "Completed", progress: 0, time: "Start: 11:30:15", endTime: "End: 11:45:22" },
  ];

  // Filtering Logic
  const filteredData = rawQueueData.filter(item => {
    if (selectedFilter === "All Status") return true;
    if (selectedFilter === "In Progress") return item.status === "InProgress";
    return item.status === selectedFilter;
  });

  const chartData = {
    labels: ['Pipeline_Status'],
    datasets: [
      {
        label: 'Pipeline Data',
        data: [2],
        backgroundColor: '#e31e24', 
      }
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#12121e',
        bodyColor: '#a371f7',
        callbacks: {
           title: () => 'Pipeline Status',
           label: () => [`Queued : 2`, `InProgress : 2`, `Completed : 3`, `Failed : 1`]
        }
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b949e' }, max: 8 },
      y: { display: true, grid: { display: false }, ticks: { color: '#8b949e' } }
    }
  };

  return (
    <div className="ingest-page-wrapper">
      <div className="dashboard-container p-0">
        <div className="ingest-header px-4 py-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate("/operator")} className="btn-back-link">
              ← Back to Platform Dashboard
            </button>
          </div>
          <div className="d-flex align-items-center gap-3 mt-3">
            <div className="header-icon-box">
              <FiZap size={24} color="white" />
            </div>
            <div className="header-title-text">
              <h1 className="h3 fw-bold text-white mb-0">Ingest & Transcode Pipeline</h1>
              <p className="text-muted small mb-0">Queue Management & Job Monitoring</p>
            </div>
            <button className="btn btn-dark-purple ms-auto d-flex align-items-center gap-2">
              <FiRefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="row g-3 px-4 mb-4">
          {[
            { label: "Queued Jobs", value: "2" },
            { label: "In Progress", value: "2" },
            { label: "Completed", value: "3" },
            { label: "Failed", value: "1", isFailed: true },
          ].map((item, idx) => (
            <div key={idx} className="col-md-3">
              <div className="ingest-summary-card p-3 rounded-2">
                <h2 className={`fw-bold mb-1 ${item.isFailed ? 'text-danger' : 'text-purple'}`}>{item.value}</h2>
                <span className="text-muted smallest opaque-text">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 mb-4">
          <div className="ingest-card p-4 rounded-3">
            <h5 className="text-white fw-bold mb-4">Pipeline Status Distribution</h5>
            <div style={{ height: '300px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="px-4 d-flex justify-content-end mb-3 position-relative">
          <div className="dropdown">
            <button 
              className={`btn btn-dark-dropdown ${isFilterOpen ? 'active' : ''} d-flex justify-content-between align-items-center gap-5`} 
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {selectedFilter}
              <FiChevronDown />
            </button>
            
            {isFilterOpen && (
              <ul className="custom-dropdown-menu">
                {["All Status", "Queued", "In Progress", "Completed", "Failed"].map((option) => (
                  <li 
                    key={option} 
                    onClick={() => { setSelectedFilter(option); setIsFilterOpen(false); }}
                    className={selectedFilter === option ? 'selected' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="px-4 pb-5">
          <div className="ingest-card rounded-3 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center p-4">
              <h4 className="text-white fw-bold mb-0">Active Pipeline Queue</h4>
              <span className="text-muted small">{filteredData.length} Job{filteredData.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead className="smallest text-muted text-uppercase">
                  <tr className="border-bottom border-secondary border-opacity-25">
                    <th className="px-4 py-3 border-0">INGEST ID</th>
                    <th className="py-3 border-0">ASSET ID</th>
                    <th className="py-3 border-0">SOURCE URI</th>
                    <th className="py-3 border-0">FORMAT</th>
                    <th className="py-3 border-0">PRIORITY</th>
                    <th className="py-3 border-0">STATUS</th>
                    <th className="py-3 border-0">PROGRESS</th>
                    <th className="py-3 border-0 px-4">TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((job, idx) => (
                    <tr key={idx} className="border-bottom border-secondary border-opacity-10">
                      <td className="px-4 py-4 fw-bold text-white d-flex align-items-center gap-2">
                        <FiDatabase className="text-muted" />{job.ingestId}
                      </td>
                      <td className="py-4 fw-bold text-purple-light">{job.assetId}</td>
                      <td className="py-4">
                        <div className="fw-bold text-white mb-0 small">{job.uri}</div>
                        <div className="text-muted smallest">{job.subUri}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-white small fw-bold">{job.format}</div>
                        <div className="text-muted smallest">{job.size}</div>
                      </td>
                      <td className="py-4">
                        <div className={`ingest-priority-badge ${job.priority.toLowerCase()}`}>
                          {job.priority}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className={`status-pill ${job.status.toLowerCase()}`}>
                          <span className="dot"></span>{job.status}
                        </div>
                      </td>
                      <td className="py-4">
                        {job.progress > 0 ? (
                          <div style={{ width: '80px' }}>
                            <span className="text-white smallest mb-1 d-block">{job.progress}%</span>
                            <div className="progress bg-secondary bg-opacity-10" style={{ height: '6px', borderRadius: '10px' }}>
                              <div className="progress-bar bg-purple" style={{ width: `${job.progress}%` }}></div>
                            </div>
                          </div>
                        ) : <span className="text-muted">--</span>}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white smallest fw-bold">{job.time}</div>
                        {job.endTime && <div className="text-muted smallest">{job.endTime}</div>}
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-muted">No jobs found for the selected status.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngestPage;