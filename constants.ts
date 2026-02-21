
import { ContentType, ContentItem, InterviewExperience, RoadmapStep, RoadmapData } from './types';

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    type: ContentType.BLOG,
    title: 'Zero Trust Architecture in 2024',
    description: 'An in-depth look at why perimeter-based security is failing and how Zero Trust provides a solution.',
    author: 'Prof. Sarah Jenkins',
    date: 'Oct 24, 2024',
    tags: ['Network Security', 'Zero Trust', 'Enterprise'],
    imageUrl: 'https://picsum.photos/800/450?random=1'
  },
  {
    id: '2',
    type: ContentType.CTF,
    title: 'De-mystifying Buffer Overflows',
    description: 'A complete walkthrough of the "Stack Master" challenge from HTB.',
    author: 'Rahul Sharma (Batch 2022)',
    date: 'Nov 2, 2024',
    tags: ['Binary Exploitation', 'CTF', 'Pwn'],
    imageUrl: 'https://picsum.photos/800/450?random=2'
  },
  {
    id: '3',
    type: ContentType.PROJECT,
    title: 'IoT Honeypot Framework',
    description: 'Final Year Project involving the creation of a distributed honeypot for Mirai-style botnets.',
    author: 'Cyber Team Alpha',
    date: 'Sept 15, 2024',
    tags: ['IoT', 'Threat Intelligence', 'FYP'],
    imageUrl: 'https://picsum.photos/800/450?random=3'
  },
  {
    id: '4',
    type: ContentType.EXPERIMENT,
    title: 'Hardware Hacking: Extracting Firmware',
    description: 'How to use a Bus Pirate to extract firmware from an old router via SPI.',
    author: 'Electronics Club',
    date: 'Dec 1, 2024',
    tags: ['Hardware', 'Firmware', 'SPI'],
    imageUrl: 'https://picsum.photos/800/450?random=4'
  },
  {
    id: '5',
    type: ContentType.CERTIFICATION,
    title: 'OSCP vs PNPT: Which one to choose?',
    description: 'A direct comparison of the most popular offensive security certifications for students.',
    author: 'Anita Desai',
    date: 'Aug 20, 2024',
    tags: ['Certifications', 'Offensive Security', 'Career'],
    imageUrl: 'https://picsum.photos/800/450?random=5'
  }
];

export const MOCK_INTERVIEWS: InterviewExperience[] = [
  {
    id: 'i1',
    studentName: 'Vikram Singh',
    batch: '2023',
    company: 'Palo Alto Networks',
    role: 'Security Engineer intern',
    difficulty: 'Hard',
    rounds: ['Online Assessment', 'Technical Round 1 (Networking)', 'Technical Round 2 (System Design)', 'HR'],
    tips: ['Focus heavily on TCP/IP stack', 'Be prepared for live coding security scripts']
  },
  {
    id: 'i2',
    studentName: 'Priya Mehta',
    batch: '2024',
    company: 'CrowdStrike',
    role: 'Threat Hunter',
    difficulty: 'Medium',
    rounds: ['Resume Screening', 'Behavioral Round', 'Technical (SIEM & Logs)', 'Final Case Study'],
    tips: ['Learn to read raw logs', 'Understand EDR architectures']
  }
];


