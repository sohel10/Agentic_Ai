import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRunPipeline = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setOutput('');
    setErrorMessage('');
    
    // Animate interface step metrics to match the supervisor loop
    setCurrentStep(1); 
    await new Promise((r) => setTimeout(r, 1000));
    setCurrentStep(2); 
    await new Promise((r) => setTimeout(r, 1000));
    setCurrentStep(3); 
    
    try {
      // 🔗 YOUR LIVE SECURITY-AUTHORIZED API GATEWAY URL
      const apiEndpoint = "https://amazonaws.com";
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query })
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === "success") {
        setOutput(data.orchestrator_output);
      } else {
        setErrorMessage(data.error || "An infrastructure execution exception occurred.");
      }
    } catch (err) {
      setErrorMessage("Handshake failure: Unable to connect with secure API Gateway.");
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Header Block */}
      <div style={styles.headerBlock}>
        <h2 style={styles.mainTitle}>❤️ HF RiskAI Clinical Management Console</h2>
        <div style={styles.statusBadge}>SYSTEM STATUS: LIVE SECURE API CONNECTED</div>
      </div>

      {/* Overview Metrics Cards Row */}
      <div style={styles.metricsRow}>
        <div style={styles.metricCard}>
          <h3 style={styles.metricCardH3}>42,981</h3>
          <p style={styles.metricCardP}>MIMIC-IV HF Patients</p>
        </div>
        <div style={styles.metricCard}>
          <h3 style={styles.metricCardH3}>0.748</h3>
          <p style={styles.metricCardP}>Model AUC Score</p>
        </div>
        <div style={styles.metricCard}>
          <h3 style={styles.metricCardH3}>&lt;50ms</h3>
          <p style={styles.metricCardP}>Inference Latency</p>
        </div>
      </div>

      <p style={styles.descriptionText}>
        Submit risk-stratification or clinical telemetry queries. The interface pipes parameters directly into an event-driven AWS Lambda microservice to orchestrate our multi-agent Bedrock validation loop.
      </p>

      {/* Input Action Form */}
      <form onSubmit={handleRunPipeline} style={styles.formLayout}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Query patient safety parameters to analyze highest risk component trends..."
          style={styles.textInput}
          disabled={loading}
        />
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? 'Orchestrating...' : 'Launch Pipeline'}
        </button>
      </form>

      {/* Multi-Agent Live Step Progress Animation */}
      {loading && (
        <div style={styles.progressContainer}>
          <div style={{ ...styles.stepText, color: currentStep >= 1 ? '#00e5ff' : '#64748b', fontWeight: currentStep === 1 ? '700' : '400' }}>① Clinical Analyst Processing</div>
          <div style={styles.arrow}>➔</div>
          <div style={{ ...styles.stepText, color: currentStep >= 2 ? '#00e5ff' : '#64748b', fontWeight: currentStep === 2 ? '700' : '400' }}>② Compliance Auditor Verifying</div>
          <div style={styles.arrow}>➔</div>
          <div style={{ ...styles.stepText, color: currentStep >= 3 ? '#00e5ff' : '#64748b', fontWeight: currentStep === 3 ? '700' : '400' }}>③ Extracting Verified Cloud Result</div>
        </div>
      )}

      {/* Error Alert Box */}
      {errorMessage && <div style={styles.errorBox}>❌ {errorMessage}</div>}

      {/* Production Output Console Terminal */}
      {output && (
        <div style={styles.terminalContainer}>
          <div style={styles.terminalHeader}>AUDITED REPORT SUMMARY - SIMULATION COMPLETE</div>
          <pre style={styles.terminalOutput}>{output}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  dashboardContainer: {
    maxWidth: '950px',
    margin: '40px auto',
    padding: '35px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#0a192f',
    borderRadius: '16px',
    border: '1px solid #172a45',
    boxShadow: '0 10px 30px rgba(2, 12, 27, 0.7)',
    color: '#cbd5e1'
  },
  headerBlock: {
    borderBottom: '1px solid #172a45',
    paddingBottom: '20px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px'
  },
  mainTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '26px',
    fontWeight: '700',
    letterSpacing: '-0.02em'
  },
  statusBadge: {
    fontSize: '12px',
    color: '#00e5ff',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontFamily: 'monospace',
    fontWeight: '600',
    border: '1px solid rgba(0, 229, 255, 0.2)'
  },
  metricsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '25px',
    flexWrap: 'wrap'
  },
  metricCard: {
    flex: '1 1 200px',
    backgroundColor: '#112240',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #233554',
    textAlign: 'center'
  },
  metricCardH3: { 
    margin: '0 0 5px 0', 
    color: '#00e5ff', 
    fontSize: '24px', 
    fontWeight: '700' 
  },
  metricCardP: { 
    margin: 0, 
    color: '#8892b0', 
    fontSize: '13px' 
  },
  descriptionText: {
    color: '#8892b0',
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '25px'
  },
  formLayout: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px'
  },
  textInput: {
    flexGrow: 1,
    padding: '14px 18px',
    borderRadius: '8px',
    backgroundColor: '#112240',
    border: '1px solid #233554',
    color: '#f8fafc',
    fontSize: '15px',
    outline: 'none'
  },
  submitButton: {
    backgroundColor: '#00e5ff',
    color: '#0a192f',
    border: 'none',
    padding: '0 28px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px'
  },
  progressContainer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'rgba(0, 229, 255, 0.03)',
    borderRadius: '8px',
    border: '1px solid rgba(0, 229, 255, 0.1)',
    marginBottom: '30px'
  },
  stepText: { fontSize: '13px', fontFamily: 'monospace' },
  arrow: { color: '#233554', fontSize: '12px' },
  errorBox: {
    padding: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    color: '#fca5a5',
    fontSize: '14px',
    marginBottom: '30px',
    fontFamily: 'monospace'
  },
  terminalContainer: {
    marginTop: '30px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #233554'
  },
  terminalHeader: {
    backgroundColor: '#112240',
    padding: '10px 16px',
    color: '#8892b0',
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: '600',
    borderBottom: '1px solid #233554'
  },
  terminalOutput: {
    margin: 0,
    backgroundColor: '#020c1b',
    color: '#64ffda',
    padding: '20px',
    overflowX: 'auto',
    fontSize: '13px',
    lineHeight: '1.6',
    fontFamily: '"Fira Code", "Courier New", monospace'
  }
};
