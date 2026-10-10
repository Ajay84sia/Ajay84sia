"use client";
import {useEffect,useRef,useState} from "react";
import emailjs from "@emailjs/browser";
import {motion,AnimatePresence} from "framer-motion";
import AOS from "aos";
import {useTheme} from "next-themes";
import d from "../data/portfolio.json";

const nav=["about","skills","projects","experience","contact"];
const Title=({children,sub})=>(<div className="mb-10" data-aos="fade-up"><h2 className="text-3xl md:text-4xl font-bold tracking-tight">{children}</h2>{sub&&<p className="mt-2 text-mute max-w-xl">{sub}</p>}</div>);
const Chip=({t})=><span className="font-mono text-xs px-2.5 py-1 rounded-md border border-line text-mute">{t}</span>;
const Sec=({id,children})=><section id={id} className="max-w-6xl mx-auto px-5 py-20 scroll-mt-16">{children}</section>;
const Ext=({href,children})=><a href={href} target="_blank" rel="noreferrer" className="text-b hover:underline">{children}</a>;

function Theme(){const{resolvedTheme,setTheme}=useTheme();const[m,setM]=useState(false);useEffect(()=>setM(true),[]);
return <button aria-label="Toggle theme" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} className="w-9 h-9 rounded-full border border-line grid place-items-center hover:border-a transition">{m?(resolvedTheme==="dark"?"☀":"☾"):""}</button>}

function Roles(){const[i,setI]=useState(0);useEffect(()=>{const t=setInterval(()=>setI(x=>(x+1)%d.roles.length),2400);return()=>clearInterval(t)},[]);
return <div className="h-9 md:h-11 overflow-hidden"><AnimatePresence mode="wait"><motion.p key={i} initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-30,opacity:0}} transition={{duration:.35}} className="text-xl md:text-3xl font-semibold grad">{d.roles[i]}</motion.p></AnimatePresence></div>}

function Pipeline(){return(<div className="card p-5 font-mono text-sm w-full max-w-md" style={{boxShadow:"0 0 60px -20px var(--a)"}}>
<div className="flex gap-1.5 mb-4">{["#ff5f57","#febc2e","#28c840"].map(c=><i key={c} className="w-3 h-3 rounded-full" style={{background:c}}/>)}<span className="ml-3 text-xs text-mute">rag_pipeline.py</span></div>
{d.pipeline.map(([k,v],i)=>(<motion.div key={k} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:.6+i*.7}} className="mb-3">
<span className="text-b">{k}</span><span className="text-mute"> &gt; </span><span>{v}</span>
<motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.8+i*.7,duration:.6}} style={{originX:0,background:"linear-gradient(90deg,var(--a),var(--b))"}} className="h-0.5 mt-1.5 rounded"/></motion.div>))}
<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.6}} className="text-mute">done. 3 matches, each with an explanation<span className="animate-pulse">_</span></motion.p></div>)}


