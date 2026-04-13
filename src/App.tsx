/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Menu, 
  Sun, 
  CheckCircle2, 
  Monitor, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  Globe,
  Sprout,
  Users,
  Award,
  ChevronRight,
  X,
  ShoppingBag,
  ExternalLink,
  Lock,
  Settings,
  Save,
  LogOut,
  Image as ImageIcon,
  Briefcase,
  Leaf,
  MessageSquare
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { translations } from "./translations";

// --- Components ---

const Navbar = ({ 
  onNavigate, 
  lang, 
  setLang,
  currentPage
}: { 
  onNavigate: (page: string) => void;
  lang: "ko" | "en" | "vi";
  setLang: (lang: "ko" | "en" | "vi") => void;
  currentPage: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: "home" },
    { name: t.about, href: "about-detail" },
    { name: t.business, href: "business" },
    { name: t.product, href: "product" },
    { name: t.smartfarm, href: "smartfarm" },
    { name: t.contact, href: "contact" },
    { name: "Admin", href: "admin", icon: <Lock size={14} /> },
  ];

  const isAboutDetailPage = currentPage === "about-detail";

  const handleClick = (e: React.MouseEvent, href: string) => {
    if (href === "about-detail" || href === "home" || href === "admin") {
      e.preventDefault();
      onNavigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled || isAboutDetailPage ? "bg-white/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 cursor-pointer ${isScrolled || isAboutDetailPage ? "text-seotaean-green" : "text-white"}`}
          onClick={() => onNavigate("home")}
        >
          {t.companyName}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className={`flex space-x-8 font-medium ${isScrolled || isAboutDetailPage ? "text-gray-700" : "text-white/90"}`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href.startsWith("http") ? link.href : `#${link.href}`} 
                onClick={(e) => handleClick(e, link.href)}
                className="hover:text-seotaean-green transition-colors relative group flex items-center gap-1"
              >
                {link.icon && link.icon}
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-seotaean-green transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => setLang("ko")}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                lang === "ko" 
                  ? "bg-seotaean-green text-white" 
                  : isScrolled || isAboutDetailPage ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              KR
            </button>
            <button 
              onClick={() => setLang("en")}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                lang === "en" 
                  ? "bg-seotaean-green text-white" 
                  : isScrolled || isAboutDetailPage ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang("vi")}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                lang === "vi" 
                  ? "bg-seotaean-green text-white" 
                  : isScrolled || isAboutDetailPage ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              VN
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 rounded-lg ${isScrolled || isAboutDetailPage ? "text-gray-800" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden border-t border-gray-100"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-seotaean-green"
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => { setLang("ko"); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${lang === "ko" ? "bg-seotaean-green text-white" : "bg-gray-100 text-gray-600"}`}
              >
                한국어
              </button>
              <button 
                onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${lang === "en" ? "bg-seotaean-green text-white" : "bg-gray-100 text-gray-600"}`}
              >
                English
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ 
  lang, 
  customData, 
  customImages 
}: { 
  lang: "ko" | "en"; 
  customData?: any;
  customImages?: any;
}) => {
  const t = translations[lang].hero;
  const title1 = customData?.title1 || t.title1;
  const title2 = customData?.title2 || t.title2;
  const desc1 = customData?.desc1 || t.desc1;
  const heroImage = customImages?.hero || "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          className="w-full h-full object-cover brightness-[0.45]" 
          alt="Smart Agriculture Paddy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-seotaean-green/80 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest">
            {t.subtitle}
          </span>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.15] tracking-tight">
            {title1} <br />
            <span className="text-green-400">{title2}</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 opacity-90 font-light leading-relaxed">
            {desc1} <br className="hidden md:block" /> 
            {t.desc2}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#business" className="bg-seotaean-green hover:bg-green-800 text-white px-10 py-4 rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group">
              {t.btnBusiness} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white text-white hover:text-seotaean-green px-10 py-4 rounded-full transition-all duration-300 flex items-center justify-center">
              {t.btnContact}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = ({ 
  onNavigate, 
  lang, 
  customData, 
  customImages 
}: { 
  onNavigate: (page: string) => void; 
  lang: "ko" | "en";
  customData?: any;
  customImages?: any;
}) => {
  const t = translations[lang].about;
  const title = customData?.title || t.title2;
  const desc = customData?.desc || t.desc;
  const aboutImage = customImages?.about || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000";

  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={aboutImage} 
                alt="Seotaean Farm Landscape" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-beige rounded-full -z-0 opacity-50" />
            <div className="absolute top-1/2 -left-10 w-20 h-20 bg-seotaean-green rounded-2xl -z-0 rotate-12" />
          </div>
          
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{t.badge}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {t.title1} <br /> {title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                {desc}
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-seotaean-green shrink-0">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t.winWin}</h4>
                    <p className="text-sm text-gray-500">{t.winWinDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{t.quality}</h4>
                    <p className="text-sm text-gray-500">{t.qualityDesc}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => { onNavigate("about-detail"); window.scrollTo(0, 0); }}
                className="text-seotaean-green font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                {t.btnDetail} <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Business = ({ 
  lang,
  customData
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].business;
  const badge = customData?.badge || t.badge;
  const title = customData?.title || t.title;
  
  const businesses = [
    {
      icon: Sun,
      title: customData?.biz1Title || t.biz1.title,
      desc: customData?.biz1Desc || t.biz1.desc,
      items: t.biz1.items,
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: CheckCircle2,
      title: customData?.biz2Title || t.biz2.title,
      desc: customData?.biz2Desc || t.biz2.desc,
      items: t.biz2.items,
      color: "bg-green-50 text-seotaean-green"
    },
    {
      icon: Monitor,
      title: customData?.biz3Title || t.biz3.title,
      desc: customData?.biz3Desc || t.biz3.desc,
      items: t.biz3.items,
      color: "bg-blue-50 text-blue-600"
    }
  ];

  return (
    <section id="business" className="py-32 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{badge}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="w-20 h-1.5 bg-seotaean-green mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {businesses.map((biz, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className={`w-16 h-16 ${biz.color} rounded-2xl flex items-center justify-center mb-10 shadow-inner`}>
                <biz.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{biz.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-10 flex-grow">{biz.desc}</p>
              <ul className="space-y-4 pt-8 border-t border-gray-50">
                {biz.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <div className="w-1.5 h-1.5 bg-seotaean-green rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Product = ({ 
  lang, 
  customData 
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].product;
  const item1Detail = customData?.item1Detail || t.item1.detail;
  const item2Detail = customData?.item2Detail || t.item2.detail;

  return (
    <section id="product" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{t.badge}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.title}</h2>
          </div>
          <button className="bg-stone-100 hover:bg-stone-200 text-gray-700 px-8 py-3 rounded-full transition-colors font-medium">
            {t.btnAll}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Product 1 */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg bg-amber-500 flex flex-col items-center justify-start pt-12 w-full mx-auto mb-6"
            >
              <a 
                href="https://smartstore.naver.com/seotaean" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-white group-hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-md">
                  <ShoppingBag size={48} />
                </div>
                <span className="font-bold text-lg flex items-center gap-2 text-center">
                  {t.storeLink}
                  <ExternalLink size={16} />
                </span>
              </a>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                <span className="text-amber-300 font-bold text-xs mb-1">{t.item1.badge}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{t.item1.name}</h3>
                <p className="text-white/80 text-sm mb-4 max-w-xs">{t.item1.desc}</p>
                <div className="flex gap-3">
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px]">{t.item1.tag1}</span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px]">{t.item1.tag2}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-100"
            >
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-seotaean-green" />
                {t.item1.name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {item1Detail}
              </p>
            </motion.div>
          </div>

          {/* Product 2 */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg bg-seotaean-green flex flex-col items-center justify-start pt-12 w-full mx-auto mb-6"
            >
              <a 
                href="https://smartstore.naver.com/seotaean" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-white group-hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-md">
                  <ShoppingBag size={48} />
                </div>
                <span className="font-bold text-lg flex items-center gap-2 text-center">
                  {t.storeLink}
                  <ExternalLink size={16} />
                </span>
              </a>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end pointer-events-none">
                <span className="text-green-300 font-bold text-xs mb-1">{t.item2.badge}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{t.item2.name}</h3>
                <p className="text-white/80 text-sm mb-4 max-w-xs">{t.item2.desc}</p>
                <div className="flex gap-3">
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px]">{t.item2.tag1}</span>
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px]">{t.item2.tag2}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-100"
            >
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-seotaean-green" />
                {t.item2.name}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {item2Detail}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SmartFarm = ({ 
  lang,
  customData
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].smartfarm;
  const title1 = customData?.title1 || t.title1;
  const title2 = customData?.title2 || t.title2;
  const feature1Title = customData?.feature1Title || t.feature1.title;
  const feature1Desc = customData?.feature1Desc || t.feature1.desc;
  const feature2Title = customData?.feature2Title || t.feature2.title;
  const feature2Desc = customData?.feature2Desc || t.feature2.desc;

  return (
    <section id="smartfarm" className="py-32 bg-beige/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{t.badge}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {title1} <br /> {title2}
              </h2>
              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-seotaean-green shrink-0">
                    <Sprout size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{feature1Title}</h4>
                    <p className="text-gray-600">{feature1Desc}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-seotaean-green shrink-0">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{feature2Title}</h4>
                    <p className="text-gray-600">{feature2Desc}</p>
                  </div>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-2 bg-seotaean-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-800 transition-all">
                {t.btnReserve} <ChevronRight size={20} />
              </a>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-[2rem] h-64 w-full object-cover shadow-lg" 
                  alt="Agricultural Data Monitor"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-[2rem] h-80 w-full object-cover shadow-lg" 
                  alt="Modern Glass Greenhouse"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-[2rem] h-80 w-full object-cover shadow-lg" 
                  alt="Agricultural Robotic System"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=500" 
                  className="rounded-[2rem] h-64 w-full object-cover shadow-lg" 
                  alt="Agricultural Drone"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ 
  lang, 
  customData 
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].contact;
  const phone = customData?.phone || "010-6514-3231";
  const email = customData?.email || "70percent@gmail.com";
  const title1 = customData?.title1 || t.title1;
  const title2 = customData?.title2 || t.title2;
  const desc1 = customData?.desc1 || t.desc1;

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-seotaean-green rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{title1} <br /> {title2}</h2>
            <p className="text-white/80 text-lg mb-12 leading-relaxed">
              {desc1} <br />
              {t.desc2} <br />
              {t.desc3}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/60">{t.labelPhone}</p>
                  <p className="text-xl font-bold">{phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/60">{t.labelEmail}</p>
                  <p className="text-xl font-bold">{email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.name}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all" placeholder={t.form.namePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.phone}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all" placeholder={t.form.phonePlaceholder} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.type}</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all appearance-none bg-white">
                  <option>{t.form.type1}</option>
                  <option>{t.form.type2}</option>
                  <option>{t.form.type3}</option>
                  <option>{t.form.type4}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.content}</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all h-32 resize-none" placeholder={t.form.contentPlaceholder}></textarea>
              </div>
              <button className="w-full bg-seotaean-green text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg">
                {t.form.btnSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ 
  lang, 
  customData 
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].footer;
  const phone = customData?.phone || "010-6514-3231";
  const email = customData?.email || "70percent@gmail.com";
  const address = customData?.address || t.address;
  const companyName = customData?.companyName || t.companyName;
  const desc1 = customData?.desc1 || t.desc1;
  const desc2 = customData?.desc2 || t.desc2;

  return (
    <footer className="bg-stone-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold mb-6">{companyName}</div>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              {desc1} <br />
              {desc2}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-6 text-white">{t.links}</h4>
              <ul className="space-y-4 text-stone-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.about}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.business}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.product}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">{t.business}</h4>
              <ul className="space-y-4 text-stone-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].product.item1.name}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].product.item2.name}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{translations[lang].nav.smartfarm}</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold mb-6 text-white">{t.contact}</h4>
              <ul className="space-y-4 text-stone-400 text-sm">
                <li className="flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" /> {address}</li>
                <li className="flex items-center gap-2"><Phone size={14} /> {phone}</li>
                <li className="flex items-center gap-2"><Mail size={14} /> {email}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; 2024 Agriculture Corporation Seotaean Co., Ltd. {t.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">{t.privacy}</a>
            <a href="#" className="hover:text-white">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AboutDetail = ({ 
  lang,
  customData
}: { 
  lang: "ko" | "en";
  customData?: any;
}) => {
  const t = translations[lang].aboutDetail;
  const philosophy = customData?.philosophy || t.philosophy;
  const philosophyDesc = customData?.philosophyDesc || t.philosophyDesc;
  const h2026_2 = customData?.history2026_2 || t.history2026_2;
  const h2026_1 = customData?.history2026_1 || t.history2026_1;
  const h2025_2 = customData?.history2025_2 || t.history2025_2;
  const h2025_1 = customData?.history2025_1 || t.history2025_1;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-40 pb-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{t.badge}</span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12 leading-tight">
            {t.title1} <br /> {t.title2}
          </h2>
          
          <div className="aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Seotaean Farm" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{philosophy}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {philosophyDesc}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.history}</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="font-bold text-seotaean-green">2026</span>
                  <div className="flex flex-col">
                    <span className="text-gray-600">{h2026_2}</span>
                    <span className="text-gray-600">{h2026_1}</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-seotaean-green">2025</span>
                  <div className="flex flex-col">
                    <span className="text-gray-600">{h2025_2}</span>
                    <span className="text-gray-600">{h2025_1}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-stone-50 p-12 rounded-[3rem] border border-stone-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.promise}</h3>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-seotaean-green mb-2">100%</div>
                <p className="text-sm text-gray-500">{t.promise1}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-seotaean-green mb-2">Smart</div>
                <p className="text-sm text-gray-500">{t.promise2}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-seotaean-green mb-2">Global</div>
                <p className="text-sm text-gray-500">{t.promise3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Admin = ({ 
  lang, 
  siteData, 
  updateSiteData 
}: { 
  lang: "ko" | "en" | "vi";
  siteData: any;
  updateSiteData: (newData: any) => void;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [editLang, setEditLang] = useState<"ko" | "en" | "vi">("ko");

  const t = lang === "ko" ? {
    loginTitle: "관리자 로그인",
    loginDesc: "사이트 콘텐츠 관리를 위해 로그인해 주세요.",
    idLabel: "아이디",
    pwLabel: "비밀번호",
    loginBtn: "로그인",
    loginError: "아이디 또는 비밀번호가 올바르지 않습니다.",
    panelTitle: "사이트 관리자 패널",
    panelDesc: "실시간으로 사이트의 정보를 수정할 수 있습니다.",
    logout: "로그아웃",
    tabGeneral: "기본 정보",
    tabHero: "메인 히어로",
    tabAbout: "회사 소개",
    tabProduct: "제품 관리",
    tabImages: "이미지 관리",
    saveBtn: "설정 저장하기",
    saveAlert: "설정이 저장되었습니다. (브라우저 로컬 저장소)",
    contactTitle: "연락처 및 주소 설정",
    phoneLabel: "대표 전화",
    emailLabel: "대표 이메일",
    addressLabel: "회사 주소",
    heroTitle: "메인 히어로 문구 수정",
    title1Label: "메인 타이틀 1",
    title2Label: "메인 타이틀 2",
    desc1Label: "서브 설명 1",
    aboutTitle: "회사 소개 및 인사말",
    aboutTitleLabel: "인사말 타이틀",
    aboutDescLabel: "회사 소개 본문",
    product1Title: "제품 1: 아이스 군고구마",
    product2Title: "제품 2: 태안 쌀",
    detailLabel: "상세 설명 (수출용)",
    imageTitle: "주요 이미지 URL 관리",
    heroImgLabel: "메인 히어로 배경 이미지",
    aboutImgLabel: "회사 소개 이미지",
    editLangLabel: "수정할 언어 선택"
  } : {
    loginTitle: "Admin Login",
    loginDesc: "Please login to manage site content.",
    idLabel: "ID",
    pwLabel: "Password",
    loginBtn: "Login",
    loginError: "Invalid ID or Password.",
    panelTitle: "Site Admin Panel",
    panelDesc: "You can edit site information in real-time.",
    logout: "Logout",
    tabGeneral: "General Info",
    tabHero: "Main Hero",
    tabAbout: "About Us",
    tabProduct: "Products",
    tabImages: "Images",
    saveBtn: "Save Settings",
    saveAlert: "Settings saved. (Browser Local Storage)",
    contactTitle: "Contact & Address Settings",
    phoneLabel: "Main Phone",
    emailLabel: "Main Email",
    addressLabel: "Company Address",
    heroTitle: "Main Hero Text Edit",
    title1Label: "Main Title 1",
    title2Label: "Main Title 2",
    desc1Label: "Sub Description 1",
    aboutTitle: "About Us & Greetings",
    aboutTitleLabel: "Greeting Title",
    aboutDescLabel: "About Us Content",
    product1Title: "Product 1: Ice Sweet Potato",
    product2Title: "Product 2: Taean Rice",
    detailLabel: "Detailed Description (for Export)",
    imageTitle: "Main Image URL Management",
    heroImgLabel: "Main Hero Background Image",
    aboutImgLabel: "About Us Image",
    editLangLabel: "Select Language to Edit",
    tabBusiness: "Business",
    tabSmartFarm: "Smart Farm",
    tabContactFooter: "Contact & Footer",
    tabAboutDetail: "About Detail",
    bizTitle: "Business Section Edit",
    sfTitle: "Smart Farm Section Edit",
    cfTitle: "Contact & Footer Section Edit",
    adTitle: "About Detail Section Edit"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "seotaean" && pw === "rudrl!25") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError(t.loginError);
    }
  };

  const handleChange = (section: string, field: string, value: string) => {
    if (section === "general" || section === "images") {
      updateSiteData({
        ...siteData,
        [section]: {
          ...(siteData[section] || {}),
          [field]: value
        }
      });
    } else {
      const langData = siteData[editLang] || {};
      const sectionData = langData[section] || {};
      updateSiteData({
        ...siteData,
        [editLang]: {
          ...langData,
          [section]: {
            ...sectionData,
            [field]: value
          }
        }
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-stone-50 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-stone-100"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-seotaean-green/10 rounded-2xl flex items-center justify-center text-seotaean-green mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.loginTitle}</h2>
            <p className="text-gray-500 text-sm mt-2">{t.loginDesc}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.idLabel}</label>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all" 
                placeholder="ID"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t.pwLabel}</label>
              <input 
                type="password" 
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all" 
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button className="w-full bg-seotaean-green text-white py-4 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg">
              {t.loginBtn}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="text-seotaean-green" />
              {t.panelTitle}
            </h2>
            <p className="text-gray-500 mt-1">{t.panelDesc}</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors"
          >
            <LogOut size={18} /> {t.logout}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 shrink-0 space-y-2">
            <div className="mb-6 p-4 bg-white rounded-2xl border border-stone-100">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.editLangLabel}</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditLang("ko")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${editLang === "ko" ? "bg-seotaean-green text-white shadow-md" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                >
                  한국어
                </button>
                <button 
                  onClick={() => setEditLang("en")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${editLang === "en" ? "bg-seotaean-green text-white shadow-md" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setEditLang("vi")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${editLang === "vi" ? "bg-seotaean-green text-white shadow-md" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                >
                  Tiếng Việt
                </button>
              </div>
            </div>
            {[
              { id: "general", label: t.tabGeneral, icon: <Globe size={18} /> },
              { id: "hero", label: t.tabHero, icon: <Sun size={18} /> },
              { id: "about", label: t.tabAbout, icon: <Users size={18} /> },
              { id: "business", label: t.tabBusiness, icon: <Briefcase size={18} /> },
              { id: "product", label: t.tabProduct, icon: <ShoppingBag size={18} /> },
              { id: "smartfarm", label: t.tabSmartFarm, icon: <Leaf size={18} /> },
              { id: "contactfooter", label: t.tabContactFooter, icon: <MessageSquare size={18} /> },
              { id: "aboutdetail", label: t.tabAboutDetail, icon: <Award size={18} /> },
              { id: "images", label: t.tabImages, icon: <ImageIcon size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-seotaean-green text-white shadow-lg shadow-green-900/10" 
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-8 md:p-12">
            {activeTab === "general" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.contactTitle}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.phoneLabel}</label>
                    <input 
                      type="text" 
                      value={siteData.general?.phone || ""}
                      onChange={(e) => handleChange("general", "phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.emailLabel}</label>
                    <input 
                      type="text" 
                      value={siteData.general?.email || ""}
                      onChange={(e) => handleChange("general", "email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.addressLabel}</label>
                    <input 
                      type="text" 
                      value={siteData.general?.address || ""}
                      onChange={(e) => handleChange("general", "address", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.heroTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.title1Label}</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.hero?.title1 || ""}
                      placeholder={translations[editLang].hero.title1}
                      onChange={(e) => handleChange("hero", "title1", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.title2Label}</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.hero?.title2 || ""}
                      placeholder={translations[editLang].hero.title2}
                      onChange={(e) => handleChange("hero", "title2", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.desc1Label}</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.hero?.desc1 || ""}
                      placeholder={translations[editLang].hero.desc1}
                      onChange={(e) => handleChange("hero", "desc1", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.aboutTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.aboutTitleLabel}</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.about?.title || ""}
                      placeholder={translations[editLang].about.title2}
                      onChange={(e) => handleChange("about", "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.aboutDescLabel}</label>
                    <textarea 
                      value={siteData[editLang]?.about?.desc || ""}
                      placeholder={translations[editLang].about.desc}
                      onChange={(e) => handleChange("about", "desc", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-40 resize-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "business" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.bizTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Badge</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.business?.badge || ""}
                      placeholder={translations[editLang].business.badge}
                      onChange={(e) => handleChange("business", "badge", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Title</label>
                    <input 
                      type="text" 
                      value={siteData[editLang]?.business?.title || ""}
                      placeholder={translations[editLang].business.title}
                      onChange={(e) => handleChange("business", "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-seotaean-green">Business 1</h4>
                      <input type="text" value={siteData[editLang]?.business?.biz1Title || ""} placeholder={translations[editLang].business.biz1.title} onChange={(e) => handleChange("business", "biz1Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <textarea value={siteData[editLang]?.business?.biz1Desc || ""} placeholder={translations[editLang].business.biz1.desc} onChange={(e) => handleChange("business", "biz1Desc", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-seotaean-green">Business 2</h4>
                      <input type="text" value={siteData[editLang]?.business?.biz2Title || ""} placeholder={translations[editLang].business.biz2.title} onChange={(e) => handleChange("business", "biz2Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <textarea value={siteData[editLang]?.business?.biz2Desc || ""} placeholder={translations[editLang].business.biz2.desc} onChange={(e) => handleChange("business", "biz2Desc", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-seotaean-green">Business 3</h4>
                      <input type="text" value={siteData[editLang]?.business?.biz3Title || ""} placeholder={translations[editLang].business.biz3.title} onChange={(e) => handleChange("business", "biz3Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <textarea value={siteData[editLang]?.business?.biz3Desc || ""} placeholder={translations[editLang].business.biz3.desc} onChange={(e) => handleChange("business", "biz3Desc", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "product" && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.product1Title} ({editLang.toUpperCase()})</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.detailLabel}</label>
                    <textarea 
                      value={siteData[editLang]?.product?.item1Detail || ""}
                      placeholder={translations[editLang].product.item1.detail}
                      onChange={(e) => handleChange("product", "item1Detail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-32 resize-none" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.product2Title} ({editLang.toUpperCase()})</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.detailLabel}</label>
                    <textarea 
                      value={siteData[editLang]?.product?.item2Detail || ""}
                      placeholder={translations[editLang].product.item2.detail}
                      onChange={(e) => handleChange("product", "item2Detail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-32 resize-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "smartfarm" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.sfTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Smart Farm Title 1</label>
                      <input type="text" value={siteData[editLang]?.smartfarm?.title1 || ""} placeholder={translations[editLang].smartfarm.title1} onChange={(e) => handleChange("smartfarm", "title1", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Smart Farm Title 2</label>
                      <input type="text" value={siteData[editLang]?.smartfarm?.title2 || ""} placeholder={translations[editLang].smartfarm.title2} onChange={(e) => handleChange("smartfarm", "title2", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-seotaean-green">Feature 1</h4>
                      <input type="text" value={siteData[editLang]?.smartfarm?.feature1Title || ""} placeholder={translations[editLang].smartfarm.feature1.title} onChange={(e) => handleChange("smartfarm", "feature1Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <textarea value={siteData[editLang]?.smartfarm?.feature1Desc || ""} placeholder={translations[editLang].smartfarm.feature1.desc} onChange={(e) => handleChange("smartfarm", "feature1Desc", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-seotaean-green">Feature 2</h4>
                      <input type="text" value={siteData[editLang]?.smartfarm?.feature2Title || ""} placeholder={translations[editLang].smartfarm.feature2.title} onChange={(e) => handleChange("smartfarm", "feature2Title", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <textarea value={siteData[editLang]?.smartfarm?.feature2Desc || ""} placeholder={translations[editLang].smartfarm.feature2.desc} onChange={(e) => handleChange("smartfarm", "feature2Desc", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-24 resize-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contactfooter" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.cfTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-seotaean-green">Contact Section</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" value={siteData[editLang]?.contact?.title1 || ""} placeholder={translations[editLang].contact.title1} onChange={(e) => handleChange("contact", "title1", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <input type="text" value={siteData[editLang]?.contact?.title2 || ""} placeholder={translations[editLang].contact.title2} onChange={(e) => handleChange("contact", "title2", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                    </div>
                    <textarea value={siteData[editLang]?.contact?.desc1 || ""} placeholder={translations[editLang].contact.desc1} onChange={(e) => handleChange("contact", "desc1", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm h-20 resize-none" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-seotaean-green">Footer Section</h4>
                    <input type="text" value={siteData[editLang]?.footer?.companyName || ""} placeholder={translations[editLang].footer.companyName} onChange={(e) => handleChange("footer", "companyName", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" value={siteData[editLang]?.footer?.desc1 || ""} placeholder={translations[editLang].footer.desc1} onChange={(e) => handleChange("footer", "desc1", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      <input type="text" value={siteData[editLang]?.footer?.desc2 || ""} placeholder={translations[editLang].footer.desc2} onChange={(e) => handleChange("footer", "desc2", e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "aboutdetail" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.adTitle} ({editLang.toUpperCase()})</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Philosophy Title</label>
                    <input type="text" value={siteData[editLang]?.aboutDetail?.philosophy || ""} placeholder={translations[editLang].aboutDetail.philosophy} onChange={(e) => handleChange("aboutDetail", "philosophy", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Philosophy Description</label>
                    <textarea value={siteData[editLang]?.aboutDetail?.philosophyDesc || ""} placeholder={translations[editLang].aboutDetail.philosophyDesc} onChange={(e) => handleChange("aboutDetail", "philosophyDesc", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none h-32 resize-none" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-seotaean-green">History Items</h4>
                    <div className="grid gap-4">
                      <div className="flex gap-4 items-center">
                        <span className="w-20 text-xs font-bold text-gray-400">2026 #2</span>
                        <input type="text" value={siteData[editLang]?.aboutDetail?.history2026_2 || ""} placeholder={translations[editLang].aboutDetail.history2026_2} onChange={(e) => handleChange("aboutDetail", "history2026_2", e.target.value)} className="flex-grow px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="w-20 text-xs font-bold text-gray-400">2026 #1</span>
                        <input type="text" value={siteData[editLang]?.aboutDetail?.history2026_1 || ""} placeholder={translations[editLang].aboutDetail.history2026_1} onChange={(e) => handleChange("aboutDetail", "history2026_1", e.target.value)} className="flex-grow px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="w-20 text-xs font-bold text-gray-400">2025 #2</span>
                        <input type="text" value={siteData[editLang]?.aboutDetail?.history2025_2 || ""} placeholder={translations[editLang].aboutDetail.history2025_2} onChange={(e) => handleChange("aboutDetail", "history2025_2", e.target.value)} className="flex-grow px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="w-20 text-xs font-bold text-gray-400">2025 #1</span>
                        <input type="text" value={siteData[editLang]?.aboutDetail?.history2025_1 || ""} placeholder={translations[editLang].aboutDetail.history2025_1} onChange={(e) => handleChange("aboutDetail", "history2025_1", e.target.value)} className="flex-grow px-4 py-2 rounded-lg border border-gray-200 text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">{t.imageTitle}</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.heroImgLabel}</label>
                    <input 
                      type="text" 
                      value={siteData.images?.hero || ""}
                      onChange={(e) => handleChange("images", "hero", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.aboutImgLabel}</label>
                    <input 
                      type="text" 
                      value={siteData.images?.about}
                      onChange={(e) => handleChange("images", "about", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t flex justify-end">
              <button 
                onClick={() => {
                  localStorage.setItem("seotaean_site_data", JSON.stringify(siteData));
                  alert(t.saveAlert);
                }}
                className="bg-seotaean-green text-white px-10 py-4 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg flex items-center gap-2"
              >
                <Save size={20} /> {t.saveBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [lang, setLang] = useState<"ko" | "en" | "vi">("ko");

  // Editable Site Data
  const [siteData, setSiteData] = useState(() => {
    const defaults = {
      general: {
        phone: "010-6514-3231",
        email: "70percent@gmail.com",
        address: "충청남도 태안군 [나머지 주소]"
      },
      images: {
        hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920",
        about: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
      },
      ko: {
        hero: { title1: "", title2: "", desc1: "" },
        about: { title: "", desc: "" },
        business: { badge: "", title: "", biz1Title: "", biz1Desc: "", biz2Title: "", biz2Desc: "", biz3Title: "", biz3Desc: "" },
        product: { item1Detail: "", item2Detail: "" },
        smartfarm: { title1: "", title2: "", feature1Title: "", feature1Desc: "", feature2Title: "", feature2Desc: "" },
        contact: { title1: "", title2: "", desc1: "" },
        footer: { companyName: "", desc1: "", desc2: "" },
        aboutDetail: { philosophy: "", philosophyDesc: "", history2026_2: "", history2026_1: "", history2025_2: "", history2025_1: "" }
      },
      en: {
        hero: { title1: "", title2: "", desc1: "" },
        about: { title: "", desc: "" },
        business: { badge: "", title: "", biz1Title: "", biz1Desc: "", biz2Title: "", biz2Desc: "", biz3Title: "", biz3Desc: "" },
        product: { item1Detail: "", item2Detail: "" },
        smartfarm: { title1: "", title2: "", feature1Title: "", feature1Desc: "", feature2Title: "", feature2Desc: "" },
        contact: { title1: "", title2: "", desc1: "" },
        footer: { companyName: "", desc1: "", desc2: "" },
        aboutDetail: { philosophy: "", philosophyDesc: "", history2026_2: "", history2026_1: "", history2025_2: "", history2025_1: "" }
      },
      vi: {
        hero: { title1: "", title2: "", desc1: "" },
        about: { title: "", desc: "" },
        business: { badge: "", title: "", biz1Title: "", biz1Desc: "", biz2Title: "", biz2Desc: "", biz3Title: "", biz3Desc: "" },
        product: { item1Detail: "", item2Detail: "" },
        smartfarm: { title1: "", title2: "", feature1Title: "", feature1Desc: "", feature2Title: "", feature2Desc: "" },
        contact: { title1: "", title2: "", desc1: "" },
        footer: { companyName: "", desc1: "", desc2: "" },
        aboutDetail: { philosophy: "", philosophyDesc: "", history2026_2: "", history2026_1: "", history2025_2: "", history2025_1: "" }
      }
    };

    const saved = localStorage.getItem("seotaean_site_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge logic for ko/en/vi sections
        return {
          ...defaults,
          ...parsed,
          general: { ...defaults.general, ...parsed.general },
          images: { ...defaults.images, ...parsed.images },
          ko: parsed.ko ? { ...defaults.ko, ...parsed.ko } : defaults.ko,
          en: parsed.en ? { ...defaults.en, ...parsed.en } : defaults.en,
          vi: parsed.vi ? { ...defaults.vi, ...parsed.vi } : defaults.vi
        };
      } catch (e) {
        return defaults;
      }
    }
    
    return defaults;
  });

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-seotaean-green">
      <Navbar onNavigate={setCurrentPage} lang={lang} setLang={setLang} currentPage={currentPage} />
      {currentPage === "home" ? (
        <>
          <Hero lang={lang} customData={siteData[lang]?.hero} customImages={siteData.images} />
          <About onNavigate={setCurrentPage} lang={lang} customData={siteData[lang]?.about} customImages={siteData.images} />
          <Business lang={lang} customData={siteData[lang]?.business} />
          <Product lang={lang} customData={siteData[lang]?.product} />
          <SmartFarm lang={lang} customData={siteData[lang]?.smartfarm} />
          <Contact lang={lang} customData={{...siteData.general, ...siteData[lang]?.contact}} />
        </>
      ) : currentPage === "admin" ? (
        <Admin lang={lang} siteData={siteData} updateSiteData={setSiteData} />
      ) : (
        <AboutDetail lang={lang} customData={siteData[lang]?.aboutDetail} />
      )}
      <Footer lang={lang} customData={{...siteData.general, ...siteData[lang]?.footer}} />
    </div>
  );
}
