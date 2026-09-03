import { PageSection, SectionType, HeroContent, LandingProduct } from '@/types/landing-page';
import { DEMO_LANDING_PAGE } from './mock-data';

export const createNewSection = (type: SectionType, order: number): PageSection => {
  const id = `sec_${type}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  switch (type) {
    case 'hero':
      return {
        id,
        type: 'hero',
        order,
        visible: true,
        data: {
          badge: '🔥 LIMITED TIME OFFER',
          title: 'दूसरों को Online कमाते देखते रहोगे या खुद शुरुआत करोगे?',
          highlightedTitle: '2026 खत्म होने से पहले अपनी Digital Income की शुरुआत करो!',
          description: '5000+ प्रीमियम कैनवा टेम्पलेट्स, रील्स बंडल और डिजिटल रिसोर्सेज का पूरा खजाना!',
          buttonText: 'BUY NOW',
          buttonUrl: 'https://checkout.example.com/pay/20',
          heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        },
      };

    case 'benefits':
      return {
        id,
        type: 'benefits',
        order,
        visible: true,
        data: {
          title: 'यह बंडल क्यों खास है?',
          description: 'आपके काम को 10x तेज करने वाले फीचर्स',
          items: [
            {
              id: 'b1',
              number: '01',
              title: 'रेडी-टू-यूज फाइल्स',
              description: 'बस डाउनलोड करें, एडिट करें और 5 मिनट में इस्तेमाल करें।',
            },
            {
              id: 'b2',
              number: '02',
              title: 'लाइफटाइम एक्सेस',
              description: 'एक बार लें और हमेशा के लिए इस्तेमाल करें। कोई मंथली फीस नहीं।',
            },
            {
              id: 'b3',
              number: '03',
              title: '100% एडिटेबल',
              description: 'कैनवा ऐप या मोबाइल में आसानी से टेक्स्ट और फोटो बदलें।',
            },
          ],
        },
      };

    case 'products':
      return {
        id,
        type: 'products',
        order,
        visible: true,
        data: {
          title: 'बंडल में क्या-क्या मिलेगा?',
          description: 'डिजिटल रिसोर्सेज का पूरा खजाना',
          items: DEMO_LANDING_PAGE.products,
        },
      };

    case 'features':
      return {
        id,
        type: 'features',
        order,
        visible: true,
        data: {
          title: 'प्रीमियम फीचर्स',
          description: 'आपको मिलेंगे ये सभी फायदे',
          items: [
            { id: 'f1', title: 'HD Quality Graphics', description: 'हाई रेजोल्यूशन 4K ग्राफिक्स फाइल्स' },
            { id: 'f2', title: 'Commercial Rights', description: 'क्लाइंट्स के प्रोजेक्ट्स के लिए इस्तेमाल करें' },
          ],
        },
      };

    case 'testimonials':
      return {
        id,
        type: 'testimonials',
        order,
        visible: true,
        data: {
          title: 'हमारे संतुष्ट कस्टमर्स (Testimonials)',
          items: [
            {
              id: 't1',
              name: 'अमित वर्मा',
              role: 'डिजिटल क्रिएटर',
              content: 'बहुत ही शानदार बंडल है! मेरे इंस्टाग्राम रील्स पर व्यूज 10x बढ़ गए हैं।',
              rating: 5,
            },
            {
              id: 't2',
              name: 'पूजा शर्मा',
              role: 'फ्रीलांसर',
              content: 'कैनवा टेम्पलेट्स ने मेरा घंटों का समय बचा लिया। बेस्ट ₹20 इन्वेस्टमेंट!',
              rating: 5,
            },
          ],
        },
      };

    case 'faq':
      return {
        id,
        type: 'faq',
        order,
        visible: true,
        data: {
          title: 'अक्सर पूछे जाने वाले सवाल (FAQ)',
          items: [
            {
              id: 'fq1',
              question: 'पेमेंट के बाद फाइल्स कैसे मिलेंगी?',
              answer: 'पेमेंट पूरा होते ही आपको तुरंत डाउनलोड लिंक और ईमेल एक्सेस मिल जाएगा।',
            },
            {
              id: 'fq2',
              question: 'क्या मैं इसे मोबाइल में इस्तेमाल कर सकता हूँ?',
              answer: 'हाँ! सभी फाइल्स कैनवा ऐप और मोबाइल में आसानी से इस्तेमाल की जा सकती हैं।',
            },
          ],
        },
      };

    case 'offer':
      return {
        id,
        type: 'offer',
        order,
        visible: true,
        data: {
          badge: '🔥 SPECIAL LIMITED TIME OFFER',
          heading: 'आज ही पूरा डिजिटल बंडल ₹20 में पाएं',
          description: 'मूल्य ₹4,999 — आज का विशेष डिस्काउंट ऑफर!',
          price: 20,
          oldPrice: 4999,
          buttonText: 'BUY NOW',
          buttonUrl: 'https://checkout.example.com/pay/20',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        },
      };

    case 'countdown':
      return {
        id,
        type: 'countdown',
        order,
        visible: true,
        data: {
          title: 'विशेष ऑफर समाप्त होने में बचा समय:',
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        },
      };

    case 'image_banner':
      return {
        id,
        type: 'image_banner',
        order,
        visible: true,
        data: {
          heading: 'प्रीमियम डिजिटल एसेट्स',
          description: 'अपने बिजनेस को नई ऊंचाइयों पर ले जाएं',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          buttonText: 'BUY NOW',
          buttonUrl: 'https://checkout.example.com/pay/20',
        },
      };

    case 'video':
      return {
        id,
        type: 'video',
        order,
        visible: true,
        data: {
          title: 'बंडल डेमो वीडियो देखें',
          description: 'देखें कि कैसे आप 5 मिनट में फाइल्स एडिट कर सकते हैं',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
      };

    case 'text_content':
      return {
        id,
        type: 'text_content',
        order,
        visible: true,
        data: {
          heading: 'डिजिटल क्रिएटर क्रांति का हिस्सा बनें',
          content: 'आज के डिजिटल युग में सही टूल्स का होना बेहद जरूरी है। PLNBIZZ आपको वे सभी रिसोर्सेज प्रदान करता है जिनकी मदद से आप तेजी से आगे बढ़ सकते हैं।',
        },
      };

    case 'final_cta':
      return {
        id,
        type: 'final_cta',
        order,
        visible: true,
        data: {
          badge: '⚡ अंतिम मौका',
          heading: 'देर न करें! आज ही अपना बंडल क्लेम करें',
          description: 'ऑफर सीमित समय के लिए ही उपलब्ध है।',
          buttonText: 'BUY NOW',
          buttonUrl: 'https://checkout.example.com/pay/20',
        },
      };

    case 'footer':
      return {
        id,
        type: 'footer',
        order,
        visible: true,
        data: {
          brandName: 'PLNBIZZ',
          description: 'High-converting digital product landing pages.',
          copyright: '© 2026 PLNBIZZ. All rights reserved.',
        },
      };

    default:
      return {
        id,
        type: 'text_content',
        order,
        visible: true,
        data: { heading: 'Section', content: 'Content' },
      };
  }
};

/**
 * Generate default starter sections for new landing pages
 */
export const createDefaultSections = (
  heroContent?: HeroContent,
  productsList?: LandingProduct[]
): PageSection[] => {
  const hero = createNewSection('hero', 0);
  if (heroContent) {
    hero.data = { ...hero.data, ...heroContent };
  }

  const benefits = createNewSection('benefits', 1);

  const products = createNewSection('products', 2);
  if (productsList && productsList.length > 0) {
    products.data.items = productsList;
  }

  const offer = createNewSection('offer', 3);
  const faq = createNewSection('faq', 4);
  const finalCta = createNewSection('final_cta', 5);

  return [hero, benefits, products, offer, faq, finalCta];
};
