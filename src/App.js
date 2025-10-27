import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const focusRef = useRef(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], [0, -150]);
  
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start']
  });
  
  const aboutOpacity = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const aboutY = useTransform(aboutProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ['start end', 'end start']
  });
  
  const experienceOpacity = useTransform(experienceProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const experienceY = useTransform(experienceProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  
  const { scrollYProgress: focusProgress } = useScroll({
    target: focusRef,
    offset: ['start end', 'end start']
  });
  
  const focusOpacity = useTransform(focusProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const focusY = useTransform(focusProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = target;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isInView, target]);

    return <div ref={ref}>{count}{suffix}</div>;
  };

  const experiences = [
    {
      title: 'Campaign Internship',
      organization: 'Spanberger for Governor',
      date: 'Feb 2025 - Present',
      description: 'Leading grassroots engagement through campus events, voter outreach, and data-driven campaign strategy.',
      color: 'from-blue-500 to-blue-600',
      icon: '📊',
      achievements: ['Organized 15+ campus events', 'Engaged 500+ voters', 'Led volunteer team']
    },
    {
      title: 'Summer 2025 Internship',
      organization: 'National Council For Adoption',
      date: 'Apr 2025 - Jun 2025',
      description: 'Supporting policy research on adoption law, child welfare, and foster care reform advocacy.',
      color: 'from-cyan-500 to-blue-600',
      icon: '⚖️',
      achievements: ['Research on policy reform', 'Conference planning', 'Legal documentation']
    },
    {
      title: 'Manager of Campus Outreach',
      organization: 'Virginia Voter Protection',
      date: 'Aug 2024 - Dec 2024',
      description: 'Led voter protection efforts across Virginia colleges, ensuring students had access to voting rights information.',
      color: 'from-blue-600 to-indigo-600',
      icon: '🗳️',
      achievements: ['Coordinated statewide efforts', 'Recruited poll observers', 'Protected voting rights']
    },
    {
      title: 'Student Dialogue Fellowship',
      organization: 'Karsh Institute of Democracy',
      date: 'Sep 2024 - Apr 2025',
      description: 'Fostering inclusive campus dialogue on pressing societal issues and democratic engagement.',
      color: 'from-blue-400 to-cyan-500',
      icon: '💬',
      achievements: ['Facilitated dialogues', 'Built inclusive spaces', 'Shaped frameworks']
    }
  ];

  const focusAreas = [
    {
      title: 'Foster Care Reform',
      description: 'Advocating for systemic changes to support children in foster care and ensure equitable outcomes.',
      icon: '🏠',
      stat: '400k+',
      statLabel: 'Children in Foster Care'
    },
    {
      title: 'Educational Justice',
      description: 'Working to ensure all students have access to quality education regardless of background.',
      icon: '📚',
      stat: '100%',
      statLabel: 'Equity in Education'
    },
    {
      title: 'Voter Protection',
      description: 'Protecting voting rights and ensuring every voice is heard in our democracy.',
      icon: '🗳️',
      stat: '500+',
      statLabel: 'Voters Protected'
    },
    {
      title: 'Child Welfare Policy',
      description: 'Developing policies that prioritize the wellbeing and futures of vulnerable children.',
      icon: '💙',
      stat: '15+',
      statLabel: 'Policy Initiatives'
    },
    {
      title: "Women's Rights",
      description: 'Fighting for reproductive freedom, equal pay, and gender equity in all aspects of society.',
      icon: '✊',
      stat: '100%',
      statLabel: 'Equality for All'
    },
    {
      title: 'Affordable Housing',
      description: 'Ensuring every Virginian has access to safe, affordable housing and combating homelessness.',
      icon: '🏘️',
      stat: '50k+',
      statLabel: 'Families Need Housing'
    }
  ];

  const achievements = [
    { number: 15, label: 'Campus Events Organized', suffix: '+' },
    { number: 500, label: 'Voters Engaged', suffix: '+' },
    { number: 10, label: 'Organizations Collaborated', suffix: '+' },
    { number: 4, label: 'Years at UVA', suffix: '' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Breanna Tatel
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Impact', 'Focus', 'Connect'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <a 
              href="https://www.vote.org/polling-place-locator/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Find Poll Near Me
            </a>
          </div>
        </div>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full opacity-5 blur-3xl" />

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }} 
          className="max-w-7xl mx-auto relative z-10 w-full text-center py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-full text-sm md:text-base font-semibold shadow-lg inline-block">
              UVA Student • Political Advocate • Change Maker
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 px-4"
          >
            <h1 className="font-black leading-tight break-words">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
                Challenge
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-800 mb-6">
                to
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Change
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-slate-600 mb-14 max-w-5xl mx-auto leading-relaxed px-6"
          >
            Transforming lived experience into legislative action.
            <br className="hidden sm:block" />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-semibold">
              Building a more equitable Virginia for all.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center px-6"
          >
            <a
              href="#about"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-14 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
            >
              Learn My Story →
            </a>
            <a
              href="#connect"
              className="bg-white text-blue-600 px-14 py-6 rounded-full font-bold text-lg shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Let's Connect
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <section id="impact" className="py-32 px-8 lg:px-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-24 text-slate-900 px-6 break-words"
          >
            Impact by the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Numbers
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 md:p-12 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6 break-words">
                  <AnimatedCounter target={achievement.number} suffix={achievement.suffix} />
                </div>
                <div className="text-slate-600 text-base md:text-lg font-medium leading-relaxed break-words">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section 
        ref={aboutRef}
        id="about" 
        className="py-32 px-8 lg:px-16 bg-white"
        style={{ opacity: aboutOpacity, y: aboutY }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-20 text-center text-slate-900 px-6 break-words"
          >
            My{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-12 md:p-16 lg:p-20 rounded-3xl border border-blue-100 shadow-lg"
          >
            <div className="space-y-10">
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 leading-relaxed break-words">
                I grew up in the foster care system, and for a long time, the odds were stacked against me. 
                But I've turned those challenges into{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold">
                  fuel for change
                </span>.
              </p>

              <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 leading-relaxed break-words">
                Today, I'm a student at the{' '}
                <span className="text-transparent bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text font-bold">
                  University of Virginia
                </span>, double majoring in Youth and Social Innovation and Political and Social Thought. My lived 
                experience drives my commitment to public service and equity, especially for children, families, 
                and communities too often left behind.
              </p>

              <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 leading-relaxed break-words">
                I'm pursuing a career in politics because I believe{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold text-2xl md:text-3xl">
                  real change happens when we combine policy with purpose
                </span>. From advocating for foster care reform and educational justice to organizing voter protection 
                efforts across Virginia, I'm focused on turning struggle into strategy, and making sure that no 
                voice is forgotten in the process.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={experienceRef}
        id="experience" 
        className="py-32 px-8 lg:px-16 bg-gradient-to-b from-blue-50 to-white"
        style={{ opacity: experienceOpacity, y: experienceY }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-24 text-center text-slate-900 px-6 break-words"
          >
            Experience &{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Leadership
            </span>
          </motion.h2>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-300 to-cyan-300" />

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} shadow-lg`} />
                  </div>

                  <div className="w-full md:w-5/12">
                    <div className="bg-white p-10 md:p-12 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="mb-8">
                        <div className="text-4xl mb-4">{exp.icon}</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight break-words">
                          {exp.title}
                        </h3>
                        <p className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-3 leading-tight break-words`}>
                          {exp.organization}
                        </p>
                        <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium inline-block">
                          {exp.date}
                        </span>
                      </div>

                      <p className="text-slate-600 mb-8 leading-relaxed text-base md:text-lg break-words">
                        {exp.description}
                      </p>

                      <div className="space-y-4">
                        {exp.achievements.map((achievement, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 text-sm md:text-base text-slate-600"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0 mt-2`} />
                            <span className="leading-relaxed break-words">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        ref={focusRef}
        id="focus" 
        className="py-32 px-8 lg:px-16 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white"
        style={{ opacity: focusOpacity, y: focusY }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 px-6 break-words">
              Policy Focus Areas
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-6 break-words">
              Combining lived experience with policy expertise to create meaningful, lasting change
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-7xl mb-6 break-words">{area.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight break-words">
                  {area.title}
                </h3>
                <p className="text-white/90 mb-8 leading-relaxed text-lg md:text-xl break-words">
                  {area.description}
                </p>
                <div className="inline-block">
                  <div className="text-5xl font-black text-white mb-2 break-words">
                    {area.stat}
                  </div>
                  <div className="text-base text-white/80 leading-relaxed break-words">
                    {area.statLabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="connect" className="py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-slate-900 px-6 break-words leading-tight"
          >
            Let's Build{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Change Together
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-700 mb-16 leading-relaxed max-w-4xl mx-auto px-6 break-words"
          >
            Interested in collaboration, have questions, or want to support the cause?
            <br className="hidden sm:block" />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-semibold">
              I'd love to hear from you.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center px-6"
          >
            <a
              href="mailto:bhtdebate@gmail.com"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-14 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
            >
              <span className="inline-flex items-center justify-center gap-3">
                <span>✉️</span>
                <span className="break-words">Send a Message</span>
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/breanna-tatel/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-14 py-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto text-center"
            >
              <span className="inline-flex items-center justify-center gap-3">
                <span>💼</span>
                <span className="break-words">Connect on LinkedIn</span>
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-20 px-8 lg:px-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent break-words">
                Breanna Tatel
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md break-words">
                Turning struggle into strategy | Building a more equitable future for all Virginians
              </p>
            </div>

            <div className="flex space-x-8">
              <a
                href="https://www.linkedin.com/in/breanna-tatel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-slate-400 hover:text-white transition-colors duration-300"
              >
                💼
              </a>
              <a
                href="mailto:bhtdebate@gmail.com"
                className="text-4xl text-slate-400 hover:text-cyan-300 transition-colors duration-300"
              >
                ✉️
              </a>
              <a
                href="#"
                className="text-4xl text-slate-400 hover:text-white transition-colors duration-300"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-4xl text-slate-400 hover:text-cyan-300 transition-colors duration-300"
              >
                📸
              </a>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800 text-center text-slate-400">
            <p className="text-sm md:text-base leading-relaxed px-6 break-words">
              © 2025 Breanna Tatel. All rights reserved. | Fighting for foster care reform, educational justice, women's rights, affordable housing, and democratic participation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}