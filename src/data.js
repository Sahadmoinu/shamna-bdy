export const YEAR = new Date().getFullYear()

export const profile = {
  name: 'Shamna K',
  firstName: 'Shamna',
  roles: ['Project Coordinator', 'Business Analyst', 'Agile Practitioner', 'MERN Developer'],
  company: 'BPract Software Solutions',
  location: 'Kerala, India',
  email: 'shamnadoanas@gmail.com',
  phone: '+91 8589886210',
  phoneHref: 'tel:+918589886210',
  linkedin: 'https://linkedin.com/in/shamnak46',
  linkedinLabel: 'linkedin.com/in/shamnak46',
  github: 'https://github.com/kshamna',
  githubLabel: 'github.com/kshamna',
  photo: '/shamna.jpg',
  summary:
    'IT Project Coordinator and Business Analyst, GATE 2025 qualified, managing end-to-end software projects across MLM, Facility Management and AI Agent solutions. I translate business requirements into clear SRS and PRDs, well-scoped Jira tasks, and releases that ship on time.',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: 100, suffix: '+', label: 'Students mentored in Python' },
  { value: 15, suffix: '+', label: 'Members coordinated at IEEE SB' },
  { value: 5, suffix: '', label: 'Projects coordinated end to end' },
  { value: 4, suffix: '', label: 'Languages spoken' },
]

export const marquee = [
  'Requirement Gathering', 'Business Analysis', 'Agile / Scrum', 'SRS & PRD', 'Jira', 'UAT & Release',
  'Stakeholder Management', 'MERN Stack', 'Python', 'RESTful APIs', 'MySQL', 'Binary & Unilevel MLM',
  'Risk Handling', 'Lead Generation', 'Data Analysis',
]

export const skillGroups = [
  {
    key: 'pm',
    title: 'Project Management & Business Analysis',
    blurb: 'From the first requirement call to the production release.',
    icon: 'ClipboardList',
    items: ['Project Planning', 'Agile Methodology', 'Task Tracking', 'Workflow Management', 'SRS / PRD Documentation', 'Jira', 'UAT & Release Management', 'Risk Handling', 'Requirement Gathering', 'Business Analysis'],
    span: 'lg:col-span-2',
  },
  {
    key: 'tech',
    title: 'Technical Foundation',
    blurb: 'Enough engineering depth to speak the team’s language.',
    icon: 'Code2',
    items: ['MERN Stack', 'Python', 'R', 'JavaScript', 'SQL', 'RESTful APIs', 'Git', 'MySQL', 'Database Management', 'Data Analysis', 'API Integration'],
    span: 'lg:row-span-2',
  },
  {
    key: 'domain',
    title: 'Domain & Coordination',
    blurb: 'Deep MLM business logic and clients across continents.',
    icon: 'Network',
    items: ['Binary & Unilevel MLM', 'International Client Management', 'Stakeholder Communication', 'Cross-functional Collaboration', 'Team Leadership', 'Client Meetings & Follow-ups'],
    span: '',
  },
  {
    key: 'sales',
    title: 'Sales & Business Development',
    blurb: 'From first cold call to confirmed sign-up.',
    icon: 'Handshake',
    items: ['Lead Generation', 'Cold Calling', 'Lead Qualification', 'Client Outreach', 'Sales Follow-ups', 'Customer Engagement', 'Conversion Support', 'Relationship Management'],
    span: '',
  },
  {
    key: 'soft',
    title: 'Analytical & Soft Skills',
    blurb: 'Clear thinking, clear communication, and ownership of the outcome.',
    icon: 'BrainCircuit',
    items: [
      'Problem-Solving', 'Analytical Thinking', 'Critical Thinking', 'Verbal & Written Communication', 'Active Listening',
      'Interpersonal Skills', 'Adaptability', 'Team Collaboration', 'Leadership', 'Time Management', 'Prioritisation',
      'Organisation', 'Attention to Detail', 'Decision-Making', 'Conflict Resolution', 'Initiative', 'Accountability',
      'Ownership', 'Presentation Skills', 'Mentoring', 'Customer Support', 'Process Optimization',
    ],
    span: 'md:col-span-2 lg:col-span-3',
  },
]

