'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LandingPage, LandingProduct, PreviewImage, TestimonialItem, LandingPageStatus } from '@/types/landing-page';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  createLandingPage,
  updateLandingPage,
  checkSlugExists,
} from '@/lib/firestore';
import {
  Save,
  Eye,
  Send,
  Package,
  DollarSign,
  Globe,
  Plus,
  Trash2,
  Heading,
  ShoppingBag,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  MessageSquareQuote,
} from 'lucide-react';

interface LandingPageFormProps {
  initialData?: LandingPage;
  isEdit?: boolean;
}

export const LandingPageForm: React.FC<LandingPageFormProps> = ({
  initialData,
  isEdit = false,
}) => {
  const router = useRouter();

  const landingId = initialData?.id || `lp-${Date.now()}`;

  const [name, setName] = useState(initialData?.name || initialData?.productName || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');

  // Hero Fields
  const [heroBadge, setHeroBadge] = useState(
    initialData?.hero?.badge || initialData?.offerText || '🔥 Limited Premium Digital Bundle'
  );
  const [heroTitle, setHeroTitle] = useState(
    initialData?.hero?.title || initialData?.headline || 'दूसरों को Online कमाते देखते रहोगे या खुद शुरुआत करोगे?'
  );
  const [heroHighlightedTitle, setHeroHighlightedTitle] = useState(
    initialData?.hero?.highlightedTitle || initialData?.mainHeading || '2026 खत्म होने से पहले अपनी Digital Income की शुरुआत करो!'
  );
  const [heroDescription, setHeroDescription] = useState(
    initialData?.hero?.description || initialData?.description || ''
  );
  const [heroButtonText, setHeroButtonText] = useState(
    initialData?.hero?.buttonText || initialData?.ctaText || 'BUY NOW'
  );
  const [heroButtonUrl, setHeroButtonUrl] = useState(
    initialData?.hero?.buttonUrl || initialData?.externalPaymentUrl || 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-'
  );
  const [heroImage, setHeroImage] = useState(
    initialData?.hero?.heroImage || initialData?.productImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  );
  const [heroImageStoragePath, setHeroImageStoragePath] = useState(
    initialData?.hero?.heroImageStoragePath || ''
  );

  // Products Manager
  const [products, setProducts] = useState<LandingProduct[]>(
    initialData?.products || [
      {
        id: 'p1',
        number: '01',
        title: 'Gym Workout Animation Videos',
        description: '3D workout animations for viral reels.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
        price: 20,
        originalPrice: 999,
        buttonText: 'BUY NOW',
        buttonUrl: 'https://checkout.example.com/pay/20',
        individualPrice: 499,
        pricingType: 'COMBO_INCLUDED',
      },
    ]
  );

  // Preview Images Gallery (Requirement 6)
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>(
    initialData?.previewImages || [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
        caption: '3D & AI Video Editing Assets Preview',
      },
    ]
  );

  // Testimonials Manager (Requirement 7)
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(
    initialData?.testimonials || [
      {
        id: 't1',
        name: 'राहुल शर्मा',
        role: 'Content Creator',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'सिर्फ ₹20 में इतना सारा प्रीमियम कंटेंट मिलना अविश्वसनीय है!',
        rating: 5,
      },
    ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleProductChange = (index: number, field: keyof LandingProduct, value: any) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddProduct = () => {
    const newProduct: LandingProduct = {
      id: `p-${Date.now()}`,
      number: String(products.length + 1).padStart(2, '0'),
      title: 'New Digital Resource',
      description: 'Short overview of resource...',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      price: 20,
      originalPrice: 999,
      buttonText: 'BUY NOW',
      buttonUrl: 'https://superprofile.bio/vp/🔥-50-000--premium-digital-resources-—-सिर्फ-₹20-में-',
      individualPrice: 299,
      pricingType: 'COMBO_INCLUDED',
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPreviewImage = () => {
    const newPreview: PreviewImage = {
      id: `img-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      caption: 'Digital Resource Asset Preview',
    };
    setPreviewImages((prev) => [...prev, newPreview]);
  };

  const handlePreviewImageChange = (index: number, field: keyof PreviewImage, value: any) => {
    setPreviewImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleDeletePreviewImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = async (targetStatus: 'draft' | 'published'): Promise<boolean> => {
    setError(null);

    if (!name.trim()) {
      setError('Landing Page Name is required.');
      return false;
    }

    if (!slug.trim()) {
      setError('Slug / Route is required.');
      return false;
    }

    const isSlugTaken = await checkSlugExists(slug, isEdit ? initialData?.id : undefined);
    if (isSlugTaken) {
      setError('This URL slug is already in use. Please choose another one.');
      return false;
    }

    if (targetStatus === 'published') {
      if (!heroTitle.trim()) {
        setError('Hero Title is required to publish.');
        return false;
      }

      if (!heroDescription.trim()) {
        setError('Hero Description is required to publish.');
        return false;
      }

      if (products.length === 0) {
        setError('At least one product is required to publish.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (targetStatus: 'draft' | 'published') => {
    setLoading(true);

    try {
      const isValid = await validateForm(targetStatus);
      if (!isValid) {
        setLoading(false);
        return;
      }

      const payload: Partial<LandingPage> = {
        name,
        slug: slug.toLowerCase().trim(),
        status: targetStatus,
        hero: {
          badge: heroBadge,
          title: heroTitle,
          highlightedTitle: heroHighlightedTitle,
          description: heroDescription,
          buttonText: heroButtonText,
          buttonUrl: heroButtonUrl,
          heroImage,
          heroImageStoragePath,
        },
        products,
        previewImages,
        testimonials,
        metaTitle,
        metaDescription,
      };

      if (isEdit && initialData?.id) {
        await updateLandingPage(initialData.id, payload);
        setToast('Landing page updated successfully.');
      } else {
        await createLandingPage(payload);
        setToast(`Landing page ${targetStatus === 'published' ? 'published' : 'created'} successfully.`);
      }

      setTimeout(() => {
        router.push('/admin/landing-pages');
      }, 1500);
    } catch (err: any) {
      console.error('Firestore save failed:', err);
      setError('Failed to save landing page. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 font-admin lang-en">
      
      {/* Toast Notification */}
      {toast && (
        <div className="p-4 rounded-xl bg-[#071A2A] text-[#D89A20] border-2 border-[#D89A20] font-bold text-sm shadow-xl flex items-center justify-between">
          <span>{toast}</span>
          <span className="text-xs bg-[#D89A20] text-[#071A2A] px-2.5 py-1 rounded-md font-black">Storage & Firestore</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E8C77A] shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#071A2A]">
            {isEdit ? `Edit Landing Page` : 'Create New Landing Page'}
          </h2>
          <p className="text-xs text-[#6B6255]">
            Configure digital bundle details, pricing, copy, images, and Firebase Storage files
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
            className="border border-[#E8C77A]"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
            <span>Save Draft</span>
          </Button>

          {slug && (
            <a href={`/lp/${slug}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1.5" />
                <span>Preview</span>
              </Button>
            </a>
          )}

          <Button
            type="button"
            variant="gold"
            size="sm"
            disabled={loading}
            onClick={() => handleSubmit('published')}
            className="bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-extrabold"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Send className="w-4 h-4 mr-1.5" />}
            <span>Publish Page</span>
          </Button>
        </div>
      </div>

      {/* CMS Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        
        {/* Section 1: Page Details & Slug */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8C77A]/60 pb-3">
            <Package className="w-5 h-5 text-[#D89A20]" />
            <h3 className="text-lg font-bold text-[#071A2A]">1. Landing Page Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Landing Page Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Digital Bundle 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-semibold text-[#071A2A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Slug / Public Route *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 rounded-l-xl bg-[#FFF8E8] border border-r-0 border-[#E8C77A] text-xs font-mono text-slate-600">
                  /lp/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="digital-bundle"
                  className="w-full px-4 py-2.5 rounded-r-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-mono font-bold text-[#071A2A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Hero Section & Hero Image Upload (Requirement 4 & 25) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8C77A]/60 pb-3">
            <Heading className="w-5 h-5 text-[#D89A20]" />
            <h3 className="text-lg font-bold text-[#071A2A]">2. Hero Section</h3>
          </div>

          <div className="space-y-6">
            
            {/* Hero Image Upload */}
            <ImageUploader
              label="Hero Product Image Upload (Firebase Storage)"
              value={heroImage}
              storagePath={heroImageStoragePath}
              folderPath={`landing-pages/${landingId}/hero`}
              onUploadSuccess={(res) => {
                setHeroImage(res.url);
                setHeroImageStoragePath(res.storagePath);
              }}
              onRemove={() => {
                setHeroImage('');
                setHeroImageStoragePath('');
              }}
            />

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Hero Offer Badge
              </label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-bold text-[#D89A20]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Small Hero Title
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-bold text-[#071A2A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Highlighted Main Heading (Hindi Editorial Serif)
              </label>
              <textarea
                rows={2}
                value={heroHighlightedTitle}
                onChange={(e) => setHeroHighlightedTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-bold text-[#071A2A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Hero Description
              </label>
              <textarea
                rows={3}
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm text-[#6B6255]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                  Hero Button Text
                </label>
                <input
                  type="text"
                  value={heroButtonText}
                  onChange={(e) => setHeroButtonText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-bold text-[#D89A20]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                  Hero External Button URL
                </label>
                <input
                  type="url"
                  value={heroButtonUrl}
                  onChange={(e) => setHeroButtonUrl(e.target.value)}
                  placeholder="https://checkout.example.com/pay/109"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Products Collection & Product Image Uploads (Requirement 5 & 24) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8C77A]/60 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D89A20]" />
              <h3 className="text-lg font-bold text-[#071A2A]">
                3. Products Collection & Storage Uploads
              </h3>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddProduct}
              className="text-xs border-[#E8C77A] font-bold"
            >
              <Plus className="w-4 h-4 mr-1 text-[#D89A20]" />
              <span>+ Add Product</span>
            </Button>
          </div>

          <div className="space-y-6">
            {products.map((p, idx) => (
              <div
                key={p.id || idx}
                className="p-5 rounded-2xl border border-[#E8C77A] bg-[#FFF8E8] space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-[#071A2A] text-[#D89A20] px-3 py-1 rounded-md">
                    Product #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(idx)}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Product</span>
                  </button>
                </div>

                {/* Product Image Upload */}
                <ImageUploader
                  label={`Product #${idx + 1} Image Upload`}
                  value={p.image}
                  storagePath={p.imageStoragePath}
                  folderPath={`landing-pages/${landingId}/products`}
                  onUploadSuccess={(res) => {
                    handleProductChange(idx, 'image', res.url);
                    handleProductChange(idx, 'imageStoragePath', res.storagePath);
                  }}
                  onRemove={() => {
                    handleProductChange(idx, 'image', '');
                    handleProductChange(idx, 'imageStoragePath', '');
                  }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#6B6255]">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={p.title}
                      onChange={(e) => handleProductChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8C77A] bg-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#6B6255]">Individual Value (₹)</label>
                    <input
                      type="number"
                      value={p.individualPrice ?? 499}
                      onChange={(e) => handleProductChange(idx, 'individualPrice', Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#E8C77A] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#6B6255]">Description</label>
                  <textarea
                    rows={2}
                    value={p.description || p.shortDescription || ''}
                    onChange={(e) => {
                      handleProductChange(idx, 'description', e.target.value);
                      handleProductChange(idx, 'shortDescription', e.target.value);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8C77A] bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#6B6255]">Pricing Option</label>
                    <select
                      value={p.pricingType || 'COMBO_INCLUDED'}
                      onChange={(e) => handleProductChange(idx, 'pricingType', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#E8C77A] bg-white"
                    >
                      <option value="COMBO_INCLUDED">Combo Included (Free in Bundle)</option>
                      <option value="SEPARATE_PURCHASE">Separate Purchase Option</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#6B6255]">Button Text</label>
                    <input
                      type="text"
                      value={p.buttonText || 'Get Bundle'}
                      onChange={(e) => handleProductChange(idx, 'buttonText', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-[#E8C77A] bg-white text-[#D89A20]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#6B6255]">Button URL *</label>
                    <input
                      type="url"
                      required
                      value={p.buttonUrl || heroButtonUrl}
                      onChange={(e) => handleProductChange(idx, 'buttonUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8C77A] bg-white font-mono"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Preview Gallery Uploads (Requirement 6 & 26) */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8C77A]/60 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#D89A20]" />
              <h3 className="text-lg font-bold text-[#071A2A]">
                4. Preview Images Gallery
              </h3>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddPreviewImage}
              className="text-xs border-[#E8C77A] font-bold"
            >
              <Plus className="w-4 h-4 mr-1 text-[#D89A20]" />
              <span>+ Add Preview Image</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previewImages.map((img, idx) => (
              <div
                key={img.id || idx}
                className="p-4 rounded-2xl border border-[#E8C77A] bg-[#FFF8E8] space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B6255]">Preview Image #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeletePreviewImage(idx)}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <ImageUploader
                  label=""
                  value={img.url}
                  storagePath={img.storagePath}
                  folderPath={`landing-pages/${landingId}/previews`}
                  onUploadSuccess={(res) => {
                    handlePreviewImageChange(idx, 'url', res.url);
                    handlePreviewImageChange(idx, 'storagePath', res.storagePath);
                  }}
                  onRemove={() => {
                    handlePreviewImageChange(idx, 'url', '');
                    handlePreviewImageChange(idx, 'storagePath', '');
                  }}
                />

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#6B6255]">Caption</label>
                  <input
                    type="text"
                    value={img.caption || ''}
                    onChange={(e) => handlePreviewImageChange(idx, 'caption', e.target.value)}
                    placeholder="e.g. 3D Video Editing Assets Preview"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8C77A] bg-white font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: SEO Details */}
        <div className="bg-white rounded-2xl border border-[#E8C77A] p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8C77A]/60 pb-3">
            <Globe className="w-5 h-5 text-[#D89A20]" />
            <h3 className="text-lg font-bold text-[#071A2A]">5. SEO Details</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="PLNBIZZ Premium Digital Bundle"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-[#6B6255] tracking-wider">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta description for search engines..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8C77A] focus:ring-2 focus:ring-[#D89A20] focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-4 bg-white p-5 rounded-2xl border border-[#E8C77A]">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/landing-pages')}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="navy"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
            className="bg-[#071A2A] text-white"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            variant="gold"
            disabled={loading}
            onClick={() => handleSubmit('published')}
            className="bg-[#D89A20] hover:bg-[#E7B33E] text-[#071A2A] font-extrabold"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            <span>Publish Landing Page</span>
          </Button>
        </div>

      </form>

    </div>
  );
};
