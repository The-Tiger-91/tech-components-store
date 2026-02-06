interface ProductIconProps {
  category: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CATEGORY_ICONS: Record<string, string> = {
  ram: '💾',
  motherboard: '🔲',
  cooling: '❄️',
  processor: '⚡',
  gpu: '🎮',
  storage: '💿',
};

export default function ProductIcon({ category, size = 'xl' }: ProductIconProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
  };

  const icon = CATEGORY_ICONS[category] || '📦';

  return <span className={sizeClasses[size]}>{icon}</span>;
}
