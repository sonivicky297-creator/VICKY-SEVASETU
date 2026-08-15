import React from 'react';
import {
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Refrigerator,
  Sparkles,
  Laptop,
  Flame,
  Boxes,
  Camera,
  GraduationCap,
  Car,
  Smile,
  HelpCircle,
} from 'lucide-react';

export const renderCategoryIcon = (iconName: string, props: React.ComponentProps<typeof Wrench> = { className: "w-6 h-6" }) => {
  switch (iconName?.toLowerCase()) {
    case 'zap':
      return <Zap {...props} />;
    case 'wrench':
      return <Wrench {...props} />;
    case 'hammer':
      return <Hammer {...props} />;
    case 'paintbrush':
      return <Paintbrush {...props} />;
    case 'refrigerator':
      return <Refrigerator {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'laptop':
      return <Laptop {...props} />;
    case 'flame':
      return <Flame {...props} />;
    case 'boxes':
      return <Boxes {...props} />;
    case 'trowel':
    case 'mason':
      return <Hammer {...props} />;
    case 'camera':
      return <Camera {...props} />;
    case 'graduationcap':
      return <GraduationCap {...props} />;
    case 'car':
      return <Car {...props} />;
    case 'smile':
      return <Smile {...props} />;
    default:
      return <Wrench {...props} />;
  }
};
