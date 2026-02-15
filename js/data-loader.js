/**
 * Data Loader Module
 * Handles loading and processing of portfolio data from data.json
 * Implements conditional rendering based on data availability
 */

class DataLoader {
    constructor() {
        this.data = null;
        this.loaded = false;
        this.sections = [];
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.processData();
            this.renderSections();
            this.setupDynamicContent();
            this.loaded = true;

            // Emit custom event when data is loaded
            document.dispatchEvent(new CustomEvent('dataLoaded', {
                detail: { data: this.data }
            }));
        } catch (error) {
            console.error('Error in DataLoader initialization:', error);
            this.showErrorState();
        }
    }

    async loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            throw new Error(`Failed to load data.json: ${error.message}`);
        }
    }

    processData() {
        // Determine which sections should be rendered based on data availability
        this.sections = [];

        // Always include hero if personal data exists
        if (this.hasValidData(this.data.personal)) {
            this.sections.push('hero');
        }

        // Check for each section
        if (this.hasValidData(this.data.about)) {
            this.sections.push('about');
        }

        if (this.hasValidData(this.data.experience) && this.data.experience.length > 0) {
            this.sections.push('experience');
        }

        if (this.hasValidData(this.data.projects) && this.data.projects.length > 0) {
            this.sections.push('projects');
        }

        if (this.hasValidData(this.data.contact)) {
            this.sections.push('contact');
        }

        // Always include footer if personal data exists
        if (this.hasValidData(this.data.personal)) {
            this.sections.push('footer');
        }
    }

    hasValidData(data) {
        return data !== null && data !== undefined && data !== '';
    }

    renderSections() {
        // Hide all sections initially
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('section-hidden');
        });

        // Show only sections that have data
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('section-hidden');
                this.renderSectionContent(sectionId);
            }
        });

        // Generate navigation based on available sections
        this.generateNavigation();
    }

    renderSectionContent(sectionId) {
        switch (sectionId) {
            case 'hero':
                this.renderHeroSection();
                break;
            case 'about':
                this.renderAboutSection();
                break;
            case 'experience':
                this.renderExperienceSection();
                break;
            case 'projects':
                this.renderProjectsSection();
                break;
            case 'contact':
                this.renderContactSection();
                break;
            case 'footer':
                this.renderFooter();
                break;
        }
    }

    renderHeroSection() {
        const personal = this.data.personal;
        const hero = this.data.hero;

        // Update personal info
        this.updateDynamicContent('[data-dynamic="name"]', personal.name);
        this.updateDynamicContent('[data-dynamic="title"]', personal.title);

        // Update hero content
        if (hero) {
            this.updateDynamicContent('[data-dynamic="description"]', hero.description);

            // Update buttons
            const primaryBtn = document.querySelector('.hero-buttons .btn-primary');
            const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

            if (hero.primaryButton && primaryBtn) {
                primaryBtn.href = hero.primaryButton.link;
                primaryBtn.querySelector('.btn-text').textContent = hero.primaryButton.text;
            }

            if (hero.secondaryButton && secondaryBtn) {
                secondaryBtn.href = hero.secondaryButton.link;
                secondaryBtn.querySelector('.btn-text').textContent = hero.secondaryButton.text;
            }
        }
    }

    renderAboutSection() {
        const about = this.data.about;
        const personal = this.data.personal;

        // Render description paragraphs
        const descriptionContainer = document.querySelector('.about-description');
        if (descriptionContainer && about.description) {
            descriptionContainer.innerHTML = about.description
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }

        // Render skills
        const skillsContainer = document.querySelector('.skills-grid');
        if (skillsContainer && about.skills) {
            skillsContainer.innerHTML = about.skills
                .map(skill => `<span class="skill-tag">${skill}</span>`)
                .join('');
        }

        // Update stats with real data if available
        if (personal) {
            const yearsExp = this.calculateExperience(personal);
            const statNumbers = document.querySelectorAll('.stat-number');
            if (statNumbers[0]) statNumbers[0].setAttribute('data-count', yearsExp);
        }
    }

    renderExperienceSection() {
        const timeline = document.querySelector('.experience-timeline');
        if (!timeline || !this.data.experience) return;

        timeline.innerHTML = this.data.experience
            .map(exp => this.createExperienceItem(exp))
            .join('');
    }

    createExperienceItem(exp) {
        return `
            <div class="experience-item">
                <div class="experience-content">
                    <h3 class="experience-company">${exp.company}</h3>
                    <h4 class="experience-position">${exp.position}</h4>
                    <p class="experience-location">
                        <i class="fas fa-map-marker-alt"></i> ${exp.location}
                    </p>
                    <p class="experience-description">${exp.description}</p>
                    ${exp.achievements ? `
                        <ul class="experience-achievements">
                            ${exp.achievements.map(achievement =>
            `<li>${achievement}</li>`
        ).join('')}
                        </ul>
                    ` : ''}
                    <div class="experience-tech">
                        ${exp.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('')}
                    </div>
                </div>
                <div class="experience-date">${exp.duration}</div>
            </div>
        `;
    }

    renderProjectsSection() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid || !this.data.projects) return;

        console.log('All projects:', this.data.projects);
        console.log('Number of projects:', this.data.projects.length);

        const projectCards = this.data.projects
            .map(project => this.createProjectCard(project))
            .join('');

        projectsGrid.innerHTML = projectCards;

        // Force the projects section to be visible
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.classList.remove('section-hidden');
            projectsSection.style.opacity = '1';
            projectsSection.style.visibility = 'visible';
        }
    }

    createProjectCard(project) {
        console.log('Creating project card for:', project.title);
        return `<div class="project-card">
            <div class="project-image">
                <i class="fas fa-code"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>`;
    }

    renderContactSection() {
        const contact = this.data.contact;
        if (!contact) return;

        // Update title and description
        this.updateDynamicContent('.contact-title', contact.title);
        this.updateDynamicContent('.contact-description', contact.description);

        // Render social links
        const socialContainer = document.querySelector('.contact-social');
        if (socialContainer && contact.socialLinks) {
            socialContainer.innerHTML = contact.socialLinks
                .map(link => this.createSocialLink(link))
                .join('');
        }
    }

    renderFooter() {
        const personal = this.data.personal;
        const currentYear = new Date().getFullYear();

        // Update year
        const yearElement = document.getElementById('current-year');
        if (yearElement) yearElement.textContent = currentYear;

        // Update name
        this.updateDynamicContent('.footer-text [data-dynamic="name"]', personal.name);

        // Render social links in footer
        const footerSocial = document.querySelector('.footer-social');
        if (footerSocial && this.data.contact && this.data.contact.socialLinks) {
            footerSocial.innerHTML = this.data.contact.socialLinks
                .map(link => this.createSocialLink(link))
                .join('');
        }
    }

    createSocialLink(link) {
        const iconMap = {
            'linkedin': 'fab fa-linkedin',
            'github': 'fab fa-github',
            'twitter': 'fab fa-twitter',
            'email': 'fas fa-envelope',
            'website': 'fas fa-globe'
        };

        const iconClass = iconMap[link.icon.toLowerCase()] || 'fas fa-link';

        return `
            <a href="${link.url}" target="_blank" class="social-link" aria-label="${link.platform}">
                <i class="${iconClass}"></i>
            </a>
        `;
    }

    generateNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;

        const navItems = this.sections
            .filter(section => section !== 'footer') // Exclude footer from navigation
            .map(section => ({
                id: section,
                name: this.formatNavName(section)
            }));

        navMenu.innerHTML = navItems
            .map(item => `
                <a href="#${item.id}" class="nav-link" data-section="${item.id}">
                    ${item.name}
                </a>
            `)
            .join('');

        const resumeUrl = this.data.resume || (this.data.personal ? this.data.personal.resume : null);
        if (resumeUrl) {
            const resumeLink = document.createElement('a');
            resumeLink.href = resumeUrl;
            resumeLink.target = '_blank';
            resumeLink.rel = 'noopener noreferrer';
            resumeLink.className = 'nav-link resume-link';
            resumeLink.innerHTML = `<i class="fas fa-file-pdf"></i> Resume`;
            navMenu.appendChild(resumeLink);
        }
    }

    formatNavName(sectionId) {
        const names = {
            'hero': 'Home',
            'about': 'About',
            'experience': 'Experience',
            'projects': 'Projects',
            'contact': 'Contact'
        };
        return names[sectionId] || sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    }

    setupDynamicContent() {
        // Update page title
        const personal = this.data.personal;
        if (personal) {
            document.title = `${personal.name} - ${personal.title}`;

            // Update meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = `Portfolio of ${personal.name}, ${personal.title}`;
            }
        }
    }

    updateDynamicContent(selector, content) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = content;
            } else {
                element.textContent = content;
            }
        });
    }

    calculateExperience(personal) {
        // This is a placeholder - in a real implementation, 
        // you might calculate this from work history
        return 5; // Default to 5 years
    }

    showErrorState() {
        // Show error message to user
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Oops! Something went wrong</h2>
                    <p>Unable to load portfolio data. Please check your connection and try again.</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        <i class="fas fa-redo"></i> Retry
                    </button>
                </div>
            `;
            loadingScreen.classList.add('error');
        }
    }

    // Public methods
    getData() {
        return this.data;
    }

    getSections() {
        return this.sections;
    }

    isLoaded() {
        return this.loaded;
    }
}

// Initialize data loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dataLoader = new DataLoader();
});
