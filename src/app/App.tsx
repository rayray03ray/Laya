import { useState } from 'react';
import { SplashScreen } from '@/app/components/SplashScreen';
import { OnboardingCarousel } from '@/app/components/OnboardingCarousel';
import { IdentitySetup } from '@/app/components/IdentitySetup';
import { RelationshipContext } from '@/app/components/RelationshipContext';
import { GoalAspiration } from '@/app/components/GoalAspiration';
import { QuizScreen } from '@/app/components/QuizScreen';
import { ProcessingScreen } from '@/app/components/ProcessingScreen';
import { DiagnosisScreen } from '@/app/components/DiagnosisScreen';
import { PaywallScreen } from '@/app/components/PaywallScreen';
import { InviteModal } from '@/app/components/InviteModal';
import { WelcomeHome } from '@/app/components/WelcomeHome';
import { MinimalSetup } from '@/app/components/MinimalSetup';
import { HomeDashboard } from '@/app/components/HomeDashboard';
import { DemoNavigator } from '@/app/components/DemoNavigator';
import { MemoriesScreen_Timeline } from '@/app/components/MemoriesScreen_Timeline';
import { MemoriesScreen_AddForm } from '@/app/components/MemoriesScreen_AddForm';
import { MemoriesScreen_DetailView } from '@/app/components/MemoriesScreen_DetailView';

type Screen = 
  | 'splash'
  | 'onboarding'
  | 'identity'
  | 'relationship'
  | 'goals'
  | 'quiz1'
  | 'quiz2'
  | 'quiz3'
  | 'vulnerability'
  | 'processing'
  | 'diagnosis'
  | 'paywall'
  | 'invite'
  | 'partner-welcome'
  | 'partner-setup'
  | 'home'
  | 'success'
  | 'memories-timeline'
  | 'memories-add-form'
  | 'memories-detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userType, setUserType] = useState<'userA' | 'userB'>('userA');
  const [userName, setUserName] = useState('Priya');
  const [partnerName, setPartnerName] = useState('Arjun');

  const handleAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />;

      case 'onboarding':
        return <OnboardingCarousel onComplete={() => setCurrentScreen('identity')} />;

      case 'identity':
        return (
          <IdentitySetup
            onSelect={(value) => {
              handleAnswer('identity', value);
              setCurrentScreen('relationship');
            }}
          />
        );

      case 'relationship':
        return (
          <RelationshipContext
            onSelect={(value) => {
              handleAnswer('relationship', value);
              setCurrentScreen('goals');
            }}
          />
        );

      case 'goals':
        return (
          <GoalAspiration
            onComplete={(values) => {
              handleAnswer('goals', values);
              setCurrentScreen('quiz1');
            }}
          />
        );

      case 'quiz1':
        return (
          <QuizScreen
            question="How long have you felt out of sync?"
            options={[
              "We are great, just want better",
              "A few weeks",
              "Since a major life event",
              "It feels like forever",
            ]}
            progress={50}
            onSelect={(value) => {
              handleAnswer('quiz1', value);
              setCurrentScreen('quiz2');
            }}
          />
        );

      case 'quiz2':
        return (
          <QuizScreen
            question="What creates the most 'noise'?"
            options={[
              "Communication Gap",
              "Family/In-Laws",
              "Financial Stress",
              "Digital Distraction",
              "Intimacy",
            ]}
            progress={65}
            onSelect={(value) => {
              handleAnswer('quiz2', value);
              setCurrentScreen('quiz3');
            }}
          />
        );

      case 'quiz3':
        return (
          <QuizScreen
            question="Do you know your partner's current biggest stressor?"
            options={[
              "Yes, absolutely",
              "I think so?",
              "No, we haven't talked deeply lately",
            ]}
            progress={80}
            onSelect={(value) => {
              handleAnswer('quiz3', value);
              setCurrentScreen('vulnerability');
            }}
          />
        );

      case 'vulnerability':
        return (
          <QuizScreen
            question="When was the last time you felt truly 'seen' by your partner?"
            options={[
              "Today",
              "A week ago",
              "A month ago",
              "I can't remember",
            ]}
            progress={95}
            darker
            onSelect={(value) => {
              handleAnswer('vulnerability', value);
              setCurrentScreen('processing');
            }}
          />
        );

      case 'processing':
        return <ProcessingScreen onComplete={() => setCurrentScreen('diagnosis')} />;

      case 'diagnosis':
        return <DiagnosisScreen onContinue={() => setCurrentScreen('paywall')} />;

      case 'paywall':
        return (
          <PaywallScreen
            onSubscribe={(plan) => {
              handleAnswer('plan', plan);
              setCurrentScreen('invite');
            }}
          />
        );

      case 'invite':
        return (
          <InviteModal
            onShare={() => {
              // Simulate invite sent
              alert('Invite link copied! For demo, switching to Partner B flow...');
              setUserType('userB');
              setCurrentScreen('partner-welcome');
            }}
            onSkip={() => setCurrentScreen('home')}
          />
        );

      case 'partner-welcome':
        return (
          <WelcomeHome
            partnerName={userType === 'userB' ? partnerName : userName}
            onJoin={() => setCurrentScreen('partner-setup')}
          />
        );

      case 'partner-setup':
        return (
          <MinimalSetup
            onComplete={(data) => {
              if (userType === 'userB') {
                setUserName(data.name);
              }
              setCurrentScreen('home');
            }}
          />
        );

      case 'home':
        return (
          <HomeDashboard
            userName={userType === 'userA' ? userName : userName}
            partnerName={userType === 'userA' ? partnerName : partnerName}
          />
        );

      case 'success':
        return (
          <div 
            className="fixed inset-0 flex flex-col items-center justify-center px-8"
            style={{ background: '#F2E8DA' }}
          >
            <div className="text-center">
              <h1
                className="laya-headline mb-4"
                style={{ 
                  fontSize: '48px',
                  color: '#3D2E28',
                }}
              >
                Welcome to Laya
              </h1>
              <p
                className="laya-body"
                style={{ 
                  fontSize: '20px',
                  color: '#3D2E28',
                  opacity: 0.8,
                }}
              >
                Your transformation begins now.
              </p>
              <div className="mt-12">
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '40px',
                    background: '#4ECDC4',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                    <path
                      d="M3 15L15 27L37 3"
                      stroke="white"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );

      case 'memories-timeline':
        return <MemoriesScreen_Timeline />;

      case 'memories-add-form':
        return <MemoriesScreen_AddForm />;

      case 'memories-detail':
        return <MemoriesScreen_DetailView />;

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Mobile container */}
      <div className="mx-auto max-w-md h-full relative overflow-hidden">
        {renderScreen()}
        
        {/* Demo Navigator */}
        <DemoNavigator 
          currentScreen={currentScreen} 
          onNavigate={(screen) => setCurrentScreen(screen as Screen)} 
        />
      </div>
    </div>
  );
}