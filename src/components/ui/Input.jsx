import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  className = '',
  inputClassName = '',
  id,
  ...props
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="field-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`input ${error ? 'input-error' : ''} ${inputClassName}`}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
      {error && (
        <p id={errorId} className="error-message" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="body-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          {hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  error,
  hint,
  className = '',
  textareaClassName = '',
  id,
  rows = 6,
  ...props
}, ref) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${textareaId}-error` : undefined;
  const hintId = hint ? `${textareaId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="field-label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={`textarea ${error ? 'input-error' : ''} ${textareaClassName}`}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        rows={rows}
        {...props}
      />
      {error && (
        <p id={errorId} className="error-message" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="body-sm" style={{ color: 'var(--color-muted-foreground)' }}>
          {hint}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export const Label = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => (
  <label ref={ref} className={`field-label ${className}`} {...props}>
    {children}
  </label>
));

Label.displayName = 'Label';

export default Input;