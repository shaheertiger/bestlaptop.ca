import type { SVGProps } from "react";

const base = "h-5 w-5";

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const p: SVGProps<SVGSVGElement> = {
    className: className ?? base,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  };
  switch (name) {
    case "compare":
      return (<svg {...p}><path d="M12 3v18M5 7h4M5 12h4M5 17h4M15 7h4M15 12h4M15 17h4" /></svg>);
    case "table":
      return (<svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M3 14h18M9 4v16" /></svg>);
    case "list":
      return (<svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>);
    case "index":
      return (<svg {...p}><path d="M4 5h16M4 12h10M4 19h16M18 9l3 3-3 3" /></svg>);
    case "graph":
      return (<svg {...p}><path d="M4 19V5M4 19h16M8 16l3-4 3 2 4-6" /></svg>);
    case "pipeline":
      return (<svg {...p}><circle cx="6" cy="12" r="2" /><circle cx="18" cy="12" r="2" /><path d="M8 12h8M12 4v4M12 16v4" /></svg>);
    case "vote":
      return (<svg {...p}><path d="M9 11l3-7 3 7M5 21h14a2 2 0 0 0 2-2v-6H3v6a2 2 0 0 0 2 2Z" /></svg>);
    case "ratings":
      return (<svg {...p}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8L3.5 9.2l5.9-.9Z" /></svg>);
    default:
      return (<svg {...p}><circle cx="12" cy="12" r="9" /></svg>);
  }
}
