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
    return response.choices[0].message.content

# Raw vehicle incident data context - COMPLETELY NEUTRALIZED
raw_data = """
Head Gasket Failures: 14 incidents (50%) - CRITICAL
- Engine head gaskets failing even with regular maintenance
- Causes sudden loss of power at highway speeds
- Primarily affects 2018 Sedan Model X 1.5L

Electrical/Warning Systems: 6 incidents
- Airbag errors appearing randomly
- Dashboard warning lights unexpected

Fuel System Failures: 3 incidents
- Fuel injector cascading failures
- Fuel pump failures

Manufacturer: Enterprise Fleet Logistics (100% of database)
- Sedan Model X 2018: 25 incidents (89%)
- SUV Model Y 2012: 3 incidents
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
