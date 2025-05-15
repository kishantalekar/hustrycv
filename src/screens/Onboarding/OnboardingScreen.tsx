import {posthog} from '@/analytics/posthog/PostHog';
import {LottieAnimation} from '@/components';
import {Typography, TypographyVariant} from '@/components/Typography';
import {RootScreens} from '@/navigation/constants';
import {useAppStore} from '@/store/useAppStore';
import {replace} from '@/utils/navigation';
import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {styles} from './OnboardingScreen.styles';
import {OnboardingData} from './OnboardingScreen.types';

const {width} = Dimensions.get('window');

const onboardingSlides: OnboardingData[] = [
  {
    id: '1',
    animation: require('@/assets/animations/fox_walking.json'), // Replace with actual animation
    title: 'Welcome to Hustry AI Resume Builder!',
    subtitle:
      'Craft your professional resume effortlessly with AI-powered precision and stand out to employers.',
  },
  {
    id: '2',
    animation: require('@/assets/animations/ai_foriday.json'), // Replace with actual animation
    title: 'Intelligent AI Assistance by Hustry AI',
    subtitle:
      'Let Hustry AI guide you in creating impactful content and optimizing your resume for success.',
  },
  {
    id: '3',
    animation: require('@/assets/animations/giraffe_ meditating.json'), // Replace with actual animation
    title: 'Showcase Your Best Self with Hustry AI',
    subtitle:
      'Highlight your skills and experiences effectively to land your dream job with our smart resume builder.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progressValue = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0); // Keep this for button logic if needed or remove if progressValue is enough
  const setOnboardingCompleted = useAppStore(
    state => state.setOnboardingCompleted,
  );

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      posthog.capture('onboarding_next_slide', {
        current_slide: currentIndex + 1,
        slide_title: onboardingSlides[currentIndex].title,
        action: 'next',
      });
      carouselRef.current?.next();
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    posthog.capture('onboarding_skipped', {
      skipped_from_slide: currentIndex + 1,
      remaining_slides: onboardingSlides.length - currentIndex - 1,
    });
    completeOnboarding();
  };

  const completeOnboarding = () => {
    posthog.capture('onboarding_completed', {
      total_slides_viewed: currentIndex + 1,
      completion_type:
        currentIndex === onboardingSlides.length - 1 ? 'full' : 'skipped',
    });
    setOnboardingCompleted(true);
    replace(RootScreens.NAME_INPUT); // Navigate to Name Input Screen
  };

  const renderItem = ({item}: {item: OnboardingData}) => (
    <View style={[styles.slide, {width}]}>
      <View style={styles.animationContainer}>
        <LottieAnimation source={item.animation} autoPlay loop />
      </View>
      <Typography
        variant={TypographyVariant.TitleLarge}
        style={styles.title}
        align="center">
        {item.title}
      </Typography>
      <Typography
        variant={TypographyVariant.BodyMedium}
        style={styles.subtitle}
        align="center">
        {item.subtitle}
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          height={Dimensions.get('window').height * 0.6} // Adjust height as needed
          autoPlay={false}
          data={onboardingSlides}
          scrollAnimationDuration={500}
          onProgressChange={(_, absoluteProgress) => {
            progressValue.value = absoluteProgress;
            // Determine current index based on progress
            // This logic might need adjustment based on how progressValue behaves with snapping
            const newIndex = Math.round(absoluteProgress);
            if (newIndex !== currentIndex) {
              posthog.capture('onboarding_slide_viewed', {
                slide_number: newIndex + 1,
                slide_title: onboardingSlides[newIndex].title,
                navigation_type: 'carousel',
              });
              setCurrentIndex(newIndex);
            }
          }}
          renderItem={renderItem}
        />

        <View style={styles.paginationContainer}>
          <Pagination.Basic
            progress={progressValue}
            data={onboardingSlides}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot} // Assuming you have styles for activeDot
            containerStyle={styles.paginationDotsContainer} // Optional: for styling the container of dots
            onPress={index =>
              carouselRef.current?.scrollTo({
                count: index - progressValue.value,
                animated: true,
              })
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          {currentIndex < onboardingSlides.length - 1 && (
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={handleSkip}>
              <Typography
                variant={TypographyVariant.LabelLarge}
                style={styles.skipButtonText}>
                Skip
              </Typography>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Typography
              variant={TypographyVariant.LabelLarge}
              style={styles.buttonText}>
              {currentIndex === onboardingSlides.length - 1
                ? 'Get Started'
                : 'Next'}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
