import { LandingPage, ProblemCardItem } from '@/types/landing-page';

export const DEMO_PROBLEMS: ProblemCardItem[] = [
  {
    id: 'p1',
    title: 'शुरुआत कहाँ से करें?',
    description: 'ऑनलाइन इनकम शुरू करने की इच्छा है, लेकिन सही रोडमैप और प्रोडक्ट्स की जानकारी न होने से समय बर्बाद होता है।',
    icon: 'HelpCircle'
  },
  {
    id: 'p2',
    title: 'सही Resources नहीं मिलते',
    description: 'इंटरनेट पर हाई-क्वालिटी एडिटेबल टेम्पलेट्स, रील्स और एसेट्स को खोजना और इकट्ठा करना बहुत मुश्किल है।',
    icon: 'Search'
  },
  {
    id: 'p3',
    title: 'Content बनाने में समय लगता है',
    description: 'रोजाना स्क्रैच से नए वीडियो, ग्राफिक्स और पोस्ट्स बनाने में हफ्तों का कीमती समय निकल जाता है।',
    icon: 'Clock'
  },
  {
    id: 'p4',
    title: 'Premium Tools महंगे हैं',
    description: 'कैनवा, Adobe सॉफ्टवेयर और AI टूल्स के भारी सब्सक्रिप्शन फीस देना हर किसी के लिए संभव नहीं होता।',
    icon: 'DollarSign'
  },
  {
    id: 'p5',
    title: 'Skills सीखने में परेशानी',
    description: 'जटिल टेक्निकल स्किल्स और एडवांस्ड वीडियो एडिटिंग सीखने में महीनों का वक्त और पैसा लगता है।',
    icon: 'BookOpen'
  },
  {
    id: 'p6',
    title: 'Consistency बनाए रखना मुश्किल है',
    description: 'कंटेंट की कमी के कारण यूट्यूब और इंस्टाग्राम पर नियमित रूप से पोस्ट करना बहुत कठिन हो जाता है।',
    icon: 'TrendingDown'
  }
];

