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
  Image as ImageIcon
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { translations } from "./translations";

// --- Components ---

const Navbar = ({ 
  onNavigate, 
  lang, 
  setLang 
}: { 
  onNavigate: (page: string) => void;
  lang: "ko" | "en";
  setLang: (lang: "ko" | "en") => void;
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

  const handleClick = (e: React.MouseEvent, href: string) => {
    if (href === "about-detail" || href === "home" || href === "admin") {
      e.preventDefault();
      onNavigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 cursor-pointer ${isScrolled ? "text-seotaean-green" : "text-white"}`}
          onClick={() => onNavigate("home")}
        >
          {t.companyName}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <div className={`flex space-x-8 font-medium ${isScrolled ? "text-gray-700" : "text-white/90"}`}>
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
                  : isScrolled ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              KR
            </button>
            <button 
              onClick={() => setLang("en")}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                lang === "en" 
                  ? "bg-seotaean-green text-white" 
                  : isScrolled ? "bg-gray-100 text-gray-400 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-gray-800" : "text-white"}`}
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

const Business = ({ lang }: { lang: "ko" | "en" }) => {
  const t = translations[lang].business;
  const businesses = [
    {
      icon: Sun,
      title: t.biz1.title,
      desc: t.biz1.desc,
      items: t.biz1.items,
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: CheckCircle2,
      title: t.biz2.title,
      desc: t.biz2.desc,
      items: t.biz2.items,
      color: "bg-green-50 text-seotaean-green"
    },
    {
      icon: Monitor,
      title: t.biz3.title,
      desc: t.biz3.desc,
      items: t.biz3.items,
      color: "bg-blue-50 text-blue-600"
    }
  ];

  return (
    <section id="business" className="py-32 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-seotaean-green font-bold tracking-widest uppercase text-sm mb-4 block">{t.badge}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t.title}</h2>
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

const SmartFarm = ({ lang }: { lang: "ko" | "en" }) => {
  const t = translations[lang].smartfarm;
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
                {t.title1} <br /> {t.title2}
              </h2>
              <div className="space-y-8 mb-12">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-seotaean-green shrink-0">
                    <Sprout size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.feature1.title}</h4>
                    <p className="text-gray-600">{t.feature1.desc}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-seotaean-green shrink-0">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.feature2.title}</h4>
                    <p className="text-gray-600">{t.feature2.desc}</p>
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

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-seotaean-green rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t.title1} <br /> {t.title2}</h2>
            <p className="text-white/80 text-lg mb-12 leading-relaxed">
              {t.desc1} <br />
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

  return (
    <footer className="bg-stone-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div>
            <div className="text-2xl font-bold mb-6">{t.companyName}</div>
            <p className="text-stone-400 max-w-sm leading-relaxed">
              {t.desc1} <br />
              {t.desc2}
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

const AboutDetail = ({ lang }: { lang: "ko" | "en" }) => {
  const t = translations[lang].aboutDetail;
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.philosophy}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.philosophyDesc}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.history}</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="font-bold text-seotaean-green">2024</span>
                  <span className="text-gray-600">{t.history2024}</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-seotaean-green">2023</span>
                  <span className="text-gray-600">{t.history2023}</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-seotaean-green">2022</span>
                  <span className="text-gray-600">{t.history2022}</span>
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
  lang: "ko" | "en";
  siteData: any;
  updateSiteData: (newData: any) => void;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "seotaean" && pw === "rudrl!25") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleChange = (section: string, field: string, value: string) => {
    updateSiteData({
      ...siteData,
      [section]: {
        ...siteData[section],
        [field]: value
      }
    });
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
            <h2 className="text-2xl font-bold text-gray-900">관리자 로그인</h2>
            <p className="text-gray-500 text-sm mt-2">사이트 콘텐츠 관리를 위해 로그인해 주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">아이디</label>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green focus:ring-2 focus:ring-seotaean-green/20 outline-none transition-all" 
                placeholder="ID"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호</label>
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
              로그인
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
              사이트 관리자 패널
            </h2>
            <p className="text-gray-500 mt-1">실시간으로 사이트의 정보를 수정할 수 있습니다.</p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium transition-colors"
          >
            <LogOut size={18} /> 로그아웃
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 shrink-0 space-y-2">
            {[
              { id: "general", label: "기본 정보", icon: <Globe size={18} /> },
              { id: "hero", label: "메인 히어로", icon: <Sun size={18} /> },
              { id: "about", label: "회사 소개", icon: <Users size={18} /> },
              { id: "product", label: "제품 관리", icon: <ShoppingBag size={18} /> },
              { id: "images", label: "이미지 관리", icon: <ImageIcon size={18} /> },
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
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">연락처 및 주소 설정</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">대표 전화</label>
                    <input 
                      type="text" 
                      value={siteData.general.phone}
                      onChange={(e) => handleChange("general", "phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">대표 이메일</label>
                    <input 
                      type="text" 
                      value={siteData.general.email}
                      onChange={(e) => handleChange("general", "email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">회사 주소</label>
                    <input 
                      type="text" 
                      value={siteData.general.address}
                      onChange={(e) => handleChange("general", "address", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">메인 히어로 문구 수정</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">메인 타이틀 1</label>
                    <input 
                      type="text" 
                      value={siteData.hero.title1}
                      onChange={(e) => handleChange("hero", "title1", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">메인 타이틀 2</label>
                    <input 
                      type="text" 
                      value={siteData.hero.title2}
                      onChange={(e) => handleChange("hero", "title2", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">서브 설명 1</label>
                    <input 
                      type="text" 
                      value={siteData.hero.desc1}
                      onChange={(e) => handleChange("hero", "desc1", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">회사 소개 및 인사말</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">인사말 타이틀</label>
                    <input 
                      type="text" 
                      value={siteData.about.title}
                      onChange={(e) => handleChange("about", "title", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">회사 소개 본문</label>
                    <textarea 
                      value={siteData.about.desc}
                      onChange={(e) => handleChange("about", "desc", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-40 resize-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "product" && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-4">제품 1: 아이스 군고구마</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">상세 설명 (수출용)</label>
                    <textarea 
                      value={siteData.product.item1Detail}
                      onChange={(e) => handleChange("product", "item1Detail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-32 resize-none" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 border-b pb-4">제품 2: 태안 쌀</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">상세 설명 (수출용)</label>
                    <textarea 
                      value={siteData.product.item2Detail}
                      onChange={(e) => handleChange("product", "item2Detail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none h-32 resize-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-4">주요 이미지 URL 관리</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">메인 히어로 배경 이미지</label>
                    <input 
                      type="text" 
                      value={siteData.images.hero}
                      onChange={(e) => handleChange("images", "hero", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-seotaean-green outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">회사 소개 이미지</label>
                    <input 
                      type="text" 
                      value={siteData.images.about}
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
                  alert("설정이 저장되었습니다. (브라우저 로컬 저장소)");
                }}
                className="bg-seotaean-green text-white px-10 py-4 rounded-xl font-bold hover:bg-green-800 transition-all shadow-lg flex items-center gap-2"
              >
                <Save size={20} /> 설정 저장하기
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
  const [lang, setLang] = useState<"ko" | "en">("ko");

  // Editable Site Data
  const [siteData, setSiteData] = useState(() => {
    const saved = localStorage.getItem("seotaean_site_data");
    if (saved) return JSON.parse(saved);
    
    return {
      general: {
        phone: "010-6514-3231",
        email: "70percent@gmail.com",
        address: "충청남도 태안군 [나머지 주소]"
      },
      hero: {
        title1: translations.ko.hero.title1,
        title2: translations.ko.hero.title2,
        desc1: translations.ko.hero.desc1
      },
      about: {
        title: translations.ko.about.title2,
        desc: translations.ko.about.desc
      },
      product: {
        item1Detail: translations.ko.product.item1.detail,
        item2Detail: translations.ko.product.item2.detail
      },
      images: {
        hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920",
        about: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
      }
    };
  });

  return (
    <div className="min-h-screen selection:bg-green-100 selection:text-seotaean-green">
      <Navbar onNavigate={setCurrentPage} lang={lang} setLang={setLang} />
      {currentPage === "home" ? (
        <>
          <Hero lang={lang} customData={siteData.hero} customImages={siteData.images} />
          <About onNavigate={setCurrentPage} lang={lang} customData={siteData.about} customImages={siteData.images} />
          <Business lang={lang} />
          <Product lang={lang} customData={siteData.product} />
          <SmartFarm lang={lang} />
          <Contact lang={lang} customData={siteData.general} />
        </>
      ) : currentPage === "admin" ? (
        <Admin lang={lang} siteData={siteData} updateSiteData={setSiteData} />
      ) : (
        <AboutDetail lang={lang} />
      )}
      <Footer lang={lang} customData={siteData.general} />
    </div>
  );
}
