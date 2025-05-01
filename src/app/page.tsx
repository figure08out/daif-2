"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Add useScrollAnimation hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { ref, isVisible };
};

// Add CountUp component at the top of the file
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Update the CountUp component to include entry animation
const CountUp: React.FC<CountUpProps> = ({ end, duration = 2, suffix = "", ...props }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('count-up');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    let frame: number;
    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    if (isVisible) animate();
    return () => cancelAnimationFrame(frame);
  }, [end, duration, isVisible]);

  return (
    <span 
      id="count-up"
      className={`transform transition-all duration-1000 ease-out-back ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
      {...props}
    >
      {count}{suffix}
    </span>
  );
};

// Client component for slideshow functionality
function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg"
  ];

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[750px] w-full overflow-hidden">
      {/* Background images */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={src}
            alt={`SinX at Dubai AI Festival ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-indigo-900/15 to-black/75"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07),transparent_75%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/15 via-transparent to-blue-900/15"></div>
        </div>
      ))}
      {/* Full hero blur overlay */}
      <div className="absolute inset-0 z-10 backdrop-blur-[0px] pointer-events-none"></div>
      {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
            <div className="relative">
              {/* Simplified card without blur */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-600/20 to-blue-500/20 rounded-3xl opacity-30 animate-gradient-x"></div>
              <div className="p-10 rounded-3xl bg-black/5 border border-white/10 max-w-3xl relative overflow-hidden shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/5 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(91,33,182,0.03),transparent_70%)]"></div>

                {/* Animated particles */}
                <div className="absolute w-2 h-2 rounded-full bg-blue-400/40 top-10 left-10 animate-pulse-slow"></div>
                <div className="absolute w-3 h-3 rounded-full bg-purple-400/40 bottom-20 right-14 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-2 h-2 rounded-full bg-indigo-400/40 top-32 right-28 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute w-2 h-2 rounded-full bg-blue-400/40 bottom-14 left-24 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

                <div className="relative">
                  <div className="flex justify-center mb-6">
                    {/* Logo without gradient background */}
                    <div className="rounded-lg">
                      <Image
                        src="/sinxlogo.png"
                        alt="SinX Logo"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </div>
                  </div>

              <h1 className="text-5xl md:text-8xl font-extrabold text-blue-400 mb-8 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                    SinX Solutions
                  </h1>
                  <div className="space-y-8">
                    <p className="text-xl md:text-4xl text-white font-light tracking-wider drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
                      at <span className="font-semibold text-blue-300">Dubai AI Festival</span>
                    </p>
                    <div className="flex flex-col items-center space-y-6">
                      <p className="text-2xl md:text-3xl font-medium text-blue-200">
                        April 23-24, 2025
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                        {/* <p className="text-base md:text-xl text-white/90 font-light backdrop-blur-md bg-black/5 py-3 px-8 rounded-full inline-block shadow-lg">
                          A Celebration of AI Innovation
                        </p> */}
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <Link
                      href="https://sinxsolutions.ai/contact"
                      className="inline-flex items-center px-8 py-3 rounded-full relative overflow-hidden group border border-purple-500 hover:border-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
                      <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 to-purple-700"></span>
                      <span className="relative text-white font-medium flex items-center">
                        Contact Us
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
                {/* Slideshow Indicators */}
                <div className="absolute bottom-8 left-0 right-0 z-10">
                  <div className="flex justify-center gap-3">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all shadow-md ${index === currentSlide
                          ? "bg-white scale-125 shadow-lg shadow-white/40"
                          : "bg-white/70 hover:bg-white hover:scale-110"
                          }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

// Wrap slideshow in a client component
const DynamicSlideshow = dynamic(() => Promise.resolve(ImageSlideshow), {
  ssr: false,
  loading: () => (
    <div className="relative h-[500px] w-full overflow-hidden bg-[#151525] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 z-10"></div>
      <p className="text-white z-20">Loading images...</p>
    </div>
  )
});

// TypingText component for typing animation
interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Update the TypingText component to be more reliable
function TypingText({ text, speed = 50, delay = 0, ...props }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayed(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, speed);
      }
    };

    timeoutId = setTimeout(typeNextChar, delay);

    return () => clearTimeout(timeoutId);
  }, [text, speed, delay, isVisible]);

  return (
    <span
      ref={elementRef}
      className={`inline-block transform transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      {...props}
    >
      {displayed}
    </span>
  );
}

// Add SectionHeading component definition
const SectionHeading = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`transform transition-all duration-1000 ease-out-back ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Add AnimatedBackground component with Tailwind classes
const AnimatedBackground = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Elements */}
      <div 
        className={`absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full transition-all duration-1000 ease-out-back animate-float-slow
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      />
      <div 
        className={`absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full transition-all duration-1000 ease-out-back animate-float-slower
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      />
      <div 
        className={`absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-500/10 rounded-full transition-all duration-1000 ease-out-back animate-float
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      />

      {/* Pulsing Elements */}
      <div 
        className={`absolute top-1/2 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full transition-all duration-1000 ease-out-back animate-pulse-slow
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      />
      <div 
        className={`absolute bottom-1/3 right-1/2 w-24 h-24 bg-purple-400/10 rounded-full transition-all duration-1000 ease-out-back animate-pulse-slower
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      />

      {/* Rotating Gradient */}
      <div 
        className={`absolute top-1/4 right-1/4 w-[800px] h-[800px] transition-all duration-1000 ease-out-back animate-spin-slow
          ${isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-75 translate-y-20'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Move these to the top of the Home component
  const products = [
    {
      name: "Intelligence OS",
      icon: "🧠",
      logo: "/sinxlogo.png",
      description: "Our flagship enterprise AI platform that powers intelligent business operations.",
      features: [
        { title: "Bundlr", desc: "Smart bundles to increase AOV" },
        { title: "Personalizr", desc: "AI-driven personalization engine" },
        { title: "Reportr", desc: "Advanced analytics and reporting" },
        { title: "Recommendr", desc: "Smart recommendation system" },
      ],
      video: "SinX.mp4"
    },
    {
      name: "My Career Growth",
      logo: "/mycareergrowth.png",
      description: "Smart career development platform for professionals.",
      features: [
        { title: "ATS Resume Builder", desc: "Create resumes that pass automated screening" },
        { title: "Portfolio Website Maker", desc: "One click to launch your personal site" },
        { title: "1:1 Mock Interview", desc: "Practice with AI for real interview scenarios" },
        { title: "Smart Job Search", desc: "Find jobs tailored to your skills and goals" },
      ],
      video: "MCG.mp4"
    },
    {
      name: "Knowtice",
      icon: "🔔",
      logo: "/knowtice.png",
      description: "Curated newsletters for those who like to stay ahead.",
      features: [
        { title: "Smart Content Suggestions", desc: "Get AI-powered topic ideas based on your audience's interests." },
        { title: "Intelligent Filtering", desc: "Automatically filter out noise and focus on quality content for you." },
        { title: "Audience Segmentation", desc: "Deliver targeted content to specific audience segments for better engagement." },
      ],
      video: "Knowtice.mp4"
    }
  ];
  // ... inside Home component, at the top ...image.png
  const [selected, setSelected] = useState(0);
  const product = products[selected];

  // Add refs and isVisible states for scroll animations
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: productsRef, isVisible: productsVisible } = useScrollAnimation();
  const { ref: icymiRef, isVisible: icymiVisible } = useScrollAnimation();
  const { ref: globalReachRef, isVisible: globalReachVisible } = useScrollAnimation();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const { ref: socialRef, isVisible: socialVisible } = useScrollAnimation();
  const { ref: whatsNextRef, isVisible: whatsNextVisible } = useScrollAnimation();
  const { ref: feedbackRef, isVisible: feedbackVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1d] text-white overflow-x-hidden">
      {/* Navbar - with glassmorphism effect */}
      <nav className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 bg-[#0f0f1d]/90 border-b border-indigo-900/30">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <Image
              src="/sinxlogo.png"
              alt="SinX Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="ml-2 text-xl font-bold text-blue-400">
              SinX Solutions
            </span>
          </Link>
        </div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="#products" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Products
          </Link>
          <Link href="#icymi" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            ICYMI
          </Link>
          <Link href="#global-reach" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Global Reach
          </Link>
          <Link href="#social-proof" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Social Proof
          </Link>
          <Link href="#connections" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Connections
          </Link>
          <Link href="#social-media" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Social Media
          </Link>
          <Link href="#whatsnext" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            What&apos;s Next
          </Link>
          <Link href="#feedback" className="text-white hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
            Feedback
          </Link>
        </div>
        <div className="md:hidden">
          <button
            className="p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Simple dropdown mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#13131f] border-b border-indigo-900/30 mt-0 py-4 px-8 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="#products"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#icymi"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ICYMI
              </Link>
              <Link
                href="#global-reach"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Global Reach
              </Link>
              <Link
                href="#social-proof"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Social Proof
              </Link>
              <Link
                href="#connections"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Connections
              </Link>
              <Link
                href="#social-media"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Social Media
              </Link>
              <Link
                href="#whatsnext"
                className="text-white py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                What&apos;s Next
              </Link>
              <Link
                href="#feedback"
                className="text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Feedback
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero/Slideshow Section */}
      <DynamicSlideshow />

      {/* Number Stats Section */}
      <section ref={statsRef} id="number-stats" className={`py-16 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AnimatedBackground isVisible={statsVisible} />
        <div className="absolute inset-0 bg-[#0f0f1d] opacity-90"></div>
        {/* Decorative elements */}
        <div className="absolute left-1/4 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center justify-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">
                <CountUp end={2300} duration={2} suffix="+" />
              </h3>
              <SectionHeading>
                <p className="text-gray-400 font-light">booth visitors</p>
              </SectionHeading>
          </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">
                <CountUp end={185} duration={2} />
              </h3>
              <SectionHeading>
                <p className="text-gray-400 font-light">live demos</p>
              </SectionHeading>
                    </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <h3 className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">
                <CountUp end={85} duration={2} suffix="%" />
              </h3>
              <SectionHeading>
                <p className="text-gray-400 font-light">demo-to-lead rate</p>
              </SectionHeading>
                  </div>
                  </div>
                </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} id="products" className={`py-20 px-4 relative overflow-visible bg-[#0f0f1d] transition-all duration-1000 transform ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AnimatedBackground isVisible={productsVisible} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block mx-auto mb-16 px-8 py-4 bg-transparent rounded-xl">
            <SectionHeading>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-shimmer mb-2">
                Real Solutions, Real Impact
              </h2>
            </SectionHeading>
            <SectionHeading>
              <p className="text-gray-300 mt-2">From e-commerce to careers, discover how SinX is solving real-world challenges</p>
            </SectionHeading>
                  </div>
          {/* Product Data and State */}
          {(() => {
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left: Product Menu */}
                <div className="space-y-4">
                  {products.map((p, idx) => (
                    <button
                      key={p.name}
                      onClick={() => setSelected(idx)}
                      className={`flex items-center gap-4 p-4 rounded-lg w-full text-left transition border border-transparent transform-gpu ${selected === idx ? "bg-[#18182a] border-blue-500 shadow-lg scale-105" : "hover:bg-[#18182a] hover:scale-105 hover:shadow-xl"}`}
                    >
                      <Image
                        src={p.logo}
                        alt={p.name + ' logo'}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain rounded"
                      />
                      <div>
                        <div className="text-white font-bold text-lg">{p.name}</div>
                        <div className="text-blue-400 text-sm">{p.description}</div>
                </div>
                    </button>
                  ))}
              </div>
                {/* Center: Product Details */}
                <div className="flex flex-col gap-4 items-start">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-blue-400">{product.name}</h3>
                    <Image
                      src={product.logo}
                      alt={product.name + ' logo'}
                      width={32}
                      height={32}
                      className="h-8 w-auto ml-auto"
                    />
            </div>
                  <p className="text-blue-300 mb-2">{product.description}</p>
                  <div>
                    <div className="font-bold text-white mb-2">Key Features</div>
                    <ul className="text-white space-y-2 pl-4 list-disc">
                      {product.features.map((f) => (
                        <li key={f.title}><span className="font-semibold text-blue-300">{f.title}:</span> {f.desc}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={product.name === "My Career Growth" ? "https://www.mycareergrowth.ai" : product.name === "Knowtice" ? "https://www.knowtice.ai" : "https://www.sinxsolutions.ai"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                  >Learn More &rarr;</a>
                    </div>
                {/* Right: Product Video */}
                <div className="rounded-xl overflow-hidden shadow-lg border border-blue-900/30 bg-black/40 w-full">
                  {product.video ? (
                    <div className="relative aspect-video">
                      <video
                        key={product.video}
                        width="100%"
                        height="100%"
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                      >
                        <source src={`/${product.video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-black/20">
                      <p className="text-white/50">No video available</p>
                    </div>
                  )}
                </div>
                </div>
            );
          })()}
              </div>
      </section>

      {/* ICYMI Section */}
      <section ref={icymiRef} id="icymi" className={`py-20 px-4 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${icymiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[#0f0f1d] opacity-90"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-[1024px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <SectionHeading>
              <div className="inline-block mx-auto mb-6 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-purple-500/30">
                <h2 className="text-lg font-medium text-white">ICYMI</h2>
              </div>
            </SectionHeading>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-30"></div>
            <article className="relative backdrop-blur-xl bg-[#151525]/80 p-8 md:p-10 rounded-2xl border border-purple-500/30 shadow-xl overflow-hidden max-w-[1024px] mx-auto">
              {/* Team Image */}
              <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
                <Image
                  src="/team.jpg"
                  alt="SinX Solutions Team at Dubai AI Festival"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                PRESS RELEASE
              </div>
              <div className="mt-10 md:mt-12">
                <p className="text-gray-400 text-sm mb-3">April 2025</p>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8">SinX Solutions Launches My Career Growth</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mb-8 rounded-full"></div>

                <p className="text-white leading-relaxed mb-6 text-lg">
                  At the Dubai AI Festival, SinX Solutions proudly unveiled <span className="text-purple-400 font-semibold">My Career Growth</span> (MCG)&mdash;an AI-powered platform designed to transform how professionals navigate their careers. MCG empowers users with personalized, AI-driven tools for resume building, career roadmaps, skill gap analysis, and mock interviews.
                </p>

                <p className="text-white leading-relaxed mb-10 text-lg">
                  The launch drew crowds and sparked conversations about the future of work, with attendees experiencing firsthand how MCG makes career development smarter, faster, and more accessible for everyone.
                </p>

                <div className="flex justify-center mt-10">
            <Link
                    href="/icymi"
                    className="inline-flex items-center px-8 py-3 rounded-full relative overflow-hidden group"
            >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600"></span>
                    <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-700 to-blue-700"></span>
              <span className="relative text-white font-medium flex items-center">
                      Read More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
                  </div>
                </div>
            </article>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section ref={globalReachRef} id="global-reach" className={`py-20 px-4 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${globalReachVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AnimatedBackground isVisible={globalReachVisible} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-left mb-8">
            <SectionHeading>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-shimmer mb-2">
                A Global AI Movement
              </h2>
            </SectionHeading>
            <SectionHeading>
              <p className="text-gray-400">Every conversation, every demo — bridging continents with intelligence</p>
            </SectionHeading>
          </div>
          <div className="rounded-2xl border border-blue-900/40 bg-[#10111a] p-4 md:p-8 shadow-lg relative overflow-hidden" style={{ minHeight: 340 }}>
            {/* Animated Dots on a Plain Dark Background */}
            <div className="w-full h-96 relative" style={{ minHeight: 340 }}>
              {[
                // Asia (15)
                { name: 'India', x: 0.68, y: 0.45 },
                { name: 'Pakistan', x: 0.65, y: 0.48 },
                { name: 'Bangladesh', x: 0.7, y: 0.5 },
                { name: 'Philippines', x: 0.88, y: 0.65 },
                { name: 'Nepal', x: 0.66, y: 0.42 },
                { name: 'Sri Lanka', x: 0.68, y: 0.58 },
                { name: 'China', x: 0.82, y: 0.35 },
                { name: 'Indonesia', x: 0.9, y: 0.8 },
                { name: 'Malaysia', x: 0.87, y: 0.75 },
                { name: 'Thailand', x: 0.84, y: 0.6 },
                { name: 'Iran', x: 0.6, y: 0.38 },
                { name: 'Afghanistan', x: 0.62, y: 0.36 },
                { name: 'Jordan', x: 0.57, y: 0.38 },
                { name: 'Lebanon', x: 0.56, y: 0.36 },
                { name: 'Turkey', x: 0.54, y: 0.32 },
                // Europe/Scandinavia (10)
                { name: 'UK', x: 0.35, y: 0.22 },
                { name: 'Germany', x: 0.4, y: 0.3 },
                { name: 'France', x: 0.38, y: 0.34 },
                { name: 'Italy', x: 0.42, y: 0.38 },
                { name: 'Netherlands', x: 0.37, y: 0.28 },
                { name: 'Sweden', x: 0.44, y: 0.16 },
                { name: 'Norway', x: 0.47, y: 0.12 },
                { name: 'Denmark', x: 0.46, y: 0.22 },
                { name: 'Finland', x: 0.5, y: 0.14 },
                { name: 'Spain', x: 0.36, y: 0.42 },
                // Africa (10)
                { name: 'Egypt', x: 0.57, y: 0.62 },
                { name: 'Nigeria', x: 0.48, y: 0.8 },
                { name: 'Sudan', x: 0.56, y: 0.75 },
                { name: 'Ethiopia', x: 0.6, y: 0.8 },
                { name: 'Kenya', x: 0.68, y: 0.85 },
                { name: 'Ghana', x: 0.44, y: 0.85 },
                { name: 'South Africa', x: 0.52, y: 0.98 },
                { name: 'Morocco', x: 0.32, y: 0.65 },
                { name: 'Algeria', x: 0.37, y: 0.6 },
                { name: 'Uganda', x: 0.7, y: 0.9 },
                // North America (1)
                { name: 'USA', x: 0.08, y: 0.28 },
              ].map((dot, idx) => (
                <div
                  key={dot.name + idx}
                  className="absolute"
                  style={{ left: `calc(${dot.x * 85}% - 6px)`, top: `calc(${dot.y * 100}% - 6px)` }}
                >
                  <div className="group relative">
                    <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_6px_rgba(59,130,246,0.5)] animate-float-dot" style={{ animationDelay: `${(idx % 8) * 0.3}s` }}></div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#10111a] text-blue-200 text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-blue-800">
                      {dot.name}
                      </div>
                    </div>
                      </div>
              ))}
              <div className="absolute left-6 bottom-6 text-white text-base z-10">
                <span className="text-blue-400 font-semibold">36 countries</span><br />
                represented at our DAIF booth
                    </div>
                      </div>
                    </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} id="social-proof" className={`py-20 px-4 relative bg-[#0f0f1d] transition-all duration-1000 transform ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <SectionHeading>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-shimmer mb-4">
                Voices from the Frontlines of Innovation
              </h2>
            </SectionHeading>
            <SectionHeading>
              <p className="text-gray-400 max-w-2xl mx-auto">Hear how SinX is changing the game for global leaders and pioneers</p>
            </SectionHeading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="connection-card bg-[#151525] rounded-xl border border-indigo-900/40 p-8 flex flex-col shadow-lg">
              <div className="text-blue-400 text-3xl mb-4">&ldquo;</div>
              <div className="text-white text-lg font-medium mb-6">
                <TypingText 
                  text="SinX was one of five companies we were recommended to meet — they stood out for all the right reasons." 
                  speed={30} 
                  delay={300} 
                />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Founder, Delta Wealth Partners</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="connection-card bg-[#151525] rounded-xl border border-indigo-900/40 p-8 flex flex-col shadow-lg">
              <div className="text-blue-400 text-3xl mb-4">&ldquo;</div>
              <div className="text-white text-lg font-medium mb-6">
                <TypingText 
                  text=Coming from an account management role in the UK, I was so happy to find a tool like MCG — it’s perfect for someone new to the UAE and exploring new career paths." 
                  speed={30} 
                  delay={600} 
                />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Former Account Manager</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="connection-card bg-[#151525] rounded-xl border border-indigo-900/40 p-8 flex flex-col shadow-lg">
              <div className="text-blue-400 text-3xl mb-4">&ldquo;</div>
              <div className="text-white text-lg font-medium mb-6">
                <TypingText 
                  text="Stopping by the SinX booth felt less like a pitch and more like a meaningful exchange — they understood what we were looking for before we even said it." 
                  speed={30} 
                  delay={900} 
                />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Head of E-commerce, Majid Al Futtaim Retail</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnersRef} id="connections" className={`py-20 px-4 relative bg-[#0f0f1d] transition-all duration-1000 transform ${partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <SectionHeading>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-shimmer mb-4">
                Partnerships Forged, Futures Built
              </h2>
            </SectionHeading>
            <SectionHeading>
              <p className="text-gray-400 max-w-2xl mx-auto">Meet the organizations shaping tomorrow with us, one connection at a time</p>
            </SectionHeading>
                      </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { name: "Delta Wealth Partners", logo: "/delta.png" },
              { name: "Majid Al Futtaim Retail", logo: "/maf.png" },
              { name: "THE RWS GROUP", logo: "/rws.png" },
              { name: "Perceptiviti", logo: "/perceptiviti.png" },
              { name: "Emarat Maritime", logo: "/emarat maritime.png" },
              { name: "Data Inn Technologies", logo: "/data inn.png" },
              { name: "TENDERSEAL", logo: "/tenderseal.png" },
              { name: "FutureEd", logo: "/future ed.png" },
              { name: "Furhat Robotics", logo: "/furhat.png" },
              { name: "Symbiosis", logo: "/symbiosis.png" },
              { name: "Techstack Authority", logo: "/techstack authority.png" },
              { name: "Neotrust", logo: "/neotrust.png" }
            ].map((company, idx) => (
              <div
                key={idx}
                className="connection-card bg-[#18182a] rounded-xl shadow-lg flex flex-col items-center p-4 md:p-6 border border-indigo-900/30 opacity-0 translate-y-6 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-20 h-20 md:w-28 md-28 flex items-center justify-center mb-3 md:mb-4">
                  <Image
                    src={company.logo}
                    alt={company.name + ' logo'}
                    width={64}
                    height={96}
                    className="max-h-16 md:max-h-24 max-w-full object-contain"
                  />
                    </div>
                <div className="text-center text-white text-xs md:text-sm font-medium truncate w-full">{company.name}</div>
                      </div>
            ))}
                    </div>
                  </div>
      </section>

      {/* Social Media Section */}
      <section ref={socialRef} id="social-media" className={`py-20 px-4 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${socialVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-[#0f0f1d] opacity-100"></div>
        <div className="max-w-[1024px] mx-auto relative z-10">
          <div className="text-center mb-12">
            <SectionHeading>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-300% animate-shimmer mb-4">
                Social Media Highlights
              </h2>
            </SectionHeading>
            <SectionHeading>
              <p className="text-gray-300 max-w-2xl mx-auto">See what we shared and what the world saw at DAIF</p>
            </SectionHeading>
                    </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* LinkedIn Card */}
            <div className="rounded-2xl bg-[#23234a] border border-blue-900/40 shadow-lg p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/sinxlogo.png" alt="SinX Solutions" width={40} height={40} className="rounded" />
                <div>
                  <div className="font-bold text-white text-lg">SinX Solutions</div>
                  <div className="text-xs text-blue-200">3d · Edited</div>
                    </div>
                <div className="ml-auto">
                  <span className="bg-[#0a66c2] text-white rounded-full px-2 py-1 text-xs font-bold">in</span>
                      </div>
                    </div>
              <div className="text-white mb-4 text-base leading-relaxed">
                Proud moments from an unforgettable event with SinX Solutions. Our dedication, innovation, and teamwork were on full display — a true testament to the spirit that drives us. Because when the vision is strong and the execution is bold... Legends Never Die. This is SinX. Thank You @dubaiaifestival
                  </div>
              <div className="text-blue-300 text-xs mb-4">
                #SinXSolutions #mycareergrowth #knowtice #dubaiaifestival
                    </div>
              {/* Embedded LinkedIn video (iframe) */}
              <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-black flex items-center justify-center">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7321672133510668288?compact=1" height="399" width="504" frameBorder="0" allowFullScreen title="Embedded post" className="w-full h-64"></iframe>
              </div>
              <div className="mt-auto">
                <a href="https://www.linkedin.com/company/sinxsolutions/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a66c2] text-white font-semibold text-sm hover:bg-[#0956a2] transition w-full justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  Follow on LinkedIn
                    </a>
                  </div>
                </div>
            {/* Twitter Card */}
            <div className="rounded-2xl bg-[#18182a] border border-blue-900/40 shadow-lg p-8 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/sinxlogo.png" alt="SinX Solutions" width={40} height={40} className="rounded" />
                <div>
                  <div className="font-bold text-white text-lg">SinX Solutions</div>
                  <div className="text-xs text-blue-200">@SinX_Solutions</div>
              </div>
                <div className="ml-auto">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </div>
          </div>
              <div className="text-white mb-4 text-base leading-relaxed">
                The buzz around SinX Solutions, Knowtice AI, and MyCareerGrowth was unreal at <span className="text-blue-300">#DubaiAIFestival</span>. Non-stop demos, and more!!<br />This is just a glimpse of what we&apos;re building. 🚀
        </div>
              <div className="text-blue-300 text-xs mb-4">
                #SinXSolutions #KnowticeAI #MyCareerGrowth
            </div>
              <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-black flex items-center justify-center">
                <Image src="/twitter.jpg" alt="SinX Solutions Twitter Post" width={600} height={800} className="w-full" style={{height: '32rem', objectFit: 'cover'}} />
              </div>
              <div className="mt-auto">
                <a href="https://x.com/sinx_solutions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1da1f2] text-white font-semibold text-sm hover:bg-[#0c8cd6] transition w-full justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Follow on Twitter
                </a>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section ref={whatsNextRef} id="whatsnext" className={`py-24 px-4 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${whatsNextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AnimatedBackground isVisible={whatsNextVisible} />
        <div className="absolute inset-0 bg-[#0f0f1d] opacity-90"></div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-[1024px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a35]/80 to-[#151525]/80 backdrop-blur-sm h-full">
                <Image
                  src="/linkedinn.jpeg"
                  alt="Future of SinX Solutions"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover max-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-xl text-white font-medium">Dubai AI Campus</h4>
                  <p className="text-white/80 text-sm">Our new innovation hub</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold text-blue-400 mb-6">What&apos;s Next for SinX</h2>

              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8 rounded-full"></div>

              <p className="text-white/90 leading-relaxed mb-5 text-lg">
                Next up, SinX Solutions is making bold strides with <span className="text-blue-400 font-medium">Invisibl AI</span> and <span className="text-purple-400 font-medium">Intelligence OS</span>. We&apos;re also excited to announce our move to the Dubai AI Campus&mdash;a new hub for innovation and collaboration.
              </p>

              <p className="text-white/90 leading-relaxed mb-8 text-lg">
                We&apos;re committed to making intelligence accessible, seamless, and truly human-first&mdash;empowering businesses and individuals to harness the full potential of AI with ease. Stay tuned for new launches and innovations that will redefine how you experience and interact with artificial intelligence.
              </p>

              <div className="mt-auto flex flex-wrap gap-4">
                <Link
                  href="https://sinxsolutions.ai"
                  className="inline-flex items-center px-8 py-3 rounded-full relative overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
                  <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 to-purple-700"></span>
                  <span className="relative text-white font-medium flex items-center justify-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="https://sinxsolutions.ai/contact"
                  className="inline-flex items-center px-8 py-3 rounded-full relative overflow-hidden group border border-purple-500 hover:border-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative text-white font-medium flex items-center">
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section ref={feedbackRef} id="feedback" className={`py-20 px-4 relative overflow-hidden bg-[#0f0f1d] transition-all duration-1000 transform ${feedbackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 bg-[#0f0f1d] opacity-95"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-[1024px] mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-400 mb-4">Share Your Feedback</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                We value your input and are continuously working to improve our products. Let us know what you think!
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-2xl blur-sm opacity-40"></div>
              <div className="backdrop-blur-sm bg-[#151525]/70 rounded-2xl border border-indigo-500/20 p-8 md:p-10 shadow-2xl">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();

                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const product = formData.get('product') as string;
                  const email = formData.get('email') as string;
                  const message = formData.get('message') as string;

                  // Form validation
                  if (!product || !email || !message) {
                    alert('Please fill out all fields');
                    return;
                  }

                  // Email validation
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                  }

                  // Set loading state
                  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  const originalButtonText = submitButton.innerHTML;
                  submitButton.disabled = true;
                  submitButton.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...</span>';

                  try {
                    const response = await fetch('/api/submit-feedback', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        product,
                        email,
                        message,
                      }),
                    });

                    if (response.ok) {
                      // Show success message in button
                      submitButton.innerHTML = '<span class="flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Feedback Submitted!</span>';
                      submitButton.classList.add('bg-green-600');

                      // Reset form
                      form.reset();

                      // Reset button after 3 seconds
                      setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        submitButton.classList.remove('bg-green-600');
                      }, 3000);
                    } else {
                      const data = await response.json();
                      submitButton.innerHTML = `<span class="flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>Error: ${data.error || 'Failed to submit'}</span>`;
                      submitButton.classList.add('bg-red-600');

                      // Reset button after 3 seconds
                      setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        submitButton.classList.remove('bg-red-600');
                      }, 3000);
                    }
                  } catch (error) {
                    console.error('Error submitting feedback:', error);
                    submitButton.innerHTML = '<span class="flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>Network Error</span>';
                    submitButton.classList.add('bg-red-600');

                    // Reset button after 3 seconds
                    setTimeout(() => {
                      submitButton.disabled = false;
                      submitButton.innerHTML = originalButtonText;
                      submitButton.classList.remove('bg-red-600');
                    }, 3000);
                  }
                }}>
                  <div>
                    <label htmlFor="product" className="block text-white font-medium mb-2">
                      Which product is this feedback for?
                    </label>
                    <div className="relative">
                      <select
                        id="product"
                        name="product"
                        className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition-colors appearance-none pr-10"
                        defaultValue="bundlr"
                      >
                        <option value="bundlr">Bundlr</option>
                        <option value="sinxsolutions">SinX Solutions</option>
                        <option value="mycareergrowth">MyCareerGrowth</option>
                        <option value="knowtice">Knowtice</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">Your Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition-colors"
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        title="Please enter a valid email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 rounded-lg bg-[#1a1a2e] text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition-colors resize-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 relative overflow-hidden group rounded-lg"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></span>
                      <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 to-purple-700"></span>
                      <span className="relative text-white font-medium flex items-center justify-center">
                        Submit Feedback
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - with glassmorphism */}
      <footer className="backdrop-blur-md bg-[#151525]/60 py-12 px-6 text-white border-t border-indigo-900/40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* Company Info - Left Side */}
            <div className="md:max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/sinxlogo.png"
                  alt="SinX Logo"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <span className="text-xl font-bold text-blue-400">
                  SinX Solutions
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                SinX Solutions is at the forefront of AI innovation, creating
                intelligent solutions for businesses and individuals.
              </p>
            </div>

            {/* Right Side - Quick Links and Connect With Us */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              {/* Quick Links */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Quick Links</h3>
                <div className="flex flex-col space-y-2">
                  <Link href="#products" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Products
                  </Link>
                  <Link href="#icymi" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    ICYMI
                  </Link>
                  <Link href="#global-reach" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Global Reach
                  </Link>
                  <Link href="#social-proof" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Social Proof
                  </Link>
                  <Link href="#connections" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Connections
                  </Link>
                  <Link href="#social-media" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Social Media
                  </Link>
                  <Link href="#whatsnext" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    What&apos;s Next
                  </Link>
                  <Link href="#feedback" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                    Feedback
                  </Link>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Connect With Us</h3>
                <div className="flex space-x-4 mb-6">
                  <a
                    href="https://www.linkedin.com/company/sinxsolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/sinxsolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259-.012 3.668-.069 4.948-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.072-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/sinx_solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
                <div className="text-sm text-gray-300">
                  <p>FDRK3456 Compass Building, Al Shohada Road, Al Hamra</p>
                  <p>Industrial Zone-17 Ras Al Khaimah</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-indigo-900/30 text-center text-sm text-gray-400">
            &copy; 2025 SinX Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