export const ROADMAPS: Record<string, RoadmapData> = {
  SOC_ANALYST: {
    id: 'SOC_ANALYST',
    title: 'SOC Analyst',
    subtitle: 'Master defensive operations, threat monitoring, and incident response.',
    steps: [
      {
        title: 'Foundations',
        description: 'Build a solid base with networking and security fundamentals. Understand how protocols work and how to defend them.',
        resources: ['Professor Messer', 'TryHackMe Pre-Security'],
        duration: '4–6 weeks'
      },
      {
        title: 'Tool Mastery',
        description: 'Get hands-on with industry-standard SIEM and network analysis tools used in real SOC environments.',
        resources: ['Splunk Training', 'Wireshark Labs', 'ELK Stack Docs'],
        duration: '6–8 weeks'
      },
      {
        title: 'Blue Teaming',
        description: 'Dive into incident response playbooks, threat hunting techniques, and log analysis workflows.',
        resources: ['LetsDefend', 'Blue Team Level 1'],
        duration: '6–8 weeks'
      },
      {
        title: 'Threat Intelligence',
        description: 'Learn to consume and produce cyber threat intelligence, understand adversary TTPs using MITRE ATT&CK.',
        resources: ['MITRE ATT&CK', 'OpenCTI Docs', 'SANS CTI Summit'],
        duration: '4–6 weeks'
      },
      {
        title: 'Certifications & Practice',
        description: 'Earn industry-recognised certifications and practice in real-world lab environments.',
        resources: ['CompTIA Security+', 'CEH', 'BTL1 Exam'],
        duration: '8–12 weeks'
      }
    ]
  },
  PENETRATION_TESTER: {
    id: 'PENETRATION_TESTER',
    title: 'Penetration Tester',
    subtitle: 'Learn ethical hacking to legally break into systems and help organisations secure themselves.',
    steps: [
      {
        title: 'Networking & OS Fundamentals',
        description: 'Understand TCP/IP, subnetting, DNS, HTTP, and how Linux/Windows systems work at a low level.',
        resources: ['Professor Messer N+', 'OverTheWire Bandit', 'Linux Journey'],
        duration: '4–6 weeks'
      },
      {
        title: 'Scripting & Automation',
        description: 'Learn Python and Bash scripting to automate reconnaissance, exploitation, and post-exploitation tasks.',
        resources: ['Automate The Boring Stuff', 'HackTheBox Academy Python', 'Black Hat Python (Book)'],
        duration: '4–6 weeks'
      },
      {
        title: 'Web Application Hacking',
        description: 'Master OWASP Top 10, SQL Injection, XSS, authentication bypasses, and web API security testing.',
        resources: ['PortSwigger Web Academy', 'OWASP Testing Guide', 'DVWA'],
        duration: '8–10 weeks'
      },
      {
        title: 'Network & Infrastructure Pentesting',
        description: 'Perform enumeration, exploitation, and privilege escalation on network services and Active Directory.',
        resources: ['TryHackMe Offensive Path', 'HackTheBox Pro Labs', 'TCM Security Courses'],
        duration: '8–12 weeks'
      },
      {
        title: 'Reporting & Certifications',
        description: 'Learn to write professional penetration test reports and earn globally recognised certifications.',
        resources: ['PNPT (TCM Security)', 'OSCP (Offensive Security)', 'eJPT (eLearnSecurity)'],
        duration: '8–16 weeks'
      }
    ]
  },
  GRC_SPECIALIST: {
    id: 'GRC_SPECIALIST',
    title: 'GRC Specialist',
    subtitle: 'Navigate governance, risk, and compliance to keep organisations secure and legally sound.',
    steps: [
      {
        title: 'Security Fundamentals',
        description: 'Understand core security concepts, CIA triad, risk management principles, and the role of GRC in business.',
        resources: ['CompTIA Security+', 'ISACA GRC Resources', 'NIST Glossary'],
        duration: '4–6 weeks'
      },
      {
        title: 'Frameworks & Standards',
        description: 'Study major compliance frameworks including ISO 27001, NIST CSF, SOC 2, GDPR, and PCI-DSS.',
        resources: ['NIST CSF Official Docs', 'ISO 27001 Guide', 'GDPR.eu'],
        duration: '6–8 weeks'
      },
      {
        title: 'Risk Assessment & Management',
        description: 'Learn to perform qualitative and quantitative risk assessments, build risk registers, and create risk treatment plans.',
        resources: ['FAIR Institute', 'ISACA Risk IT', 'NIST SP 800-30'],
        duration: '6–8 weeks'
      },
      {
        title: 'Audit & Compliance',
        description: 'Conduct internal audits, prepare for external audits, manage evidence collections and control testing.',
        resources: ['IIA Audit Standards', 'Vanta GRC Platform', 'AWS Compliance Center'],
        duration: '6–8 weeks'
      },
      {
        title: 'Certifications & Career',
        description: 'Obtain certifications that validate your GRC expertise and open doors to analyst and management roles.',
        resources: ['CISA (ISACA)', 'CRISC (ISACA)', 'CISM (ISACA)', 'CompTIA CySA+'],
        duration: '8–12 weeks'
      }
    ]
  },
  CLOUD_SECURITY: {
    id: 'CLOUD_SECURITY',
    title: 'Cloud Security',
    subtitle: 'Secure cloud environments across AWS, Azure, and GCP for modern enterprise workloads.',
    steps: [
      {
        title: 'Cloud Fundamentals',
        description: 'Understand the shared responsibility model, IaaS/PaaS/SaaS concepts, and core services of major cloud providers.',
        resources: ['AWS Cloud Practitioner', 'Azure Fundamentals AZ-900', 'Google Cloud Essentials'],
        duration: '4–6 weeks'
      },
      {
        title: 'Identity & Access Management',
        description: 'Master IAM policies, roles, RBAC/ABAC, zero-trust identity, and multi-cloud identity federation.',
        resources: ['AWS IAM Docs', 'Azure AD Fundamentals', 'Entra ID Learning Path'],
        duration: '4–6 weeks'
      },
      {
        title: 'Cloud Network Security',
        description: 'Configure VPCs, security groups, NACLs, WAF rules, and private networking across cloud environments.',
        resources: ['AWS VPC Workshop', 'Azure Network Security Docs', 'Cloud Security Alliance'],
        duration: '6–8 weeks'
      },
      {
        title: 'Threat Detection & Response',
        description: 'Use native cloud security services for threat detection, logging, alerting, and automated remediation.',
        resources: ['AWS GuardDuty', 'Microsoft Defender for Cloud', 'Google Security Command Center'],
        duration: '6–8 weeks'
      },
      {
        title: 'Certifications & Specialisation',
        description: 'Earn cloud security certifications to validate your skills and specialise in your chosen cloud platform.',
        resources: ['AWS Security Specialty', 'AZ-500 Azure Security', 'CCSP (ISC2)', 'Google Professional Cloud Security'],
        duration: '8–12 weeks'
      }
    ]
  }
};
