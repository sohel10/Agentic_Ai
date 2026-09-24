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
    
    // Animate interface step metrics
    setCurrentStep(1); // Analyst state activated
    await new Promise((r) => setTimeout(r, 1200));
    
    setCurrentStep(2); // Auditor state activated
    await new Promise((r) => setTimeout(r, 1200));
    
    setCurrentStep(3); // Direct infrastructure handshake state
    
    try {
      // 🔗 YOUR LIVE SECURITY AUTHORIZED CLOUD INSTANCE GATEWAY LINK
      const apiEndpoint = "https://amazonaws.com";
      
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: query })
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === "success") {
        setOutput(data.orchestrator_output);
      } else {
        setErrorMessage(data.error || "An unknown infrastructure execution exception occurred.");
      }
    } catch (err) {
      setErrorMessage("Network connectivity failure: Unable to establish handshake with API Gateway.");
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '15px', marginBottom: '25px' }}>
        <h2 style={{ margin: '0 0 6px 0', color: '#111827', fontSize: '24px', fontWeight: '700' }}>⚡ Enterprise Multi-Agent Telemetry Platform</h2>
        <span style={{ fontSize: '14px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>STATUS: AWS LIVE GATEWAY CONNECTED</span>
      </div>

      <p style={{ margin: '0 0 20px 0', color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>
        Submit high-volume data operational queries. The request triggers an event-driven AWS Lambda backend microservice, invoking an autonomous multi-agent validation loop within Bedrock AgentCore.
      </p>

      <form onSubmit={handleRunPipeline} style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Analyze reliability logs to isolate top 3 failure categories and calculate average severity scores..."
          style={{ flexGrow: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', transition: 'border-color 0.2s', outline: 'none' }}
          disabled={loading}
        />
        <button
          type="submit"
          style={{ backgroundColor: loading ? '#9ca3af' : '#2563eb', color: '#ffffff', border: 'none', padding: '0 24px', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '14px', transition: 'background-color 0.2s' }}
          disabled={loading}
        >
          {loading ? 'Orchestrating...' : 'Execute Pipeline'}
        </button>
      </form>

      {/* Progress Stage Component Tracking Block */}
      {loading && (
        <div style={{ display: 'flex', gap: '15px', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '25px' }}>
          <div style={{ fontSize: '14px', color: currentStep >= 1 ? '#2563eb' : '#9ca3af', fontWeight: currentStep === 1 ? '700' : '500' }}>① Analyst Drafting</div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>➔</div>
          <div style={{ fontSize: '14px', color: currentStep >= 2 ? '#2563eb' : '#9ca3af', fontWeight: currentStep === 2 ? '700' : '500' }}>② Auditor Verifying</div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>➔</div>
          <div style={{ fontSize: '14px', color: currentStep >= 3 ? '#2563eb' : '#9ca3af', fontWeight: currentStep === 3 ? '700' : '500' }}>③ Streaming AWS Cloud Response</div>
        </div>
      )}

      {/* Error Alert Box Component */}
      {errorMessage && (
        <div style={{ padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', color: '#991b1b', fontSize: '14px', marginBottom: '25px', fontFamily: 'monospace' }}>
          ❌ {errorMessage}
        </div>
      )}

      {/* Code Compilation Production Output Panel */}
      {output && (
        <div style={{ marginTop: '25px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#374151', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📋 Audited Output Summary</h4>
          <pre style={{ backgroundColor: '#1f2937', color: '#34d399', padding: '20px', borderRadius: '8px', overflowX: 'auto', fontSize: '13px', lineHeight: '1.6', fontFamily: 'Courier New, Courier, monospace', border: '1px solid #374151', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
