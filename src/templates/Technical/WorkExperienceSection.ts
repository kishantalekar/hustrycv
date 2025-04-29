import { Section } from '../../components/ResumePreview/ResumePreview.types';

export const getWorkExperienceHTML = (work: Section): string => {
  if (!work.items.length) {return '';}

  return `
    <div class="section">
      <h2 class="section-title">${work.title || 'Work Experience'}</h2>
      ${work.items
        .map((item) => {
          // Extract tech keywords from description and highlights
          const techKeywords = extractTechKeywords(
            item.description || '',
            item.highlights || [],
          );

          return `
          <div class="work-item">
            <div class="work-header">
              <div class="work-title">${item.position || ''}</div>
              <div class="work-date">${item.startDate || ''} - ${
            item.endDate || 'Present'
          }</div>
            </div>
            <div class="work-company">${item.name || ''} ${
            item.location ? `• ${item.location}` : ''
          }</div>
            <div class="work-description">${item.description || ''}</div>
            ${
              item.highlights && item.highlights.length
                ? `
              <ul class="bullet-list">
                ${item.highlights
                  .map(
                    (highlight) => `
                  <li>${highlight}</li>
                `,
                  )
                  .join('')}
              </ul>
            `
                : ''
            }
            ${
              techKeywords.length
                ? `
              <div class="tech-tag-container">
                ${techKeywords
                  .map(
                    (tech) => `
                  <span class="tech-tag">${tech}</span>
                `,
                  )
                  .join('')}
              </div>
            `
                : ''
            }
          </div>
        `;
        })
        .join('')}
    </div>
  `;
};

// Helper function to extract tech keywords from text
function extractTechKeywords(
  description: string,
  highlights: string[],
): string[] {
  // Common tech keywords to look for
  const commonTechKeywords = [
    'JavaScript',
    'TypeScript',
    'React',
    'Angular',
    'Vue',
    'Node.js',
    'Express',
    'Python',
    'Django',
    'Flask',
    'Java',
    'Spring',
    'C#',
    '.NET',
    'PHP',
    'Laravel',
    'Ruby',
    'Rails',
    'Go',
    'Rust',
    'Swift',
    'Kotlin',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'REST',
    'GraphQL',
    'SQL',
    'NoSQL',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'HTML',
    'CSS',
    'SASS',
    'LESS',
    'Webpack',
    'Babel',
    'ESLint',
    'Jest',
    'Mocha',
    'Chai',
    'Cypress',
    'Selenium',
    'TDD',
    'Agile',
    'Scrum',
    'Kanban',
    'DevOps',
  ];

  // Combine description and highlights into one text
  const fullText = `${description} ${highlights.join(' ')}`.toLowerCase();

  // Find matches
  const matches = new Set<string>();
  commonTechKeywords.forEach((keyword) => {
    if (fullText.includes(keyword.toLowerCase())) {
      matches.add(keyword);
    }
  });

  // Limit to 8 keywords to avoid cluttering
  return Array.from(matches).slice(0, 8);
}
