export const getTechnicalStyles = () => {
  return `
    .a4-page {
      width: 210mm;
      min-height: 297mm;
      padding: 15mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: 65% 30%;
      gap: 5%;
      margin-top: 1.5rem;
    }
    
    .main-column {
      grid-column: 1;
    }
    
    .side-column {
      grid-column: 2;
    }
    
    .section {
      margin-bottom: 1.5rem;
    }
    
    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2C5282;
      margin-bottom: 0.8rem;
      padding-bottom: 0.3rem;
      border-bottom: 2px solid #BEE3F8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .personal-info {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .name {
      font-size: 2rem;
      font-weight: 700;
      color: #2D3748;
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
    }
    
    .title {
      font-size: 1.1rem;
      color: #4A5568;
      margin-bottom: 0.8rem;
    }
    
    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.85rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      color: #4A5568;
    }
    
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .contact-label {
      font-weight: 500;
      color: #4A5568;
      display: inline-block;
      width: 70px;
    }
    
    .summary {
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      color: #4A5568;
      line-height: 1.6;
    }
    
    .work-item, .project-item, .education-item {
      margin-bottom: 1.2rem;
    }
    
    .work-header, .project-header, .education-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3rem;
    }
    
    .work-title, .project-title, .education-degree {
      font-weight: 600;
      color: #2D3748;
      font-size: 1rem;
    }
    
    .work-company, .project-date, .education-institution {
      font-weight: 500;
      color: #4A5568;
      font-size: 0.95rem;
    }
    
    .work-date, .education-date {
      color: #718096;
      font-size: 0.85rem;
    }
    
    .work-description, .project-description, .education-description {
      font-size: 0.9rem;
      color: #4A5568;
      margin-top: 0.5rem;
      line-height: 1.5;
    }
    
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .skill-category {
      margin-bottom: 0.8rem;
    }
    
    .skill-category-name {
      font-weight: 600;
      font-size: 0.9rem;
      color: #4A5568;
      margin-bottom: 0.4rem;
    }
    
    .skill-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skill-item {
      background-color: #EBF8FF;
      color: #3182CE;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      font-family: 'Roboto Mono', monospace;
    }
    
    .certifications-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .certification-item {
      margin-bottom: 0.8rem;
    }
    
    .certification-name {
      font-weight: 500;
      color: #2D3748;
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }
    
    .certification-issuer {
      font-size: 0.85rem;
      color: #718096;
    }
    
    .certification-date {
      font-size: 0.8rem;
      color: #A0AEC0;
    }
    
    .bullet-list {
      list-style-type: none;
      padding-left: 1.2rem;
      margin: 0.5rem 0;
    }
    
    .bullet-list li {
      position: relative;
      margin-bottom: 0.4rem;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .bullet-list li::before {
      content: "•";
      position: absolute;
      left: -1rem;
      color: #4299E1;
      font-weight: bold;
    }
    
    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin-top: 0.5rem;
    }
  `;
};
