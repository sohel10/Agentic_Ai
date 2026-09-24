# ⚡ Secure Multi-Agent Vehicle Safety Data Platform

A cost-optimized, production-grade multi-agent orchestration platform designed to extract, validate, and report on high-volume automotive telemetry and incident datasets. This repository contains both a high-fidelity local prototyping framework and the infrastructure definitions for cloud-native serverless deployment.

## 📊 Platform Architecture

The system splits computational workloads and reasoning tasks across specialized agent runtimes to enforce strict data integrity boundaries and minimize token overhead.

```text
 ┌──────────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
 │ 📝 Input Data Stream ├─────►│ 🤖 Data Extraction Agent├─────►│ 🤖 QA Validation Agent │
 │  (Raw Incident Logs) │      │   (Structures Parameters)│      │  (Flags Inconsistencies)│
 └──────────────────────┘      └─────────────────────────┘      └───────────┬────────────┘
                                                                            │
                                                                            ▼
 ┌──────────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
 │ 📱 Client Dashboard  │◄─────┤ 📋 Executive Safety Rep.│◄─────┤ 🤖 Report Gen. Agent   │
 │   (React / Vercel)   │      │   (Vetted Production)   │      │  (Compiles Analytics)  │
 └──────────────────────┘      └─────────────────────────┘      └────────────────────────┘
```

### 🛡️ Core Engineering Principles
1. **Metadata Isolation Boundary:** The platform abstracts massive flat files into structured metadata schemas and counts before performing inference, ensuring flat-rate token consumption regardless of dataset growth.
2. **Separation of Concerns:** Data cleaning and schema standardization are handled upstream via high-performance scripting layers, reserving LLM processing strictly for high-level semantic analysis and logical reasoning.
3. **Automated Critique Loop:** An independent Quality Assurance agent programmatically audits output parameters against the source data, catching math mismatches or text hallucinations before final artifact compilation.

---

## 💻 Local Prototyping Script (`gm_multi_agent_openai.py`)

This core Python application initializes a sequential multi-agent pipeline using authenticated environment keys to execute data extraction, validation checks, and report generation workflows.

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_agent(agent_name, system_prompt, user_prompt):
    print(f"\n🤖 {agent_name} working...")
    response = client.chat.completions.create(
        model="gpt-4",
        max_tokens=1024,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )
    return response.choices.message.content

# Raw vehicle incident data context
raw_data = """
Head Gasket Failures: 14 incidents (50%) - CRITICAL
- Engine head gaskets failing even with regular maintenance
- Causes sudden loss of power at highway speeds
- Primarily affects 2018 Honda Accord 1.5L

Electrical/Warning Systems: 6 incidents
- Airbag errors appearing randomly
- Dashboard warning lights unexpected

Fuel System Failures: 3 incidents
- Fuel injector cascading failures
- Fuel pump failures

Manufacturer: Honda (100% of database)
- Honda Accord 2018: 25 incidents (89%)
- Acura RDX 2012: 3 incidents
"""

if __name__ == "__main__":
    print("🚀 Multi-Agent Vehicle Safety Pipeline\n")

    # Agent 1: Extraction Logic
    extraction = call_agent(
        "DataExtractionAgent",
        "You are a vehicle safety data extraction agent. Extract failure categories, counts, severity, and affected vehicles from raw incident data. Return structured JSON.",
        f"Extract structured data from this report:\n{raw_data}"
    )
    print(extraction)

    # Agent 2: QA Validation Loop
    validation = call_agent(
        "ValidationAgent",
        "You are a quality assurance agent for vehicle safety data. Check if extracted data matches the source. Flag any hallucinations or inconsistencies. Return PASS or FAIL with reasons.",
        f"Source data:\n{raw_data}\n\nExtracted data:\n{extraction}\n\nDoes the extraction match the source? Flag any errors."
    )
    print(validation)

    # Agent 3: Executive Reporting
    report = call_agent(
        "ReportAgent",
        "You are a vehicle safety report generator. Create a professional safety report from validated data. Include severity ratings and recommended actions.",
        f"Generate a safety report from this validated data:\n{validation}"
    )
    print(f"\n📋 ======= FINAL SAFETY REPORT =======\n")
    print(report)
```

---

## ☁️ Enterprise Cloud Deployment Setup

To transition this platform to production-grade architecture, the application decouples computing layers using a modern serverless design:

* **Frontend Dashboard Interface:** Deployed as an optimized React user interface on **Vercel**, letting users submit text instructions over a secure network.
* **Serverless Backend Conductor:** An event-driven **AWS Lambda function** running a Python execution environment via the official AWS SDK (`boto3`). 
* **API Perimeter Gateway:** **Amazon API Gateway** exposes a secure `POST /analyze` REST endpoint, protecting underlying cloud infrastructure from outside modification.
* **Autonomous Orchestration Plane:** Managed declaratively within **Amazon Bedrock AgentCore** using custom configuration bundles to handle target routing paths over private cloud network fabrics.

## 🛠️ Execution & Deployment Commands

### Local Sandbox Initialization
```bash
# Clone the repository and install project dependencies
git clone https://github.com
cd Agentic_Ai
pip install python-dotenv openai

# Execute the local prototyping multi-agent chain
python gm_multi_agent_openai.py
```

### React Web Interface Initialization
```bash
# Enter the UI project folder workspace
cd fleet-ui
npm install

# Launch the local application development web server
npm run dev
```
