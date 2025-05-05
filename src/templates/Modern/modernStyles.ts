export const getModernStyles = () => `
  /* Page layout */
  
    .a4-page {
      width: 210mm;
      padding: 0;
      margin: 0;
    }
  /* Content grid layout */
  .content-grid {
    display: grid;
    grid-template-columns: 68% 28%;
    gap: 4%;
    margin-top: 1.5rem;
  }
  
  /* Section styling */
  .section {
    margin-bottom: 1.8rem;
    break-inside: avoid;
  }
  
  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.8rem;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid #f0f0f0;
  }
  
  /* Personal info header */
  .personal-info-header {
    text-align: left;
    margin-bottom: 1rem;
  }
  
  .name {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333333;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }
  
  .title {
    font-size: 1.1rem;
    font-weight: 400;
    color: #555555;
    margin-bottom: 0.5rem;
  }
  
  /* Work experience */
  .work-item, .project-item, .education-item {
    margin-bottom: 1.5rem;
  }
  
  .item-header {
    margin-bottom: 0.5rem;
  }
  
  .item-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.2rem;
  }
  
  .item-subtitle {
    font-size: 0.9rem;
    font-weight: 500;
    color: #555555;
    margin-bottom: 0.2rem;
  }
  
  .item-date {
    font-size: 0.8rem;
    color: #777777;
    margin-bottom: 0.5rem;
  }
  
  .item-description {
    font-size: 0.85rem;
    color: #444444;
    line-height: 1.5;
  }
  
  /* Skills styling */
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .skill-category {
    margin-bottom: 0.8rem;
  }
  
  .skill-category-name {
    font-size: 0.9rem;
    font-weight: 600;
    color: #444444;
    margin-bottom: 0.4rem;
  }
  
  .skill-keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  
  .skill-keyword {
    background-color: #f5f5f5;
    color: #444444;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: 400;
  }
  
  /* Summary section */
  .summary {
    font-size: 0.9rem;
    color: #444444;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  /* Certifications */
  .certification-item {
    margin-bottom: 0.8rem;
  }
  
  .certification-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #444444;
    margin-bottom: 0.2rem;
  }
  
  .certification-authority {
    font-size: 0.8rem;
    color: #666666;
    margin-bottom: 0.2rem;
  }
  
  .certification-date {
    font-size: 0.75rem;
    color: #777777;
  }
`;
