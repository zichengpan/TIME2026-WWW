// Organizers Component
export async function renderOrganizers(containerId, options = {}) {
  const { isSubpage = false } = options;
  const basePath = isSubpage ? '../' : '';
  
  try {
    const response = await fetch(`${basePath}data/organizers.json`);
    const data = await response.json();
    
    // Render Workshop Organizers
    const organizersHtml = data.workshopOrganizers.map(org => {
      const imgSrc = org.image.startsWith('http') ? org.image : `${basePath}${org.image}`;
      return `
        <div class="organizer-card">
          <div class="organizer-image-wrapper">
            <img src="${imgSrc}" alt="${org.name}">
          </div>
          <h4 class="organizer-name"><a href="${org.link}" target="_blank">${org.name}</a></h4>
          <p class="organizer-institution">${org.institution}</p>
          <p class="organizer-bio">${org.bio}</p>
        </div>`;
    }).join('');
    
    // Render Workshop Coordinators
    const coordinatorsHtml = data.workshopCoordinators.map(coord => {
      const imgSrc = coord.image.startsWith('http') ? coord.image : `${basePath}${coord.image}`;
      const nameHtml = coord.link 
        ? `<a href="${coord.link}" target="_blank">${coord.name}</a>`
        : coord.name;
      return `
        <div class="coordinator-card">
          <div class="coordinator-image-wrapper">
            <img src="${imgSrc}" alt="${coord.name}" class="coordinator-image">
          </div>
          <h4 class="coordinator-name">${nameHtml}</h4>
          <p class="coordinator-institution">${coord.institution}</p>
        </div>`;
    }).join('');
    
    const html = `
      <h3 class="subsection-title">Workshop Organizers</h3>
      <div class="organizers-grid">
        ${organizersHtml}
      </div>

      <h3 class="subsection-title" style="margin-top: 3rem;">Workshop Coordinators</h3>
      <div class="coordinators-grid">
        ${coordinatorsHtml}
      </div>`;
    
    document.getElementById(containerId).innerHTML = html;
    
  } catch (error) {
    console.error('Error loading organizers:', error);
  }
}