const MONO=["github","expo"];
const SLUG={"Python":"python","JavaScript":"javascript","TypeScript":"typescript","React.js":"react","React Native":"react","Node.js":"nodedotjs","Express.js":"express","PostgreSQL":"postgresql","MongoDB":"mongodb","Tailwind CSS":"tailwindcss","Vite":"vite","Git":"git","GitHub":"github","Nginx":"nginx","RabbitMQ":"rabbitmq","Pandas":"pandas","Streamlit":"streamlit","Pydantic":"pydantic","Postman":"postman","Swagger/OpenAPI":"swagger","n8n":"n8n","Gemini API":"googlegemini","Pinecone":"pinecone"};
const AI=["Generative AI","RAG & Search","AI Agents & Automation"];
const Label=({children})=>(<div className="flex items-center gap-4 mb-10" data-aos="fade-up"><span className="font-mono text-xs tracking-[.3em] uppercase text-mute">{children}</span><i className="h-px flex-1 bg-line"/></div>);
function Ico({s,z=30,onError}){const{resolvedTheme:t}=useTheme();return <img src={`https://cdn.simpleicons.org/${s}${MONO.includes(s)?(t==="dark"?"/ffffff":"/000000"):""}`} alt="" width={z} height={z} onError={onError}/>}
function Tile({n,hl}){const s=SLUG[n];const[bad,setBad]=useState(false);
return <div className="card px-4 py-3 min-w-[88px] flex flex-col items-center gap-2 text-xs text-mute hover:text-fg" style={hl?{borderColor:"color-mix(in srgb,var(--b) 45%,var(--line))"}:{}}>
{s&&!bad?<Ico s={s} onError={()=>setBad(true)}/>:<span className="w-[30px] h-[30px] grid place-items-center rounded-lg font-mono text-xs text-a border border-line">{n.slice(0,2)}</span>}{n}</div>}
function Shot({p}){const[bad,setBad]=useState(false);const c="w-full aspect-[16/10]";
return p.image&&!bad?<img src={p.image} alt={`${p.title} screenshot`} onError={()=>setBad(true)} className={`${c} object-cover object-top`}/>:<div className={`${c} grid place-items-center text-3xl font-bold`} style={{background:"linear-gradient(135deg,color-mix(in srgb,var(--a) 20%,var(--card)),color-mix(in srgb,var(--b) 20%,var(--card)))"}}><span className="grad">{p.title}</span></div>}
const Row=({left,children})=>(<div className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-10 py-8 border-b border-line" data-aos="fade-up"><div>{left}</div><div>{children}</div></div>);
const Logo=({t})=><div className="w-12 h-12 rounded-xl grid place-items-center font-bold text-white mb-3" style={{background:"linear-gradient(135deg,var(--a),var(--b))"}}>{t}</div>;
const Now=()=><span className="ml-2 font-mono text-[10px] tracking-widest px-2 py-0.5 rounded border border-line text-b align-middle">NOW</span>;
const inp="w-full bg-transparent border border-line rounded-lg px-3 py-2.5 outline-none focus:border-a transition";

function Contact(){const f=useRef();const[st,setSt]=useState("idle");
const send=async e=>{e.preventDefault();setSt("sending");try{await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,f.current,{publicKey:process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY});setSt("sent");f.current.reset()}catch(err){console.error(err);setSt("error")}};
return(<div className="card grid md:grid-cols-2 gap-10 p-6 md:p-12" data-aos="zoom-in" style={{transform:"none"}}>
<div><h2 className="text-4xl font-bold mb-3">Contact</h2><p className="text-mute mb-8">Fill up the form to send me a message. I read every one.</p>
<ul className="space-y-5 font-semibold"><li><span className="text-b mr-3">✆</span>{d.phone}</li><li><span className="text-b mr-3">✉</span><a href={`mailto:${d.email}`} className="break-all">{d.email}</a></li><li><span className="text-b mr-3">⌖</span>{d.location}</li></ul>
<div className="flex gap-4 mt-8">{[["linkedin",d.linkedin],["github",d.github]].map(([s,u])=><a key={s} href={u} target="_blank" rel="noreferrer" aria-label={s}><Ico s={s} z={28}/></a>)}</div></div>
<form ref={f} onSubmit={send} className="space-y-4">
<label className="block text-sm">Name<input name="from_name" required placeholder="Enter your name" className={`${inp} mt-1`}/></label>
<label className="block text-sm">Email<input name="from_email" type="email" required placeholder="Enter your email" className={`${inp} mt-1`}/></label>
<label className="block text-sm">Message<textarea name="message" required rows={4} placeholder="Write your message" className={`${inp} mt-1 resize-y`}/></label>
<button disabled={st==="sending"} className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-60" style={{background:"linear-gradient(90deg,var(--a),var(--b))"}}>{st==="sending"?"Sending...":"Send message"}</button>
<p aria-live="polite" className="text-sm min-h-5">{st==="sent"&&"Message sent. I'll reply soon."}{st==="error"&&`Could not send. Email me directly at ${d.email}.`}</p></form></div>)}
export default function Portfolio(){
const[open,setOpen]=useState(false);
useEffect(()=>{AOS.init({duration:700,once:true,offset:60})},[]);
return(<main>
<header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-line" style={{background:"color-mix(in srgb,var(--bg) 80%,transparent)"}}>
<div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
<a href="#" className="font-bold">{d.name.split(" ")[0]}<span className="text-a">.ai</span></a>
<nav className="hidden md:flex gap-7 text-sm text-mute">{nav.map(n=><a key={n} href={`#${n}`} className="hover:text-fg capitalize transition">{n}</a>)}</nav>
<div className="flex items-center gap-3"><a href="/resume" target="_blank" rel="noreferrer" className="hidden sm:inline-block text-sm px-4 py-2 rounded-full border border-line hover:border-a transition">Resume</a><Theme/><button className="md:hidden w-9 h-9 border border-line rounded-full" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?"✕":"☰"}</button></div></div>
{open&&<div className="md:hidden px-5 pb-4 flex flex-col gap-3">{nav.map(n=><a key={n} href={`#${n}`} onClick={()=>setOpen(false)} className="capitalize">{n}</a>)}<a href="/resume" target="_blank" rel="noreferrer">Resume</a></div>}
</header>

<div className="relative overflow-hidden"><div className="grid-bg absolute inset-0"/>
<div className="absolute -top-32 -left-24 w-96 h-96 rounded-full blur-3xl opacity-25" style={{background:"var(--a)"}}/>
<div className="absolute top-40 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background:"var(--b)"}}/>
<div className="relative max-w-6xl mx-auto px-5 pt-36 pb-24 grid lg:grid-cols-2 gap-14 items-center">
<div><motion.p initial={{opacity:0}} animate={{opacity:1}} className="font-mono text-sm text-mute mb-3">Hi, I'm</motion.p>
<motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}} className="text-5xl md:text-7xl font-bold tracking-tight mb-4">{d.name}</motion.h1>
<Roles/>
<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.4}} className="mt-5 text-mute text-lg max-w-lg">{d.tagline}</motion.p>
<div className="mt-8 flex flex-wrap gap-3">
<a href="#projects" className="px-6 py-3 rounded-full font-semibold text-white hover:scale-105 transition" style={{background:"linear-gradient(90deg,var(--a),var(--b))"}}>See my AI projects</a>
<a href="/resume" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-line hover:border-a transition">View resume</a><a href={`mailto:${d.email}`} className="px-6 py-3 rounded-full border border-line hover:border-a transition">Email me</a></div></div>
<div className="flex justify-center lg:justify-end"><Pipeline/></div></div></div>

