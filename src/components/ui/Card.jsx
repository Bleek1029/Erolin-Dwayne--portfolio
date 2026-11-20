import { forwardRef } from 'react';
import { motion } from 'motion/react';

const Card = forwardRef(({
  children,
  variant = 'default',
  hover = false,
  interactive = false,
  padded = true,
  className = '',
  style = {},
  ...props
}, ref) => {
  const baseClasses = 'card';
  const variantClasses = {
    default: '',
    padded: 'card-padded',
  };
  const hoverClasses = hover ? 'card-hover' : '';
  const interactiveClasses = interactive ? 'card-interactive' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    interactiveClasses,
    padded && !variantClasses[variant] ? 'card-padded' : '',
    className,
  ].filter(Boolean).join(' ');

  const Component = interactive ? motion.div : 'div';

  return (
    <Component
      ref={ref}
      className={classes}
      style={style}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export const CardHeader = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <div
    ref={ref}
    className={`flex flex-col gap-2 ${className}`}
    style={{ padding: 'var(--space-6) var(--space-6) 0' }}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={`h3 ${className}`}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <p
    ref={ref}
    className={`body-sm ${className}`}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <div
    ref={ref}
    className={` ${className}`}
    style={{ padding: 'var(--space-6)' }}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <div
    ref={ref}
    className={`flex items-center gap-4 ${className}`}
    style={{
      padding: '0 var(--space-6) var(--space-6)',
      borderTop: '1px solid var(--color-hairline)',
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
    }}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export default Card;