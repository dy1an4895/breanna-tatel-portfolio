import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericValue = parseInt(end.replace(/\D/g, ''));
          
          let start = 0;
          const increment = numericValue / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
  };

  const numericValue = parseInt(end.replace(/\D/g, ''));
  const suffix = end.replace(/[\d,]/g, '');
  
  return (
    <span ref={counterRef}>
      {hasAnimated ? formatNumber(count) + suffix : '0' + suffix}
    </span>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-200/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
};

const PolicyCard = ({ policy, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-blue-100 p-8 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 hover:scale-105 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${policy.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {policy.icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {policy.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {policy.description}
        </p>
        
        {policy.stat && (
          <div className="flex items-baseline space-x-2">
            <span className={`text-3xl font-bold bg-gradient-to-r ${policy.gradient} bg-clip-text text-transparent`}>
              <AnimatedCounter end={policy.stat} />
            </span>
            <span className="text-blue-600 text-sm font-medium">
              {policy.statLabel}
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:breanna.tatel@virginia.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select a subject</option>
              <option value="Volunteer Interest">Volunteer Interest</option>
              <option value="Policy Question">Policy Question</option>
              <option value="Event Inquiry">Event Inquiry</option>
              <option value="Media Request">Media Request</option>
              <option value="General Support">General Support</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Tell me how I can help..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
          
          {isSubmitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const PollingFinder = () => {
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleFindPoll = () => {
    setIsSearching(true);
    setTimeout(() => {
      const searchUrl = `https://www.google.com/search?q=polling+places+near+${encodeURIComponent(address)}+virginia`;
      window.open(searchUrl, '_blank');
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 shadow-xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🗳️ Find Your Polling Place
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Enter your address to find your designated polling location and voting information.
        </p>
        
        <div className="space-y-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full address in Virginia"
            className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          
          <button
            onClick={handleFindPoll}
            disabled={!address || isSearching}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSearching ? 'Searching...' : 'Find My Polling Place'}
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm text-center">
            <strong>Voting Reminder:</strong> Virginia requires photo ID to vote. 
            Check your registration status and find important voting information at 
            <a href="https://vote.elections.virginia.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              vote.elections.virginia.gov
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const policyAreas = [
    {
      id: 'foster-care',
      icon: '🏠',
      title: 'Foster Care Reform',
      description: 'Advocating for systemic changes to support children in foster care and ensure equitable outcomes based on my lived experience.',
      stat: '400000',
      statLabel: 'Children in Foster Care',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'education',
      icon: '📚',
      title: 'Educational Justice',
      description: 'Working to ensure all students have access to quality education regardless of background, especially through my dual program at UVA.',
      stat: '100',
      statLabel: 'Commitment to Equity',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'voter-protection',
      icon: '🗳️',
      title: 'Voter Protection',
      description: 'As former Manager of Campus Outreach for Virginia Voter Protection, ensuring every voice is heard in our democracy.',
      stat: '500',
      statLabel: 'Students Engaged',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'child-welfare',
      icon: '💙',
      title: 'Child Welfare Policy',
      description: 'Developing policies that prioritize the wellbeing and futures of vulnerable children through my work at National Council for Adoption.',
      stat: '15',
      statLabel: 'Policy Initiatives',
      color: 'from-indigo-500 to-blue-500',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'womens-rights',
      icon: '✊',
      title: "Women's Rights & Reproductive Freedom",
      description: 'Fighting for reproductive freedom, equal pay, and gender equity through advocacy and policy development.',
      stat: '100',
      statLabel: 'Commitment to Equality',
      color: 'from-pink-500 to-rose-500',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'housing',
      icon: '🏘️',
      title: 'Affordable Housing',
      description: 'Ensuring every Virginian has access to safe, affordable housing and combating homelessness through comprehensive policy solutions.',
      stat: '50000',
      statLabel: 'Families Need Housing',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const timelineEvents = [
    {
      year: 'Early Life',
      title: 'Foster Care System',
      description: 'Growing up in the foster care system, facing challenges that would later fuel my passion for systemic change.',
      icon: '🏠',
      color: 'from-red-500 to-orange-500'
    },
    {
      year: 'High School',
      title: 'Yorktown High School',
      description: 'Finding my voice through debate and academic excellence, preparing for the advocacy work ahead.',
      icon: '🎓',
      color: 'from-blue-500 to-purple-500'
    },
    {
      year: '2021',
      title: 'University of Virginia',
      description: 'Beginning my dual program in Political & Social Thought and Youth in Social Innovation.',
      icon: '📚',
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2024',
      title: 'First Policy Work',
      description: 'Starting as Admissions Intern and joining Phi Alpha Delta, Women in Law, and Model UN.',
      icon: '⚖️',
      color: 'from-green-500 to-blue-500'
    },
    {
      year: '2024',
      title: 'Voter Protection Leadership',
      description: 'Manager of Campus Outreach for Virginia Voter Protection, engaging 500+ students in democracy.',
      icon: '🗳️',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      year: '2024',
      title: 'Dialogue Fellowship',
      description: 'Student Dialogue Fellow at Karsh Institute of Democracy, fostering inclusive conversations.',
      icon: '🤝',
      color: 'from-pink-500 to-rose-500'
    },
    {
      year: '2025',
      title: 'Campaign Experience',
      description: 'Campaign Intern for Abigail Spanberger\'s gubernatorial campaign, grassroots engagement.',
      icon: '🏛️',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      year: '2025',
      title: 'Adoption Policy',
      description: 'Summer internship at National Council for Adoption, focusing on foster care and adoption reform.',
      icon: '💙',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: 'Future',
      title: 'Policy Career',
      description: 'Combining lived experience with policy expertise to create meaningful, lasting change.',
      icon: '🌟',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'policies', 'polling', 'why-vote', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const TimelineEvent = ({ event, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const eventRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (eventRef.current) {
        observer.observe(eventRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={eventRef}
        className={`relative flex items-center ${
          index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`} />
        
        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
          <div className={`bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group transform ${
            isVisible ? 'translate-x-0 opacity-100' : index % 2 === 0 ? '-translate-x-10 opacity-0' : 'translate-x-10 opacity-0'
          }`} style={{ transitionDelay: `${index * 100}ms` }}>
            <div className={`inline-flex items-center space-x-3 ${index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''} mb-4`}>
              <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                {event.icon}
              </div>
              <div className={`px-3 py-1 bg-gradient-to-r ${event.color} rounded-full text-white text-sm font-semibold`}>
                {event.year}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
        
        <div className="w-5/12" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <FloatingElements />
      
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 border border-blue-100 shadow-lg">
        <div className="hidden md:flex space-x-6">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'My Journey' },
            { id: 'policies', label: 'Policies' },
            { id: 'polling', label: 'Polling Places' },
            { id: 'why-vote', label: 'Why Vote' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                activeSection === item.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-blue-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-20 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 shadow-xl z-40 md:hidden">
          <div className="space-y-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'My Journey' },
              { id: 'policies', label: 'Policies' },
              { id: 'polling', label: 'Polling Places' },
              { id: 'why-vote', label: 'Why Vote' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-6xl text-white shadow-2xl animate-pulse">
              BT
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Breanna Tatel
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-600 mb-4 font-semibold">
            Advocate • Policy Innovator • Future Leader
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            UVA Student studying Political & Social Thought and Youth in Social Innovation. 
            Former foster youth turned advocate, dedicated to creating systemic change through policy, 
            voter protection, and community engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('policies')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">View My Policies</span>
            </button>
            
            <button
              onClick={() => scrollToSection('about')}
              className="group relative px-8 py-4 bg-white border-2 border-blue-500 text-blue-600 font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">My Journey</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end="669" />
              </div>
              <div className="text-gray-600 text-sm">LinkedIn Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end="500" />
              </div>
              <div className="text-gray-600 text-sm">UVA Students Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end="15" />
              </div>
              <div className="text-gray-600 text-sm">Policy Initiatives</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <AnimatedCounter end="3" />
              </div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            My Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full" />
            
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <TimelineEvent key={index} event={event} index={index} />
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 border border-blue-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Current Focus</h3>
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
                Currently working on Abigail Spanberger's gubernatorial campaign while preparing for my role at the National Council for Adoption. 
                My goal is to bridge lived experience with policy expertise to create systemic change for foster youth and vulnerable communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="policies" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Policy Focus Areas
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Combining lived experience with policy expertise to create meaningful, lasting change
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policyAreas.map((policy, index) => (
              <div key={policy.id} id={policy.id} className="scroll-mt-32">
                <PolicyCard policy={policy} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="polling" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Find Your Polling Place
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Make your voice heard in Virginia's democracy. Every vote matters in creating change.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Voting Information</h3>
                <div className="space-y-4">
                  <a
                    href="https://vote.elections.virginia.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
                  >
                    <div className="text-gray-800 font-semibold">Virginia Voter Portal</div>
                    <div className="text-blue-600 text-sm">Check registration, find polling places</div>
                  </a>
                  <a
                    href="https://www.ballotpedia.org/Virginia_elections,_2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300"
                  >
                    <div className="text-gray-800 font-semibold">2025 Election Calendar</div>
                    <div className="text-green-600 text-sm">Important dates and deadlines</div>
                  </a>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What to Bring</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Valid Virginia driver's license or ID card</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Utility bill or bank statement (if no photo ID)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Your registered voting address</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Patience and civic pride!</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <PollingFinder />
          </div>
        </div>
      </section>

      <section id="why-vote" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Why Your Vote Matters
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Democracy works best when everyone participates. Here's why your voice counts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏛️',
                title: 'Shape Local Policy',
                description: 'Local elections determine who makes decisions about your schools, housing, public safety, and quality of life in your community.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🌉',
                title: 'Bridge the Gap',
                description: 'Your vote helps bridge the gap between policy makers and the people they serve, especially vulnerable communities.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '👥',
                title: 'Amplify Youth Voice',
                description: 'Young voters often decide close elections. Your participation ensures your generation has a say in your future.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '⚖️',
                title: 'Protect Vulnerable Rights',
                description: 'From foster youth to reproductive freedom, your vote protects the rights of those who need it most.',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: '🎯',
                title: 'Make History',
                description: 'Every election is an opportunity to make progress. Your vote contributes to the long arc of justice.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: '💪',
                title: 'Exercise Democracy',
                description: 'Voting is both a right and a responsibility. Exercise your power to create the change you want to see.',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((reason, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-blue-100 text-lg mb-6">
                Join me in building a more equitable Virginia. Your vote is your voice in creating the change we need.
              </p>
              <button
                onClick={() => scrollToSection('polling')}
                className="px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              >
                Find Your Polling Place
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Get Involved
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Ready to make change happen? Let's work together to build a more equitable Virginia.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Let's Connect</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold">Email</div>
                      <a href="mailto:breanna.tatel@virginia.edu" className="text-blue-600 hover:underline">
                        breanna.tatel@virginia.edu
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold">LinkedIn</div>
                      <a
                        href="https://linkedin.com/in/breanna-tatel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        /in/breanna-tatel
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold">Location</div>
                      <div className="text-gray-600">Charlottesville, Virginia</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-100 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Volunteer Opportunities</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Campaign events and canvassing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Student voter registration drives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Policy research and advocacy</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Community outreach and education</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-blue-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                BT
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Breanna Tatel</h3>
              <p className="text-gray-600">Advocate for Change • UVA Student • Policy Innovator</p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://linkedin.com/in/breanna-tatel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:breanna.tatel@virginia.edu"
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="https://vote.elections.virginia.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-6" />
            <p className="text-gray-600 text-lg">
              "Together, we build a more equitable future for all Virginians"
            </p>
            <p className="text-gray-500 text-sm mt-4">
              © 2025 Breanna Tatel. Built with ❤️ for progressive change.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}