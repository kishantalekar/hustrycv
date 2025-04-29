export const getMinimalistStyles = (): string => {
  return `
    .a4-page {
      width: 210mm;
      min-height: 297mm;
      padding: 0;
      margin: 0 auto;
      background: white;
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: 68% 28%;
      gap: 4%;
      margin-top: 1rem;
    }
    
    .section {
      margin-bottom: 1.5rem;
    }
    
    .section-title {
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.3rem;
      margin-bottom: 0.8rem;
    }
    
    .item {
      margin-bottom: 1rem;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3rem;
    }
    
    .item-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: #333;
    }
    
    .item-subtitle {
      font-weight: 500;
      font-size: 0.9rem;
      color: #555;
    }
    
    .item-date {
      font-size: 0.8rem;
      color: #777;
    }
    
    .item-location {
      font-size: 0.8rem;
      color: #777;
      font-style: italic;
    }
    
    .item-description {
      font-size: 0.85rem;
      color: #444;
      margin-top: 0.3rem;
    }
    
    .personal-info {
      text-align: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    
    .name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #222;
      margin-bottom: 0.3rem;
    }
    
    .title {
      font-size: 1rem;
      font-weight: 500;
      color: #555;
      margin-bottom: 0.5rem;
    }
    
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.8rem;
      color: #666;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    
    .summary {
      font-size: 0.9rem;
      color: #444;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .skill-item {
      font-size: 0.8rem;
      background-color: #f5f5f5;
      padding: 0.3rem 0.6rem;
      border-radius: 3px;
      color: #444;
    }
    
    .bullet-list {
      margin: 0;
      padding-left: 1.2rem;
    }
    
    .bullet-item {
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
      color: #444;
    }
  `;
};