export const DEMO_LANDING_PAGE: LandingPage = {
  id: 'lp-default-001',
  name: 'PLNBIZZ Digital Product & Video Bundle',
  slug: 'ultimate-bundle',
  status: 'published',
  hero: {
    badge: '🔥 हजारों Premium Digital Resources — सिर्फ ₹109 में!',
    title: 'दूसरों को Online कमाते देखते रहोगे या खुद शुरुआत करोगे?',
    highlightedTitle: '2026 खत्म होने से पहले अपनी Digital Income की शुरुआत करो!',
    description: 'AI Videos बनाओ, YouTube पर Upload करो और कमाई की शुरुआत करो — या इन Premium Digital Resources को Resell करके अपना Online Income Source शुरू करो!',
    buttonText: '👉 अभी ₹109 में Bundle लें',
    buttonUrl: 'https://checkout.example.com/pay/109',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  productName: 'PLNBIZZ Digital Product & Video Bundle',
  productImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  headline: 'दूसरों को Online कमाते देखते रहोगे या खुद शुरुआत करोगे?',
  mainHeading: '2026 खत्म होने से पहले अपनी Digital Income की शुरुआत करो!',
  description: 'AI Videos बनाओ, YouTube पर Upload करो और कमाई की शुरुआत करो — या इन Premium Digital Resources को Resell करके अपना Online Income Source शुरू करो!',
  price: 109,
  oldPrice: 999,
  offerText: '🔥 हजारों Premium Digital Resources — सिर्फ ₹109 में!',
  ctaText: '👉 अभी ₹109 में Bundle लें',
  externalPaymentUrl: 'https://checkout.example.com/pay/109',
  createdAt: '2026-08-01',
  updatedAt: '2026-08-30',
  metaTitle: 'PLNBIZZ Premium Digital Bundle — All-in-One Resources',
  metaDescription: 'हजारों Premium Digital Resources, Faceless Reels, Canva Templates और AI Prompts सिर्फ ₹109 में।',
  
  features: [
    {
      id: 'f1',
      title: '100% Ready-to-Use Assets',
      description: 'सभी फाइल्स तुरंत डाउनलोड करें और सीधे उपयोग करें।',
      icon: 'Zap'
    },
    {
      id: 'f2',
      title: 'Master Resell Rights (MRR)',
      description: 'डिजिटल रिसोर्सेज को रीसेल करके 100% प्रॉफिट कमाएं।',
      icon: 'DollarSign'
    },
    {
      id: 'f3',
      title: 'Lifetime Cloud Access',
      description: 'एक बार ₹109 दें और जिंदगी भर एक्सेस पाएं।',
      icon: 'Cloud'
    },
    {
      id: 'f4',
      title: '2026 Updated Content',
      description: 'लेटेस्ट AI ट्रेंड्स और मॉडर्न डिजाइन टेम्पलेट्स।',
      icon: 'Sparkles'
    }
  ],

  benefits: [
    {
      id: 'b1',
      number: '01',
      title: '50,000+ डिजिटल रिसोर्सेज',
      description: 'एक ही पैकेज में आपको विशाल 4K और HD डिजिटल फाइल्स का संग्रह मिलता है।'
    },
    {
      id: 'b2',
      number: '02',
      title: '100% Master Resell Rights (MRR)',
      description: 'इन एसेट्स को अपना ब्रांड नाम देकर बेचें और 100% कमाई अपनी जेब में रखें।'
    },
    {
      id: 'b3',
      number: '03',
      title: 'ऑल-इन-वन बंडल कलेक्शन',
      description: 'कैनवा, फोटोशॉप, प्रीमियर प्रो और एआई टूल्स सब कुछ एक व्यवस्थित जगह पर।'
    },
    {
      id: 'b4',
      number: '04',
      title: '4K और HD रेजोल्यूशन एसेट्स',
      description: 'प्रोफेशनल क्वालिटी वीडियोज और थंबनेल्स जो दर्शकों को तुरंत आकर्षित करते हैं।'
    },
    {
      id: 'b5',
      number: '05',
      title: 'AI और ऑटोमेशन गाइड्स',
      description: '16,000+ प्रॉम्प्ट्स की मदद से अपने रोजाना के काम को 10x तेज बनाएं।'
    },
    {
      id: 'b6',
      number: '06',
      title: 'क्रिएटर्स और एजेंसियों के लिए परफेक्ट',
      description: 'चाहे आप नए हों या अनुभवी, यह बंडल आपके हफ्तों का समय बचाएगा।'
    },
    {
      id: 'b7',
      number: '07',
      title: 'लाइफटाइम Google Drive एक्सेस',
      description: 'बिना किसी मासिक शुल्क के जिंदगी भर डाउनलोड और उपयोग की पूरी आजादी।'
    }
  ],

  products: [
    {
      id: 'pi1',
      number: '01',
      title: 'Gym Workout Animation Videos',
      description: 'हाई-क्वालिटी 3D वर्कआउट एनीमेशन रील्स जो सोशल मीडिया पर तेजी से वायरल होती हैं।',
      shortDescription: 'हाई-क्वालिटी 3D वर्कआउट एनीमेशन रील्स जो सोशल मीडिया पर तेजी से वायरल होती हैं।',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 499,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi2',
      number: '02',
      title: '5000GB+ Graphic Design Bundle',
      description: 'PSD, AI, EPS, PNG का विशाल संग्रह — बैनर्स, पोस्टर्स और ब्रांडिंग एसेट्स।',
      shortDescription: 'PSD, AI, EPS, PNG का विशाल संग्रह — बैनर्स, पोस्टर्स और ब्रांडिंग एसेट्स।',
      badge: 'Huge Pack',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 999,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi3',
      number: '03',
      title: 'All-in-One Video Editing Assets',
      description: 'Transitions, Sound Effects, Overlays, Motion Graphics और Cinematic LUTs।',
      shortDescription: 'Transitions, Sound Effects, Overlays, Motion Graphics और Cinematic LUTs।',
      badge: 'Pro Pack',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 799,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi4',
      number: '04',
      title: 'Premiere Pro Presets',
      description: 'रेडी-टू-यूज प्रीमियर प्रो प्रोजेक्ट्स, लोअर थर्ड्स और टाइटल एनिमेशन टेम्पलेट्स।',
      shortDescription: 'रेडी-टू-यूज प्रीमियर प्रो प्रोजेक्ट्स, लोअर थर्ड्स और टाइटल एनिमेशन टेम्पलेट्स।',
      badge: 'Editing',
      image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 399,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi5',
      number: '05',
      title: 'After Effects VFX Templates',
      description: '3D लोगो इंट्रो, 4K पार्टिकल इफ़ेक्ट्स और सिनेमाटिक इंट्रो प्रोजेक्ट्स।',
      shortDescription: '3D लोगो इंट्रो, 4K पार्टिकल इफ़ेक्ट्स और सिनेमाटिक इंट्रो प्रोजेक्ट्स।',
      badge: 'VFX',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 599,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi6',
      number: '06',
      title: 'Photoshop Design Elements',
      description: '10,000+ PSD थंबनेल्स, कटआउट्स, ब्रशेस और बैकग्राउंड टेक्सचर्स।',
      shortDescription: '10,000+ PSD थंबनेल्स, कटआउट्स, ब्रशेस और बैकग्राउंड टेक्सचर्स।',
      badge: 'PSD Assets',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 499,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi7',
      number: '07',
      title: '1000+ Video Courses',
      description: 'डिजिटल मार्केटिंग, वीडियो एडिटिंग, ग्राफिक डिजाइन और AI टूल्स पर हिंदी गाइड्स।',
      shortDescription: 'डिजिटल मार्केटिंग, वीडियो एडिटिंग, ग्राफिक डिजाइन और AI टूल्स पर हिंदी गाइड्स।',
      badge: 'Courses',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 1299,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi8',
      number: '08',
      title: '20,000+ Canva Templates',
      description: 'फुल्ली एडिटेबल कैनवा टेम्पलेट्स — सोशल मीडिया पोस्ट, स्टोरीज और ईबुक्स।',
      shortDescription: 'फुल्ली एडिटेबल कैनवा टेम्पलेट्स — सोशल मीडिया पोस्ट, स्टोरीज और ईबुक्स।',
      badge: 'Editable',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 699,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi9',
      number: '09',
      title: 'Faceless Reels Bundle',
      description: 'बिना चेहरा दिखाए वायरल रील्स बनाएं — मोटिवेशनल, कार्स, एआई अवतार और लग्जरी।',
      shortDescription: 'बिना चेहरा दिखाए वायरल रील्स बनाएं — मोटिवेशनल, कार्स, एआई अवतार और लग्जरी।',
      badge: 'Trending',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 499,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi10',
      number: '10',
      title: 'Complete Digital Marketing Course',
      description: 'Meta Ads, Google Ads, SEO, Email Marketing और Affiliate Mastery।',
      shortDescription: 'Meta Ads, Google Ads, SEO, Email Marketing और Affiliate Mastery।',
      badge: 'Mastery',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 899,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi11',
      number: '11',
      title: 'Ultimate eBook Bundle',
      description: '10,000+ ई-बुक्स — बिजनेस, माइंडसेट, सेलिंग और पर्सनल डेवलपमेंट।',
      shortDescription: '10,000+ ई-बुक्स — बिजनेस, माइंडसेट, सेलिंग और पर्सनल डेवलपमेंट।',
      badge: 'eBooks',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 399,
      pricingType: 'SEPARATE_PURCHASE',
      separateCheckoutUrl: 'https://checkout.example.com/pay/ebooks-399'
    },
    {
      id: 'pi12',
      number: '12',
      title: '16,000+ ChatGPT Prompts',
      description: 'कॉपीराइटिंग, कोडिंग, मार्केटिंग और बिजनेस स्ट्रैटेजी के रेडी प्रॉम्प्ट्स।',
      shortDescription: 'कॉपीराइटिंग, कोडिंग, मार्केटिंग और बिजनेस स्ट्रैटेजी के रेडी प्रॉम्प्ट्स।',
      badge: 'AI Prompts',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 299,
      pricingType: 'COMBO_INCLUDED'
    },
    {
      id: 'pi13',
      number: '13',
      title: 'Tech & AI Resources',
      description: 'एआई टूल्स डायरेक्टरी, वेबसाइट टेम्पलेट्स, ऑटोमेशन कोड्स और डेवलपर किट्स।',
      shortDescription: 'एआई टूल्स डायरेक्टरी, वेबसाइट टेम्पलेट्स, ऑटोमेशन कोड्स और डेवलपर किट्स।',
      badge: 'Tech AI',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      price: 109,
      originalPrice: 999,
      buttonText: 'Get Bundle',
      buttonUrl: 'https://checkout.example.com/pay/109',
      individualPrice: 599,
      pricingType: 'COMBO_INCLUDED'
    }
  ],

  previewImages: [
    {
      id: 'img1',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      caption: '3D & AI Video Editing Assets Preview',
      altText: 'Video editing assets bundle preview'
    },
    {
      id: 'img2',
      url: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
      caption: '20,000+ Canva Editable Templates Bundle',
      altText: 'Canva templates bundle preview'
    },
    {
      id: 'img3',
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Premiere Pro & After Effects VFX Pack',
      altText: 'Video presets and effects preview'
    },
    {
      id: 'img4',
      url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80',
      caption: '16,000+ Professional ChatGPT Prompts Library',
      altText: 'ChatGPT prompts preview'
    }
  ],

  faq: [
    {
      id: 'faq1',
      question: 'क्या मुझे तुरंत access मिलेगा?',
      answer: 'हां! जैसे ही आपका ₹109 का भुगतान पूरा होगा, आपको स्क्रीन पर तुरंत Google Drive एक्सेस लिंक और आपके ई-मेल पर डाउनलोड लिंक मिल जाएगी।'
    },
    {
      id: 'faq2',
      question: 'क्या यह mobile पर काम करेगा?',
      answer: 'बिल्कुल! इसमें शामिल कैनवा टेम्पलेट्स, ई-बुक्स, रील्स और AI प्रॉम्प्ट्स को आप अपने मोबाइल फोन पर आसानी से उपयोग कर सकते हैं।'
    },
    {
      id: 'faq3',
      question: 'मुझे Bundle कैसे मिलेगा?',
      answer: 'सफल भुगतान के बाद आपको एक सुरक्षित Google Drive फोल्डर का डायरेक्ट लिंक मिलेगा जिसे आप अपने फोन या कंप्यूटर में सेव कर सकते हैं।'
    },
    {
      id: 'faq4',
      question: 'क्या payment के बाद download करता येईल?',
      answer: 'होय, पेमेंट पूर्ण होताच तुम्हाला सर्व फाइल्स त्वरित डाउनलोड आणि लाइफटाइम सेव्ह करण्याचा पर्याय मिळेल।'
    }
  ],

  testimonials: [
    {
      id: 't1',
      name: 'राहुल शर्मा',
      role: 'Content Creator',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      content: 'सिर्फ ₹109 में इतना सारा प्रीमियम कंटेंट मिलना अविश्वसनीय है! रील्स बंडल से मेरे इंस्टाग्राम अकाउंट की ग्रोथ काफी तेज हो गई है।',
      rating: 5
    },
    {
      id: 't2',
      name: 'अमित वर्मा',
      role: 'Digital Marketer',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      content: 'Canva टेम्पलेट्स और ChatGPT प्रॉम्प्ट्स ने मेरा हफ्तों का काम मिनटों में कर दिया। बहुत ही बेहतरीन बंडल है।',
      rating: 5
    },
    {
      id: 't3',
      name: 'प्रिया पटेल',
      role: 'Freelance Graphic Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      content: 'वीडियो एडिटिंग एसेट्स और प्रीसेट्स का क्वालिटी लेवल टॉप-नॉच है। मेरे क्लाइंट्स को मेरा काम बहुत पसंद आ रहा है।',
      rating: 5
    }
  ]
};

export const MOCK_ADMIN_LANDING_PAGES: LandingPage[] = [
  DEMO_LANDING_PAGE,
  {
    ...DEMO_LANDING_PAGE,
    id: 'lp-faceless-002',
    name: 'Faceless Reels Master Bundle',
    productName: 'Faceless Reels Master Bundle',
    slug: 'faceless-reels',
    status: 'published',
    price: 149,
    oldPrice: 1299,
    createdAt: '2026-08-15',
    updatedAt: '2026-08-28'
  },
  {
    ...DEMO_LANDING_PAGE,
    id: 'lp-canva-003',
    name: '20,000+ Canva Editable Templates',
    productName: '20,000+ Canva Editable Templates',
    slug: 'canva-templates',
    status: 'draft',
    price: 99,
    oldPrice: 799,
    createdAt: '2026-08-20',
    updatedAt: '2026-08-29'
  },
  {
    ...DEMO_LANDING_PAGE,
    id: 'lp-chatgpt-004',
    name: '16,000+ Super ChatGPT Prompts',
    productName: '16,000+ Super ChatGPT Prompts',
    slug: 'chatgpt-prompts',
    status: 'draft',
    price: 79,
    oldPrice: 499,
    createdAt: '2026-08-10',
    updatedAt: '2026-08-12'
  }
];
