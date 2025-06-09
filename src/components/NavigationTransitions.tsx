
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: -20,
    scale: 0.98
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransitionWrapper = ({ children, pageKey }: PageTransitionWrapperProps) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pageKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Route loading indicator with progress
interface RouteLoadingIndicatorProps {
  isLoading: boolean;
  progress?: number;
}

export const RouteLoadingIndicator = ({ isLoading, progress = 0 }: RouteLoadingIndicatorProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setDisplayProgress(prev => {
          if (prev < 90) return prev + Math.random() * 20;
          return prev;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setDisplayProgress(100);
      const resetTimer = setTimeout(() => setDisplayProgress(0), 500);
      return () => clearTimeout(resetTimer);
    }
  }, [isLoading]);

  if (!isLoading && displayProgress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-background">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: '0%' }}
        animate={{ width: `${displayProgress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};

// Breadcrumb transitions
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AnimatedBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const AnimatedBreadcrumbs = ({ items }: AnimatedBreadcrumbsProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={`${item.label}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <a 
                href={item.href} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </nav>
  );
};

// Section transitions within pages
interface SectionTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export const SectionTransition = ({ children, delay = 0 }: SectionTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};
