import "./globals.css";import "aos/dist/aos.css";
import {Space_Grotesk,JetBrains_Mono} from "next/font/google";
import {ThemeProvider} from "next-themes";
const s=Space_Grotesk({subsets:["latin"],variable:"--f-sans"});
const m=JetBrains_Mono({subsets:["latin"],variable:"--f-mono"});
export const metadata={title:"Ajay | AI Application & Generative AI Developer",description:"Portfolio of Ajay: RAG, LLM apps, AI agents and full-stack engineering."};
export default function L({children}){return(<html lang="en" suppressHydrationWarning><body className={`${s.variable} ${m.variable} font-sans antialiased`}><ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider></body></html>)}
