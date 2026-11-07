import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useReveal from "../hooks/useReveal";

const projectsData = [
  { title: "Dashboard", desc: "High-level metrics: Revenue, pending approvals, overdue items", tags: ["System", "Analytics"], filter: "web", img: "/images/1.png" },
  { title: "HR Module", desc: "Employees, applicants, interviews, training, disciplinary actions", tags: ["System", "HR"], filter: "web", img: "/images/2.png" },
  { title: "Operations", desc: "Deployments, timekeeping, leave requests, overtime", tags: ["System", "Operations"], filter: "web", img: "/images/3.png" },
  { title: "Payroll", desc: "Payroll runs, salary computations with government deductions", tags: ["System", "Finance"], filter: "web", img: "/images/4.png" },
  { title: "Finance & Accounting", desc: "Budget, billing, accounts payable/receivable, general ledger, treasury", tags: ["System", "Finance"], filter: "design", img: "/images/5.png" },
  { title: "Compliance", desc: "Tracking DOLE, SSS, BIR, and PhilHealth deadlines", tags: ["System", "Compliance"], filter: "design", img: "/images/6.png" },
  { title: "Clients", desc: "Managing corporate client accounts and contracts", tags: ["System", "CRM"], filter: "web", img: "/images/7.png" },
  { title: "Communications", desc: "Internal memos, meeting minutes, DOLE/SBMA intelligence, job fair management", tags: ["System", "Comms"], filter: "web", img: "/images/8.png" },
  { title: "Analytics", desc: "AI-generated insights, KPI charts, and department breakdowns", tags: ["System", "Analytics"], filter: "design", img: "/images/9.png" },
  { title: "System Overview", desc: "Complete enterprise resource planning and management system", tags: ["System", "Overview"], filter: "web", img: "/images/10.png" },
];
const tabs = [["all", "All"], ["web", "Web App"], ["design", "Design"]];

export default function Projects() {
  const ref = useReveal();
  const [filter, setFilter] = useState("all");
  const list = projectsData.filter((p) => filter === "all" || p.filter === filter);

  return (
    <div ref={ref} className="page">
      <h1 className="display sm" data-panel>Selected work</h1>
      <div className="tabs" data-panel>
        {tabs.map(([k, l]) => (
          <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      <motion.div layout className="proj-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              layout
              key={p.title}
              className="card proj"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="proj-img"><img src={p.img} alt={p.title} loading="lazy" /></div>
              <div className="proj-info">
                <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
