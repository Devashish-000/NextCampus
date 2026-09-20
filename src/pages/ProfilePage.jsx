import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { profileService } from '../services/profileService';
import { profileSchema } from '../validators/profileSchemas';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/forms/Input';
import { Textarea } from '../components/forms/Textarea';
import { STREAMS, STATES } from '../constants/collegeData';
import { useAuth } from '../context/AuthContext';
import { Select } from '../components/forms/Select';
import axiosInstance from '../services/axiosInstance';

export const ProfilePage = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student' || !user?.role;
  const isAdmin = user?.role === 'admin';
  const isInstitute = user?.role === 'institute';
  
  const [loading, setLoading] = useState(true);
  const [collegeData, setCollegeData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (isInstitute && user?.collegeId) {
      axiosInstance.get('/colleges').then((res) => {
        const myCollege = res.data.find(c => c._id === user.collegeId);
        if (myCollege) {
          setCollegeData(myCollege);
        }
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
      return;
    }

    if (!isStudent && !user?.collegeId) {
       setLoading(false);
       return;
    }

    profileService.getProfile().then((data) => {
      setValue('fullName', data.fullName || user?.fullName || '');
      setValue('email', data.email || user?.email || '');
      
      setValue('phone', data.phone || '9876543210');
      setValue('city', data.city || 'Bengaluru');
      setValue('state', data.state || 'Karnataka');
      setValue('targetExam', data.targetExam || 'JEE Advanced');
      setValue('entranceScore', data.entranceScore || 98.4);
      setValue('budgetMax', data.budgetMax || 1200000);
      setValue('preferredStreams', data.preferredStreams || ['Engineering']);
      setValue('bio', data.bio || 'Aspiring engineer.');
      setLoading(false);
    });
  }, [setValue, user, isStudent, isInstitute]);

  const onSubmit = async (data) => {
    try {
      await profileService.updateProfile(data);
      toast.success('Profile preferences updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  if (loading) return null;

  if (isAdmin) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            System Administrator Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your master account details and system-wide privileges.
          </p>
        </div>

        <Card className="p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="d-flex items-center gap-4 border-b border-gray-100 pb-5">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white d-flex items-center justify-center font-black h2 mb-0 shadow-lg relative z-10">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-2xl text-dark mb-1">{user?.fullName || 'System Admin'}</h3>
              <span className="badge bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-pill uppercase tracking-widest text-[10px]">Super Admin</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email Address</p>
              <p className="font-semibold text-dark">{user?.email || 'admin@nextcampus.com'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Access Level</p>
              <p className="font-semibold text-emerald-600 d-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Full Root Access
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Last Login IP</p>
              <p className="font-semibold text-dark">192.168.1.1 (Secure)</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">2FA Status</p>
              <p className="font-semibold text-emerald-600">Enabled</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isInstitute) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            College Profile Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Details for your registered institute. To update these, contact the admin.
          </p>
        </div>

        <Card className="p-8">
          {!collegeData ? (
            <div className="text-center py-5 text-gray-500 font-semibold">
              No college details found or linked yet. Please contact admin.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="d-flex items-center gap-4 border-b border-gray-100 pb-5">
                <img src={collegeData.logoUrl || "https://via.placeholder.com/100"} alt="Logo" className="w-20 h-20 rounded-xl object-cover shadow-sm border border-gray-200" />
                <div>
                  <h3 className="font-black text-2xl text-dark mb-1">{collegeData.name}</h3>
                  <span className="badge bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-pill">{collegeData.stream}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">NIRF Rank</p>
                  <p className="font-bold text-lg text-dark">#{collegeData.nirfRank || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Total Fees</p>
                  <p className="font-bold text-lg text-dark">₹{collegeData.totalFees?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Average Package</p>
                  <p className="font-bold text-lg text-dark">₹{collegeData.avgPackage || collegeData.averageSalary} LPA</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Highest Package</p>
                  <p className="font-bold text-lg text-emerald-600">₹{collegeData.highestPackage || collegeData.highestSalary} LPA</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Rating</p>
                  <p className="font-bold text-lg text-amber-500">⭐ {collegeData.rating} / 5</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Student Profile & Preferences</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Keep your entrance exam scores and budget updated for accurate AI recommendations.
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
            <Input label="Email Address" {...register('email')} error={errors.email?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} />
            <Input label="City" {...register('city')} error={errors.city?.message} />
            <Select label="State" options={STATES} {...register('state')} error={errors.state?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 dark:border-slate-800 pt-6">
            <Select label="Target Exam" options={['JEE Advanced', 'JEE Main', 'CAT', 'NEET-UG', 'BITSAT', 'CUET']} {...register('targetExam')} error={errors.targetExam?.message} />
            <Input label="Percentile / Score" type="number" step="0.1" {...register('entranceScore')} error={errors.entranceScore?.message} />
            <Input label="Max Tuition Budget (₹)" type="number" {...register('budgetMax')} error={errors.budgetMax?.message} />
          </div>

          <Textarea label="Academic Bio / Goals" {...register('bio')} error={errors.bio?.message} />

          <div className="flex justify-end pt-4">
            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

