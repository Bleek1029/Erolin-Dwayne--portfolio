import { useState } from "react";

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

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projectsData : projectsData.filter((p) => p.filter === filter);

  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">A showcase of my best work and creative projects</p>
        </div>
        <div className="project-filters">
          {["all", "web", "design"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "web" ? "Web App" : "Design"}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <div className="project-card" key={project.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="project-image">
                <img src={project.img} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" title="View Project"><i className="fas fa-eye"></i></a>
                    <a href="#" title="Source Code"><i className="fab fa-github"></i></a>
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}