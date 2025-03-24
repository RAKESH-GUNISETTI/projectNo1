
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				typing: {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				blink: {
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'hsl(var(--foreground))' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(40px)', opacity: '0' }, // increased from 30px to 40px
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-40px)', opacity: '0' }, // increased from 30px to 40px
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'background-shine': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' }
				},
				'cursor-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
					'50%': { transform: 'scale(1.3)', opacity: '0.5' }
				},
				'blob-move': {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' }
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out', // Slowed from 0.2s to 0.3s
				'accordion-up': 'accordion-up 0.3s ease-out', // Slowed from 0.2s to 0.3s
				'fade-in': 'fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 0.8s to 1.2s
				'fade-out': 'fade-out 0.9s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 0.6s to 0.9s
				'scale-in': 'scale-in 1.2s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 0.8s to 1.2s
				'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
				'slide-up': 'slide-up 1.4s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 1s to 1.4s
				'slide-down': 'slide-down 1.4s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 1s to 1.4s
				'slide-in-right': 'slide-in-right 1.4s cubic-bezier(0.22, 1, 0.36, 1)', // Slowed from 1s to 1.4s
				'slide-out-right': 'slide-out-right 0.9s ease-out', // Slowed from 0.6s to 0.9s
				'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Slowed from 7s to 10s
				'float': 'float 10s ease-in-out infinite', // Slowed from 8s to 10s
				'shimmer': 'shimmer 4s infinite linear', // Slowed from 3s to 4s
				'rotate-slow': 'rotate-slow 15s linear infinite', // Slowed from 12s to 15s
				'background-shine': 'background-shine 13s linear infinite', // Slowed from 10s to 13s
				'cursor-pulse': 'cursor-pulse 4s ease-in-out infinite', // Slowed from 3s to 4s
				'blob-move': 'blob-move 15s infinite ease-in-out',
				'bounce-slow': 'bounce-slow 6s ease-in-out infinite'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width',
				'transform': 'transform',
			},
			transitionDuration: {
				'1500': '1500ms',
				'2000': '2000ms',
				'2500': '2500ms',
				'3000': '3000ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
