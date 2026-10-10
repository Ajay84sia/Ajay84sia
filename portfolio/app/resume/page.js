import d from "../../data/portfolio.json";
export const metadata={title:`Resume | ${d.name}`};
const btn="px-4 py-2 rounded-full text-sm font-semibold";
export default function Resume(){return(
<main className="min-h-screen flex flex-col">
<header className="border-b border-line backdrop-blur-md" style={{background:"color-mix(in srgb,var(--bg) 85%,transparent)"}}>
<div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
<a href="/" className="text-sm text-mute hover:text-fg">← Back to portfolio</a>
<a href={d.resume} download="Ajay_Resume.pdf" className={`${btn} text-white`} style={{background:"linear-gradient(90deg,var(--a),var(--b))"}}>Download PDF</a></div></header>
<div className="flex-1 max-w-5xl w-full mx-auto p-3 md:p-6">
<object data={`${d.resume}#view=FitH`} type="application/pdf" className="w-full rounded-xl border border-line bg-white" style={{height:"calc(100vh - 7.5rem)",minHeight:480}}>
<div className="card p-8 text-center"><p className="text-mute mb-4">Your browser can't show the PDF inline.</p>
<a href={d.resume} target="_blank" rel="noreferrer" className={`${btn} border border-line mr-3`}>Open PDF</a>
<a href={d.resume} download="Ajay_Resume.pdf" className={`${btn} text-white`} style={{background:"var(--a)"}}>Download PDF</a></div></object></div></main>)}
