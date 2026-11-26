import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, children, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden={props["aria-hidden"] ?? true} {...props}>
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>;
export const ArrowRight = (props: IconProps) => <Icon {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></Icon>;
export const ArrowLeft = (props: IconProps) => <Icon {...props}><path d="M19 12H5m6-6-6 6 6 6" /></Icon>;
export const Check = (props: IconProps) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
export const X = (props: IconProps) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
export const Search = (props: IconProps) => <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></Icon>;
export const Moon = (props: IconProps) => <Icon {...props}><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></Icon>;
export const Sun = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>;
export const RefreshCw = (props: IconProps) => <Icon {...props}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8a7 7 0 0 1 11.6-2L20 8M4 16l2.3 2a7 7 0 0 0 11.6-2" /></Icon>;
export const RotateCcw = (props: IconProps) => <Icon {...props}><path d="M3 7v5h5" /><path d="M4.6 17a8 8 0 1 0 .3-10L3 9" /></Icon>;
export const LoaderCircle = (props: IconProps) => <Icon {...props}><path d="M21 12a9 9 0 1 1-6.2-8.6" /></Icon>;
export const Sparkles = (props: IconProps) => <Icon {...props}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m5 17 .8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8L5 17Z" /></Icon>;
export const Target = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></Icon>;
export const Eraser = (props: IconProps) => <Icon {...props}><path d="m7 21-4-4a2 2 0 0 1 0-3L13 4a2 2 0 0 1 3 0l4 4a2 2 0 0 1 0 3l-7 7H7Z" /><path d="m9 8 7 7M7 21h13" /></Icon>;
export const ShieldCheck = (props: IconProps) => <Icon {...props}><path d="M12 3 4 6v6c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V6l-8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></Icon>;
export const ShieldAlert = (props: IconProps) => <Icon {...props}><path d="M12 3 4 6v6c0 5 3.4 8.3 8 10 4.6-1.7 8-5 8-10V6l-8-3Z" /><path d="M12 8v5m0 3h.01" /></Icon>;
export const TriangleAlert = (props: IconProps) => <Icon {...props}><path d="M10.3 4.2 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 3h.01" /></Icon>;
export const CheckCircle2 = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></Icon>;
export const FlaskConical = (props: IconProps) => <Icon {...props}><path d="M9 3h6M10 3v6l-5.5 9.2A1.8 1.8 0 0 0 6 21h12a1.8 1.8 0 0 0 1.5-2.8L14 9V3" /><path d="M7.5 15h9" /></Icon>;
export const BrainCircuit = (props: IconProps) => <Icon {...props}><path d="M12 5a3 3 0 0 0-5.8-1A3.5 3.5 0 0 0 4 10a3.5 3.5 0 0 0 2 6.4A3 3 0 0 0 12 19V5Z" /><path d="M12 5a3 3 0 0 1 5.8-1A3.5 3.5 0 0 1 20 10a3.5 3.5 0 0 1-2 6.4A3 3 0 0 1 12 19" /><path d="M8 9a3 3 0 0 0 4 2m4-2a3 3 0 0 1-4 2" /></Icon>;
export const Layers3 = (props: IconProps) => <Icon {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></Icon>;
export const ScanLine = (props: IconProps) => <Icon {...props}><path d="M3 7V4h4m10 0h4v3M3 17v3h4m10 0h4v-3M7 12h10" /></Icon>;
export const Database = (props: IconProps) => <Icon {...props}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></Icon>;
export const LockKeyhole = (props: IconProps) => <Icon {...props}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></Icon>;
export const Store = (props: IconProps) => <Icon {...props}><path d="M3 10 5 4h14l2 6" /><path d="M5 10v10h14V10M9 20v-6h6v6" /><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></Icon>;
export const BookOpen = (props: IconProps) => <Icon {...props}><path d="M12 6c-2-2-5-2.5-9-2v15c4-.5 7 0 9 2 2-2 5-2.5 9-2V4c-4-.5-7 0-9 2Z" /><path d="M12 6v15" /></Icon>;