<Sec id="about"><Title>From production web apps to LLM applications</Title>
<div className="grid md:grid-cols-5 gap-8"><p data-aos="fade-right" className="md:col-span-3 text-lg text-mute leading-relaxed">{d.summary}</p>
<div className="md:col-span-2 grid grid-cols-2 gap-4">{d.stats.map(([n,l],i)=>(<div key={l} data-aos="zoom-in" data-aos-delay={i*80} className="card p-4"><p className="text-3xl font-bold grad">{n}</p><p className="text-xs text-mute mt-1">{l}</p></div>))}</div></div></Sec>

<Sec id="skills"><Label>Skills</Label>
{Object.entries(d.skills).map(([k,v])=>(<div key={k} data-aos="fade-up" className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-6 mb-8"><p className="font-mono text-xs tracking-[.25em] uppercase text-mute md:pt-5">{k}</p><div className="flex flex-wrap gap-3">{v.map(n=><Tile key={n} n={n} hl={AI.includes(k)}/>)}</div></div>))}</Sec>

<Sec id="projects"><Label>Projects</Label>
<div className="grid md:grid-cols-2 gap-6">{d.projects.map((p,i)=>(<article key={p.title} data-aos="fade-up" data-aos-delay={(i%2)*100} className="card overflow-hidden flex flex-col"><Shot p={p}/>
<div className="p-6 flex flex-col flex-1"><h3 className="text-xl font-bold mb-3">{p.title} <span className="text-mute font-normal">- {p.sub}</span></h3>
<p className="text-mute text-sm leading-relaxed mb-5">{p.desc.join(" ")}</p>
<div className="flex flex-wrap gap-2 mb-5 mt-auto">{p.tech.map(t=><Chip key={t} t={t}/>)}</div>
{(p.demo||p.code)&&<div className="flex gap-3 text-sm font-semibold">{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-line text-b hover:border-b">↗ Live demo</a>}{p.code&&<a href={p.code} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-line hover:border-a">GitHub</a>}</div>}</div></article>))}</div></Sec>

<Sec id="experience"><Label>Experience</Label>
<Row left={<><Logo t="sG"/><h3 className="font-bold text-lg">sGate Tech<Now/></h3><p className="text-sm text-mute">{d.experience.period}</p></>}>
<h4 className="font-semibold mb-2">{d.experience.role}, {d.experience.company}</h4><ul className="list-disc pl-4 space-y-1.5 text-mute">{d.experience.points.map(x=><li key={x}>{x}</li>)}</ul></Row>
<Row left={<><Logo t="Sk"/><h3 className="font-bold text-lg">Skart</h3><p className="text-sm text-mute">Company project at sGate</p></>}>
<h4 className="font-semibold mb-2">{d.skart.title}</h4><ul className="list-disc pl-4 space-y-1.5 text-mute mb-5">{d.skart.points.map(x=><li key={x}>{x}</li>)}</ul>
<div className="flex flex-wrap gap-2 mb-3">{d.skart.web.map(([n,u])=><a key={u} href={`https://${u}`} target="_blank" rel="noreferrer" className="text-xs border border-line rounded-lg px-3 py-1.5 hover:border-a transition">{n} <span className="font-mono text-mute">{u}</span></a>)}</div>
<div className="flex flex-wrap gap-2">{d.skart.mobile.map(([n,t,s])=><span key={n} className="text-xs border border-line rounded-lg px-3 py-1.5">{n} <span className="font-mono text-b">{t}</span> <span className="text-mute">{s}</span></span>)}</div></Row>
<Row left={<h3 className="font-bold text-lg">Education</h3>}><ul className="space-y-2 text-mute">{d.education.map(([n,y])=><li key={n}>{n} <span className="font-mono text-xs">({y})</span></li>)}</ul></Row></Sec>

<Sec id="contact"><Contact/></Sec>
<footer className="max-w-6xl mx-auto px-5 py-12 border-t border-line flex flex-col md:flex-row justify-between gap-8">
<div><p className="font-bold">{d.footer.headline}</p><p className="text-mute mb-5">{d.footer.line}</p><a href={`mailto:${d.email}`} className="text-xl text-b border-b border-line">{d.email}</a></div>
<div className="md:text-right"><div className="flex gap-3 md:justify-end mb-3">{[["linkedin",d.linkedin],["github",d.github]].map(([s,u])=><a key={s} href={u} target="_blank" rel="noreferrer" aria-label={s} className="card w-11 h-11 grid place-items-center"><Ico s={s} z={20}/></a>)}</div>
<p className="text-xs text-mute">{d.name} · {new Date().getFullYear()}</p></div></footer>
</main>)}
