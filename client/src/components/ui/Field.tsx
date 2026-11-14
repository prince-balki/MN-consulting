import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { cn } from "../../lib/utils";

interface WrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

function Wrapper({ id, label, hint, error, required, children }: WrapperProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="ml-1 text-gold-dark">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[12px] text-steel">{hint}</p>
      ) : null}
    </div>
  );
}

interface BaseFieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function Input({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <Wrapper
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <input
        id={inputId}
        className={cn("field-input", error && "border-red-500", className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </Wrapper>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const generated = useId();
  const areaId = id ?? generated;
  return (
    <Wrapper
      id={areaId}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <textarea
        id={areaId}
        className={cn("field-area", error && "border-red-500", className)}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </Wrapper>
  );
}

export function Select({
  label,
  hint,
  error,
  className,
  id,
  children,
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const generated = useId();
  const selectId = id ?? generated;
  return (
    <Wrapper
      id={selectId}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
    >
      <select
        id={selectId}
        className={cn("field-input cursor-pointer appearance-none", className)}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {children}
      </select>
    </Wrapper>
  );
}
