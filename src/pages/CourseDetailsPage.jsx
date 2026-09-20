import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiDollarSign, FiAward, FiBookOpen, FiArrowRight, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { MOCK_COURSES } from '../mocks/coursesData';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const found = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];
    setCourse(found);
  }, [id]);

  if (!course) return null;

  return (
    <div className="container-fluid px-3 px-md-5 py-4 space-y-5">
      
      {/* Course Banner Header */}
      <div className="saas-card p-4 p-md-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-950 text-white rounded-3 shadow-lg">
        <div className="row items-center g-4">
          <div className="col-12 col-lg-8 space-y-3">
            <div className="d-flex items-center gap-2">
              <Badge variant="emerald">{course.stream}</Badge>
              <span className="text-xs text-indigo-200 font-semibold">Duration: {course.duration} • Full-Time Degree</span>
            </div>
            <h1 className="display-5 font-black text-white">{course.title}</h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">{course.overview}</p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end">
            <Link to={`${ROUTES.COLLEGES}?stream=${encodeURIComponent(course.stream)}`}>
              <Button variant="secondary" size="lg" rightIcon={<FiArrowRight />}>
                Explore Universities Offering This Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 3 Key Financial & Salary Metrics */}
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="saas-card p-4 d-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold text-xl shrink-0">
              <FiDollarSign />
            </div>
            <div>
              <span className="text-muted text-xs font-bold uppercase tracking-wider block">Average Annual Fee</span>
              <h3 className="fw-black text-dark mb-0">{course.avgFee}</h3>
              <span className="text-indigo-600 text-[11px] font-bold">Government & Private Range</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="saas-card p-4 d-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-bold text-xl shrink-0">
              <FiTrendingUp />
            </div>
            <div>
              <span className="text-muted text-xs font-bold uppercase tracking-wider block">Avg Starting Salary</span>
              <h3 className="fw-black text-dark mb-0">{course.avgStartingSalary}</h3>
              <span className="text-emerald-600 text-[11px] font-bold">Entry Level Offer</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="saas-card p-4 d-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 d-flex items-center justify-center font-bold text-xl shrink-0">
              <FiAward />
            </div>
            <div>
              <span className="text-muted text-xs font-bold uppercase tracking-wider block">Highest Package Offer</span>
              <h3 className="fw-black text-dark mb-0">{course.highestSalary}</h3>
              <span className="text-purple-600 text-[11px] font-bold">Tier 1 Institutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Overview Grid */}
      <div className="row g-4">
        
        <div className="col-12 col-lg-8 space-y-4">
          <Card className="p-4 p-md-5 space-y-4">
            <div>
              <h3 className="h5 font-bold text-dark mb-2">Eligibility Criteria & Entrance Exams</h3>
              <p className="text-secondary text-sm leading-relaxed">{course.eligibility}</p>
            </div>

            <div className="border-top pt-4">
              <h3 className="h5 font-bold text-dark mb-3">Key Specializations</h3>
              <div className="d-flex flex-wrap gap-2">
                {course.specializations?.map((spec, i) => (
                  <Badge key={i} variant="indigo" className="py-2 px-3 text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-top pt-4">
              <h3 className="h5 font-bold text-dark mb-3">Top Career Roles & Designations</h3>
              <div className="d-flex flex-wrap gap-2">
                {course.careerRoles?.map((role, i) => (
                  <Badge key={i} variant="emerald" className="py-2 px-3 text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-4 space-y-4">
          <Card className="p-4 space-y-4">
            <h4 className="font-bold text-dark text-base border-bottom pb-2">Quick Course Summary</h4>
            <div className="space-y-3 text-xs text-secondary">
              <p className="d-flex items-center gap-2 mb-0">
                <FiCheckCircle className="text-emerald-500 shrink-0" />
                <span>Degree Level: Undergraduate / Postgraduate</span>
              </p>
              <p className="d-flex items-center gap-2 mb-0">
                <FiCheckCircle className="text-emerald-500 shrink-0" />
                <span>Mode: Full-Time / On-Campus</span>
              </p>
              <p className="d-flex items-center gap-2 mb-0">
                <FiCheckCircle className="text-emerald-500 shrink-0" />
                <span>UGC / AICTE Recognized Degrees</span>
              </p>
            </div>

            <Link to={`${ROUTES.COLLEGES}?stream=${encodeURIComponent(course.stream)}`} className="d-block pt-2">
              <Button variant="primary" className="w-100">
                Find Colleges Offering This Course
              </Button>
            </Link>
          </Card>
        </div>

      </div>

    </div>
  );
};