export const experience = [
  {
    company: 'BPract Software Solutions LLP',
    role: 'Project Coordinator',
    sub: 'Software Development & Business Analysis',
    period: 'May 2026 – Present',
    current: true,
    points: [
      'Manage multiple software projects at once across MLM, Facility Management and AI Agent solutions, owning the lifecycle from requirements to production deployment.',
      'Independently handle international client communication, meetings, requirement discussions and stakeholder management.',
      'Gather and analyse business requirements; write SRS, PRDs, technical documentation and actionable Jira tasks.',
      'Lead cross-functional frontend, backend and QA teams: task allocation, timelines, dependencies and deliverables.',
      'Work extensively with Binary and Unilevel MLM logic: genealogy, rank qualifications, commissions, referral rewards and payouts.',
      'Coordinate development, testing, UAT, defect resolution and production releases.',
      'Manage client escalations, resolve project blockers and keep delivery within agreed timelines.',
    ],
    tags: ['Jira', 'Agile', 'SRS / PRD', 'UAT', 'MLM'],
  },
  {
    company: 'Talrop',
    role: 'EmpowerHer Intern',
    sub: 'Online',
    period: 'Sept 2024 – Sept 2025',
    points: [
      'Received structured training in technology, entrepreneurship and leadership, building both technical and managerial skills.',
      'Collaborated on innovation-focused projects promoting women’s empowerment and leadership in technology.',
    ],
    tags: ['Leadership', 'Entrepreneurship'],
  },
  {
    company: 'Pygrammers Python Community',
    role: 'Project Management Intern',
    sub: 'Hybrid',
    period: 'July 2021 – May 2025',
    points: [
      'Planned, organised and coordinated multiple Python bootcamps and technical events across colleges in Kerala.',
      'Mentored 100+ students in Python fundamentals and project development.',
      'Ran student outreach through cold calling: explaining programs, answering queries and converting leads into confirmed registrations.',
      'Supported sales and promotion through follow-ups that communicated program benefits and drove bootcamp enrolments.',
      'Assisted with project planning, scheduling, resource coordination, team communication and execution tracking.',
      'Worked with internal teams and college representatives on logistics, participant onboarding and program execution.',
      'Coordinated team meetups and community-building initiatives for Python enthusiasts.',
    ],
    tags: ['Python', 'Mentoring', 'Lead Generation', 'Events', 'Planning'],
  },
]

