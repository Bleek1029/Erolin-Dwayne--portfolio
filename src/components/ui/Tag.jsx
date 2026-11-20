const Tag = ({
  children,
  variant = 'default',
  className = '',
  style = {},
  ...props
}) => {
  const variantClasses = {
    default: 'tag',
    primary: 'tag tag-primary',
    success: 'tag tag-success',
    warning: 'tag tag-warning',
    destructive: 'tag tag-destructive',
  };

  const classes = [variantClasses[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes} style={style} {...props}>
      {children}
    </span>
  );
};

export default Tag;