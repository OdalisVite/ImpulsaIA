import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import ProfileSection, { type ProfileData } from '@/components/sections/ProfileSection';
import ComparadorSection from '@/components/sections/ComparadorSection';
import CVSection from '@/components/sections/CVSection';
import InterviewSection from '@/components/sections/InterviewSection';
import PlanSection from '@/components/sections/PlanSection';
import OpportunitiesSection from '@/components/sections/OpportunitiesSection';
import AssistantSection from '@/components/sections/AssistantSection';
import FAQSection from '@/components/sections/FAQSection';

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function App() {
  const [profile, setProfile] = useState<ProfileData>({
    stage: 'estudiante',
    education: '',
    experience: '',
    skills: '',
    projects: '',
    goals: '',
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero onNavigate={scrollTo} />
          <ProfileSection profile={profile} setProfile={setProfile} />
          <ComparadorSection profile={profile} />
          <CVSection profile={profile} />
          <InterviewSection />
          <PlanSection />
          <OpportunitiesSection />
          <AssistantSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