export const projects = [
  {
    title: 'Shaddai World',
    type: 'MLM Web Application · Binary Plan',
    role: 'Project Coordinator',
    org: 'BPract Software Solutions',
    region: 'Client in Peru',
    visual: 'binary',
    accent: '#9a7150',
    summary:
      'Primary communication link between the Peruvian client and the technical teams, taking a binary-plan MLM platform from scope to delivery.',
    points: [
      'Ran client discussions to clarify scope and turned requirements into prioritised Jira tasks.',
      'Facilitated Agile/Scrum ceremonies and tracked sprint progress across dev and QA.',
      'Tracked milestones, flagged delivery risks early and chased blockers to keep timelines.',
      'Coordinated functional testing, UAT feedback and defect resolution.',
    ],
    tags: ['Agile / Scrum', 'Jira', 'UAT', 'Binary MLM'],
  },
  {
    title: 'Dollarwise',
    type: 'MLM Web Application · Unilevel Plan',
    role: 'Project Coordinator',
    org: 'BPract Software Solutions',
    region: 'Client in South Africa',
    visual: 'unilevel',
    accent: '#b0784f',
    summary:
      'End-to-end execution of a unilevel MLM platform, with client meetings handled independently with South African stakeholders.',
    points: [
      'Gathered and clarified requirements, translating them into actionable Jira tasks.',
      'Managed sprint progress, priorities and timelines across frontend, backend and QA.',
      'Monitored deliverables and drove timely resolution of blockers.',
      'Assisted manual testing: validating features, logging defects and coordinating UAT.',
    ],
    tags: ['Scrum', 'Stakeholders', 'Manual QA', 'Unilevel MLM'],
  },
  {
    title: 'ChaseMates',
    type: 'Sports Technology · Racing Management',
    role: 'Project Coordinator',
    org: 'BPract Software Solutions',
    region: 'Sports-tech platform',
    visual: 'race',
    accent: '#a2674a',
    summary:
      'End-to-end coordination of a sports technology platform that connects racing enthusiasts and makes racing events easy to run.',
    points: [
      'Gathered requirements, wrote PRDs and feature specs, and turned business needs into development tasks.',
      'Ran sprint planning, task allocation, progress tracking and issue resolution in Jira.',
      'Coordinated frontend, backend and QA to hit milestones, plus requirement clarification, testing and bug tracking.',
      'Tracked key features: user discovery, race scheduling and booking, map integration and live race results.',
    ],
    tags: ['PRD', 'Jira', 'Sprint Planning', 'Maps', 'Live Results'],
  },
  {
    title: 'Drug Abuse Detection using AI',
    type: 'AI Screening Tool',
    role: 'Developer & Project Coordinator',
    org: 'Academic Project',
    region: 'Python · JavaScript',
    visual: 'ai',
    accent: '#7d7a5a',
    summary:
      'An AI-assisted screening solution, designed to make the screening process faster and easier to use.',
    points: [
      'Coordinated execution by integrating external APIs and structuring system workflows.',
      'Contributed to a user-friendly design that improved screening efficiency.',
      'Kept the team aligned through development and implementation.',
    ],
    tags: ['Python', 'JavaScript', 'APIs', 'AI'],
  },
  {
    title: 'EstateEase',
    type: 'Real Estate Platform',
    role: 'Developer & Project Coordinator',
    org: 'Personal Project',
    region: 'MERN Stack',
    visual: 'estate',
    accent: '#8a6f62',
    summary:
      'A full-stack real estate platform built and managed end to end on the MERN stack.',
    points: [
      'Managed development end to end, coordinating tasks and tracking progress.',
      'Organised workflows for API integration, database management and deployment.',
      'Ensured reliability through structured testing, issue tracking and iteration.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
]

export const process = [
  { step: '01', title: 'Discover', text: 'Client calls and requirement workshops to understand the real business problem.', icon: 'Search' },
  { step: '02', title: 'Define', text: 'SRS, PRDs and technical docs that leave no room for guesswork.', icon: 'FileText' },
  { step: '03', title: 'Plan', text: 'Prioritised Jira backlogs, sprint plans, dependencies and risk mapping.', icon: 'Workflow' },
  { step: '04', title: 'Deliver', text: 'Daily coordination across frontend, backend and QA; blockers cleared fast.', icon: 'Users' },
  { step: '05', title: 'Release', text: 'UAT, defect resolution and a calm, on-time production release.', icon: 'Rocket' },
]

export const leadership = [
  {
    org: 'IEEE Student Branch, CEV',
    role: 'Secretary',
    period: 'Sep 2025 – May 2026',
    points: [
      'Ran day-to-day operations, coordinating 15+ members with structured documentation.',
      'Streamlined workflows through organised communication and task tracking.',
      'Led end-to-end execution of a 24-hour hackathon: teams, participants and logistics.',
    ],
    metric: { value: '24h', label: 'Hackathon led end to end' },
  },
  {
    org: 'IEEE Women in Engineering AG, SB CEV',
    role: 'Vice Chairperson',
    period: 'Jun 2024 – Aug 2025',
    points: [
      'Directed project initiatives by managing volunteers, timelines and execution.',
      'Coordinated stakeholder communication and kept teams aligned.',
      'Represented the organisation globally, handling outreach and engagement.',
    ],
    metric: { value: 'R10', label: 'Featured at WIE DEI 2024 global webinar' },
  },
]

export const achievements = [
  { title: 'GATE 2025 Qualified', text: 'Graduate Aptitude Test in Engineering, CS/IT.', icon: 'Trophy' },
  { title: 'R10 WIE DEI 2024', text: 'Featured at the IEEE Region 10 global webinar.', icon: 'Mic' },
  { title: '100+ Students Mentored', text: 'Python fundamentals and project development.', icon: 'GraduationCap' },
  { title: 'Aaravam 2K26 · First Prize', text: 'Group Leader for the Onam celebration at Government Cyberpark, Calicut.', icon: 'Medal' },
]

export const education = {
  degree: 'B.Tech in Information Technology',
  school: 'College of Engineering Vadakara',
  period: '2022 – 2026',
  cgpa: '7.50',
}

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Malayalam', level: 'Native' },
  { name: 'Hindi', level: 'Speak' },
  { name: 'Tamil', level: 'Speak' },
]

export const hobbies = ['Reading', 'Writing', 'Video Editing', 'Video Presentations', 'Emceeing', 'Volunteering']
