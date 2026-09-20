export const MOCK_COURSES = [
  {
    id: 'crs-1',
    title: 'B.Tech Computer Science & Engineering (CSE)',
    shortCode: 'B.Tech CSE',
    stream: 'Engineering',
    duration: '4 Years',
    avgFee: '₹8.5 Lakhs - ₹15 Lakhs',
    avgStartingSalary: '₹14.5 LPA',
    highestSalary: '₹1.2 Cr PA',
    topCollegesCount: 450,
    eligibility: '10+2 with Physics, Chemistry & Mathematics (Min 75%) + JEE Main / Advanced',
    overview: 'Flagship undergraduate program focusing on Data Structures, Algorithms, Artificial Intelligence, System Design, Cloud Computing, and Cybersecurity.',
    specializations: ['Artificial Intelligence & Machine Learning', 'Data Science', 'Cyber Security', 'Cloud Computing'],
    careerRoles: ['Software Development Engineer', 'AI Research Specialist', 'Full Stack Developer', 'Cloud Architect'],
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple']
  },
  {
    id: 'crs-2',
    title: 'Master of Business Administration (MBA - Core)',
    shortCode: 'MBA',
    stream: 'Management (MBA)',
    duration: '2 Years',
    avgFee: '₹12 Lakhs - ₹25 Lakhs',
    avgStartingSalary: '₹22.0 LPA',
    highestSalary: '₹1.15 Cr PA',
    topCollegesCount: 380,
    eligibility: 'Graduation in any discipline (Min 50%) + CAT / XAT / GMAT score',
    overview: 'Comprehensive post-graduate management program covering Finance, Marketing, Strategy, Operations, and Leadership.',
    specializations: ['Finance & Investment Banking', 'Marketing & Brand Strategy', 'Business Analytics', 'Consulting'],
    careerRoles: ['Management Consultant', 'Investment Banker', 'Product Manager', 'Brand Manager'],
    topRecruiters: ['McKinsey', 'BCG', 'Bain & Co', 'Goldman Sachs', 'HUL']
  },
  {
    id: 'crs-3',
    title: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    shortCode: 'MBBS',
    stream: 'Medical',
    duration: '5.5 Years (Inc. Internship)',
    avgFee: '₹50,000 - ₹65 Lakhs',
    avgStartingSalary: '₹10.0 LPA',
    highestSalary: '₹35 LPA',
    topCollegesCount: 120,
    eligibility: '10+2 with Physics, Chemistry & Biology (Min 50%) + NEET-UG',
    overview: 'Core professional medical degree qualifying graduates to practice as licensed doctors and surgeons.',
    specializations: ['General Medicine', 'Pediatrics', 'Orthopedics', 'Cardiology (Post PG)'],
    careerRoles: ['Resident Doctor', 'Surgeon', 'Clinical Researcher', 'Medical Officer'],
    topRecruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare']
  },
  {
    id: 'crs-4',
    title: 'B.Tech Data Science & Artificial Intelligence',
    shortCode: 'B.Tech AI & DS',
    stream: 'Engineering',
    duration: '4 Years',
    avgFee: '₹9.0 Lakhs - ₹16 Lakhs',
    avgStartingSalary: '₹16.0 LPA',
    highestSalary: '₹85 LPA',
    topCollegesCount: 220,
    eligibility: '10+2 PCM with minimum 75% + Entrance Exam',
    overview: 'Modern high-demand engineering discipline combining Deep Learning, Neural Networks, Statistical Modeling, and Big Data Engineering.',
    specializations: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
    careerRoles: ['Data Scientist', 'ML Engineer', 'Data Engineer', 'NLP Specialist'],
    topRecruiters: ['NVIDIA', 'OpenAI Partners', 'Fractal Analytics', 'Databricks']
  },
  {
    id: 'crs-5',
    title: 'Bachelor of Design (B.Des - Industrial & UI/UX)',
    shortCode: 'B.Des',
    stream: 'Design & Architecture',
    duration: '4 Years',
    avgFee: '₹10 Lakhs - ₹18 Lakhs',
    avgStartingSalary: '₹11.5 LPA',
    highestSalary: '₹42 LPA',
    topCollegesCount: 85,
    eligibility: '10+2 Any Stream + NID DAT / UCEED entrance score',
    overview: 'Focused program on user experience design, product aesthetics, design thinking, motion graphics, and ergonomics.',
    specializations: ['User Experience (UX/UI)', 'Product Design', 'Visual Communication'],
    careerRoles: ['Product Designer', 'UX Researcher', 'Brand Visualizer', 'Design Lead'],
    topRecruiters: ['Google Design', 'Swiggy', 'Zomato', 'Microsoft UX', 'Samsung Design']
  }
];

// Generate 15 additional courses to complete 20
const extraCourseNames = [
  'B.Tech Electronics & Communication (ECE)',
  'B.Tech Mechanical Engineering',
  'B.Tech Electrical Engineering',
  'B.Tech Biotechnology',
  'B.Arch (Bachelor of Architecture)',
  'B.A. LL.B (Honours - Integrated 5 Yrs)',
  'B.Com (Honours in Finance & Accounting)',
  'B.Sc Computer Science & Data Analytics',
  'BBA in Digital Marketing & E-Commerce',
  'M.Tech Robotics & Autonomous Systems',
  'M.Sc Physics & Astronomy',
  'B.Des Fashion & Textile Design',
  'Master of Financial Engineering (MFE)',
  'LL.M Corporate & Commercial Law',
  'BBA in Financial Technology (FinTech)'
];

extraCourseNames.forEach((name, idx) => {
  const stream = idx % 2 === 0 ? 'Engineering' : idx % 3 === 0 ? 'Management (MBA)' : 'Science';
  MOCK_COURSES.push({
    id: `crs-${idx + 6}`,
    title: name,
    shortCode: name.split(' ')[0] + ' ' + (name.split(' ')[1] || ''),
    stream: stream,
    duration: stream.includes('MBA') || stream.includes('M.Tech') ? '2 Years' : '4 Years',
    avgFee: `₹${4 + idx} Lakhs - ₹${10 + idx} Lakhs`,
    avgStartingSalary: `₹${8 + (idx % 6)} LPA`,
    highestSalary: `₹${25 + idx * 2} LPA`,
    topCollegesCount: 150 + idx * 10,
    eligibility: '10+2 with relevant subjects + National Entrance Score',
    overview: `Specialized course in ${name} providing industry-aligned training, research projects, and corporate internship options.`,
    specializations: ['Core Specialization', 'Applied Analytics', 'Research Electives'],
    careerRoles: ['Domain Specialist', 'Project Analyst', 'Consultant'],
    topRecruiters: ['TCS', 'Infosys', 'Deloitte', 'Accenture']
  });
});
