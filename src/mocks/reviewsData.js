import { ALL_MOCK_COLLEGES } from './collegesData';

const reviewerNames = [
  'Aarav Sharma', 'Ananya Iyer', 'Rohan Verma', 'Priya Patel', 'Aditya Singh',
  'Meera Nair', 'Kabir Kulkarni', 'Siddharth Rao', 'Tanvi Gupta', 'Vikram Mehta',
  'Ishita Banerjee', 'Devansh Joshi', 'Kavya Reddy', 'Yash Deshmukh', 'Sneha Kapoor',
  'Neel Agarwal', 'Riya Chawla', 'Varun Malhotra', 'Pooja Bose', 'Harsh Vardhan'
];

const studentAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export const MOCK_REVIEWS = Array.from({ length: 100 }, (_, i) => {
  const college = ALL_MOCK_COLLEGES[i % ALL_MOCK_COLLEGES.length];
  const name = reviewerNames[i % reviewerNames.length];
  const avatar = studentAvatars[i % studentAvatars.length];
  const rating = +(4.2 + ((i * 13) % 9) / 10).toFixed(1);

  return {
    id: `rev-${i + 1}`,
    collegeId: college.id,
    collegeName: college.name,
    author: `${name}`,
    studentName: `${name}`,
    avatar: avatar,
    course: college.degrees[0] || 'B.Tech CSE',
    courseName: college.degrees[0] || 'B.Tech CSE',
    batchYear: 2021 + (i % 4),
    rating: Math.min(5, rating),
    overallRating: Math.min(5, rating),
    placementsRating: 4.8,
    infrastructureRating: 4.5,
    facultyRating: 4.7,
    campusLifeRating: 4.6,
    isVerifiedStudent: true,
    date: `2025-0${(i % 9) + 1}-15`,
    title: i % 2 === 0 ? 'Outstanding Placements & Peer Learning Environment' : 'Rigorous Academics with Top Class Faculty',
    content: 'The campus culture fosters incredible peer learning, competitive coding hackathons, and high-impact industry research projects.',
    pros: '1. Phenomenal peer group and coding culture. 2. Top tier placement offers from companies like Amazon, Google, Microsoft. 3. Excellent research funding.',
    cons: '1. Academic workload can be intense during midterm exams. 2. Mess food quality varies occasionally. 3. Competitive environment.',
    helpfulCount: 12 + (i * 3) % 30,
  };
});
