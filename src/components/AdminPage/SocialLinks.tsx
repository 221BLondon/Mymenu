import React from 'react';
import { Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { RestaurantSettings } from '../../types';

interface SocialLinksProps {
  settings: RestaurantSettings;
  onUpdateSocialLinks: (links: RestaurantSettings['socialLinks']) => void;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ settings, onUpdateSocialLinks }) => {
  const handleChange = (platform: keyof RestaurantSettings['socialLinks'], value: string) => {
    onUpdateSocialLinks({
      ...settings.socialLinks,
      [platform]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-2">
          <Facebook size={20} className="text-blue-600" />
          <input
            type="text"
            value={settings.socialLinks.facebook}
            onChange={(e) => handleChange('facebook', e.target.value)}
            placeholder="Facebook URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Instagram size={20} className="text-pink-600" />
          <input
            type="text"
            value={settings.socialLinks.instagram}
            onChange={(e) => handleChange('instagram', e.target.value)}
            placeholder="Instagram URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Twitter size={20} className="text-blue-400" />
          <input
            type="text"
            value={settings.socialLinks.twitter}
            onChange={(e) => handleChange('twitter', e.target.value)}
            placeholder="Twitter URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Globe size={20} className="text-gray-600" />
          <input
            type="text"
            value={settings.socialLinks.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="Website URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;