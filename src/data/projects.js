const projects = [
  // ⭐ FEATURED PROJECTS (With Details Page - Now at the Top)
  {
    id: "ddos-protection",
    Title: "Azure DDoS Protection Lab",
    Description: "Simulated volumetric DDoS attacks and validated real-time mitigation using Azure Monitor.",
    Img: "/projects/ddos.png",
    Link: "https://github.com/AmalUBasnayake/Azure-DDoS-Protection-HandsOn-Lab",
    category: "Cloud",
    hasDetails: true,
    problem: "Traditional infrastructure fails under volumetric DDoS attacks, leading to service downtime.",
    solution: "Implemented Azure DDoS Network Protection with adaptive tuning and real-time monitoring.",
    result: "Achieved zero downtime during simulated Layer 4 attacks with automated mitigation."
  },
  {
    id: "soar-auto-ip-block",
    Title: "Azure Sentinel SOAR Auto IP Block",
    Description: "Automated threat response pipeline using Sentinel and Logic Apps to block malicious IPs.",
    Img: "/projects/soar.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Sentinel-SOAR-Auto-IP-Block",
    category: "SOC",
    hasDetails: true,
    problem: "Manual incident response to brute-force attacks is slow, allowing attackers more time to succeed.",
    solution: "Built an automation playbook using Logic Apps to instantly block offending IPs in NSG rules.",
    result: "Reduced response time from minutes to seconds, effectively stopping 100% of brute-force attempts."
  },
  {
    id: "sentinel-siem",
    Title: "Azure Sentinel SIEM Threat Detection",
    Description: "Centralized log monitoring and detection using Microsoft Sentinel with real-world scenarios.",
    Img: "/projects/sentinel.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Sentinel-SIEM-Threat-Detection-Lab",
    category: "SOC",
    hasDetails: true,
    problem: "Siloed security logs make it impossible to correlate multi-stage attacks across the environment.",
    solution: "Deployed Microsoft Sentinel as a central SIEM, connecting logs from Azure AD, VMs, and Firewalls.",
    result: "Enabled real-time visibility and cross-resource incident correlation using custom KQL queries."
  },
  {
    id: "honeypot-map",
    Title: "Azure Sentinel Honeypot Attack Map",
    Description: "Live attack visualization using honeypot logs integrated with Sentinel SIEM and Log Analytics.",
    Img: "/projects/honeypot.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Sentinel-Honeypot-Live-Attack-Map",
    category: "SOC",
    hasDetails: true,
    problem: "Lack of visibility into where global threats are originating from during active scans.",
    solution: "Set up an exposed VM honeypot and mapped geo-location data from failed RDP logins to a dashboard.",
    result: "Visualized thousands of global login attempts in real-time on a Sentinel workbook map."
  },
  {
    id: "vuln-management",
    Title: "Vulnerability Management with Nessus",
    Description: "Performed end-to-end vulnerability scanning and remediation using Nessus Essentials.",
    Img: "/projects/nessus.png",
    Link: "https://github.com/AmalUBasnayake/Vulnerability-Management-Nessus",
    category: "Endpoint",
    hasDetails: true,
    problem: "Unpatched software and weak configurations create easy entry points for attackers.",
    solution: "Conducted credentialed scans using Nessus to identify critical vulnerabilities and misconfigurations.",
    result: "Remediated 15+ high-risk vulnerabilities and validated the security posture with follow-up scans."
  },

  // 📁 REGULAR PROJECTS (Lab Archive)
  {
    id: "jit-vm",
    Title: "Azure Just-in-Time VM Access",
    Description: "Implemented JIT access to reduce attack surface and secure VM exposure.",
    Img: "/projects/jit.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Just-in-Time-VM-Access-Security-Lab",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "waf-security",
    Title: "Azure WAF Web Security Lab",
    Description: "Protected web apps using Azure WAF and Application Gateway against OWASP threats.",
    Img: "/projects/waf.png",
    Link: "https://github.com/AmalUBasnayake/Azure-WAF-Application-Gateway-WebApp-Security-Lab",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "firewall-hub",
    Title: "Azure Firewall Hub-Spoke Architecture",
    Description: "Enterprise network segmentation using hub-spoke topology with centralized control.",
    Img: "/projects/firewall.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Firewall-Hub-Spoke-Security-Architecture",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "nsg-webserver",
    Title: "Azure NSG IIS Web Server Lab",
    Description: "Configured NSG rules to secure IIS web server traffic and control access.",
    Img: "/projects/nsg.png",
    Link: "https://github.com/AmalUBasnayake/Azure-NSG-IIS-WebServer-Lab",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "keyvault-hardening",
    Title: "Azure Key Vault Hardening",
    Description: "Secured secrets using RBAC, policies and access control in Azure Key Vault.",
    Img: "/projects/keyvault.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Key-Vault-Secrets-Hardening-Lab",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "managed-identity",
    Title: "Key Vault Managed Identity Access",
    Description: "Accessed secrets securely using Managed Identity without exposing credentials.",
    Img: "/projects/identity.png",
    Link: "https://github.com/AmalUBasnayake/azure-key-vault-secret-access-using-managed-identity",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "conditional-access",
    Title: "Azure Conditional Access MFA",
    Description: "Implemented MFA and conditional access policies to protect user identities.",
    Img: "/projects/mfa.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Conditional-Access-MFA-Lab",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "iam-pim",
    Title: "Azure IAM & PIM Lab",
    Description: "Privileged Identity Management for secure role elevation and access governance.",
    Img: "/projects/pim.png",
    Link: "https://github.com/AmalUBasnayake/Azure-IAM-PIM-Lab",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "soc-dashboard",
    Title: "Splunk Real-time SOC Dashboard",
    Description: "Built SOC dashboard for monitoring live network activity and security events.",
    Img: "/projects/splunk.png",
    Link: "https://github.com/AmalUBasnayake/Splunk-Realtime-Network-SOC-Dashboard",
    category: "SOC",
    hasDetails: false
  },
  {
    id: "siem-lab",
    Title: "Live Network SIEM Lab",
    Description: "End-to-end SIEM setup with real attack detection and monitoring pipeline.",
    Img: "/projects/siem.png",
    Link: "https://github.com/AmalUBasnayake/Live-Network-Security-SIEM-Lab",
    category: "SOC",
    hasDetails: false
  },
  {
    id: "traffic-analysis",
    Title: "Splunk Network Traffic Analysis",
    Description: "Analyzed network logs to detect anomalies and suspicious traffic patterns.",
    Img: "/projects/traffic.png",
    Link: "https://github.com/AmalUBasnayake/Splunk-Network-Traffic-Analysis",
    category: "Endpoint",
    hasDetails: false
  },
  {
    id: "sysmon-detection",
    Title: "Sysmon Endpoint Monitoring",
    Description: "Advanced endpoint telemetry using Sysmon for process-level threat detection.",
    Img: "/projects/sysmon.png",
    Link: "https://github.com/AmalUBasnayake/Windows-Endpoint-Security-Monitoring-Sysmon",
    category: "Endpoint",
    hasDetails: false
  },
  {
    id: "registry-detection",
    Title: "Registry Persistence Detection",
    Description: "Detected persistence techniques using Splunk and Windows registry logs.",
    Img: "/projects/registry.png",
    Link: "https://github.com/AmalUBasnayake/Windows-Registry-Persistence-Detection-Splunk",
    category: "Endpoint",
    hasDetails: false
  },
  {
    id: "windows-ad",
    Title: "Windows Server 2022 AD & GPO Lab",
    Description: "Configured Active Directory and enforced security using Group Policy.",
    Img: "/projects/ad.png",
    Link: "https://github.com/AmalUBasnayake/Windows-Server-2022-AD-GPO-Lab",
    category: "Identity",
    hasDetails: false
  },
  {
    id: "network-security-group",
    Title: "Advanced NSG Traffic Filtering",
    Description: "Inbound and outbound traffic control for enterprise-grade network security.",
    Img: "/projects/nsg-advanced.png",
    Link: "https://github.com/AmalUBasnayake/Azure-NSG-Advanced-Traffic-Control",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "defender-cloud",
    Title: "Microsoft Defender for Cloud",
    Description: "Security posture management and threat protection for cloud workloads.",
    Img: "/projects/defender.png",
    Link: "https://github.com/AmalUBasnayake/Microsoft-Defender-for-Cloud-Setup",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "storage-security",
    Title: "Azure Storage Account Hardening",
    Description: "Securing data at rest and in transit using private endpoints and SAS tokens.",
    Img: "/projects/storage.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Storage-Hardening",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "policy-governance",
    Title: "Azure Policy & Governance",
    Description: "Enforcing compliance standards across Azure resources using custom policies.",
    Img: "/projects/policy.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Policy-Compliance-Lab",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "linux-hardening",
    Title: "Linux Server Hardening",
    Description: "Security configurations for Ubuntu/CentOS servers including SSH and IPtables.",
    Img: "/projects/linux.png",
    Link: "https://github.com/AmalUBasnayake/Linux-Security-Hardening",
    category: "Endpoint",
    hasDetails: false
  },
  {
    id: "wireshark-analysis",
    Title: "Network Forensics with Wireshark",
    Description: "Packet analysis to detect malicious payloads and network intrusions.",
    Img: "/projects/wireshark.png",
    Link: "https://github.com/AmalUBasnayake/Network-Forensics-Wireshark",
    category: "Endpoint",
    hasDetails: false
  },
  {
    id: "backup-recovery",
    Title: "Azure Backup & Site Recovery",
    Description: "Implementing business continuity and disaster recovery strategies.",
    Img: "/projects/backup.png",
    Link: "https://github.com/AmalUBasnayake/Azure-Backup-Recovery-Lab",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "api-security",
    Title: "Azure API Management Security",
    Description: "Securing backend APIs using APIM policies, OAuth2, and certificates.",
    Img: "/projects/api.png",
    Link: "https://github.com/AmalUBasnayake/Azure-APIM-Security-Lab",
    category: "Cloud",
    hasDetails: false
  },
  {
    id: "kql-threat-hunting",
    Title: "KQL Threat Hunting Lab",
    Description: "Advanced threat hunting queries for Microsoft Sentinel and Defender.",
    Img: "/projects/kql.png",
    Link: "https://github.com/AmalUBasnayake/KQL-Threat-Hunting-Queries",
    category: "SOC",
    hasDetails: false
  }
];

export default projects;