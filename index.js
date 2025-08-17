// Replace your existing generateBtn click handler with this:

generateBtn.addEventListener('click', async function() {
    const description = websiteDescription.value.toLowerCase();
    const type = websiteType.value;
    const color = colorScheme.value;
    const name = websiteName.value || 'My Website';
    
    if (!description) {
        showError('Please describe your website');
        return;
    }
    
    hideError();
    loading.style.display = 'block';
    previewPlaceholder.style.display = 'none';
    websitePreview.style.display = 'none';
    downloadBtn.style.display = 'none';
    hostingOffer.style.display = 'none';
    
    // Simulate "AI processing" time (1-3 seconds)
    const processingTime = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
        try {
            const htmlContent = generateAdvancedWebsite(description, type, color, name);
            
            websitePreview.style.display = 'block';
            websitePreview.srcdoc = htmlContent;
            websitePreview.dataset.generatedHtml = htmlContent;
            
            downloadBtn.style.display = 'inline-block';
            hostingOffer.style.display = 'block';
            
            const currentCount = parseInt(counterNumber.textContent.replace(/,/g, ''));
            animateCounter(currentCount + Math.floor(Math.random() * 10) + 1);
            
        } catch (error) {
            showError('Error generating website: ' + error.message);
        } finally {
            loading.style.display = 'none';
        }
    }, processingTime);
});

// Advanced website generator
function generateAdvancedWebsite(description, type, colorScheme, name) {
    // Determine template based on description keywords and type
    const template = selectTemplate(description, type);
    
    // Generate color palette based on selection
    const colors = generateColorPalette(colorScheme);
    
    // Build sections based on description keywords
    const sections = buildSections(description);
    
    // Generate complete HTML
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${name}</title>
        <style>
            ${generateCSS(template, colors)}
        </style>
    </head>
    <body class="${template}">
        ${generateHeader(name, type, colors)}
        ${generateNavigation(sections)}
        <main>
            ${sections.map(section => generateSection(section, colors)).join('')}
        </main>
        ${generateFooter(name)}
        <script>
            ${generateJSInteractions(template)}
        </script>
    </body>
    </html>
    `;
}

// Template selection logic
function selectTemplate(description, type) {
    const templates = {
        business: ['corporate', 'modern', 'minimalist'],
        portfolio: ['creative', 'showcase', 'minimalist'],
        ecommerce: ['shop', 'product-focused', 'minimalist'],
        blog: ['magazine', 'clean', 'minimalist'],
        landing: ['conversion', 'simple', 'minimalist'],
        other: ['creative', 'modern', 'minimalist']
    };
    
    // Check for keywords in description
    if (description.includes('minimal') || description.includes('simple')) {
        return 'minimalist';
    }
    if (description.includes('modern') || description.includes('sleek')) {
        return 'modern';
    }
    if (description.includes('creative') || description.includes('art')) {
        return 'creative';
    }
    
    // Default based on type
    return templates[type][Math.floor(Math.random() * templates[type].length)];
}

// Color palette generator
function generateColorPalette(scheme) {
    const palettes = {
        light: {
            primary: '#4361ee',
            secondary: '#3f37c9',
            accent: '#4895ef',
            background: '#f8f9fa',
            text: '#2b2d42',
            header: '#ffffff'
        },
        dark: {
            primary: '#4895ef',
            secondary: '#4361ee',
            accent: '#3f37c9',
            background: '#212529',
            text: '#f8f9fa',
            header: '#1a1a1a'
        },
        vibrant: {
            primary: '#FF6B6B',
            secondary: '#4ECDC4',
            accent: '#FFE66D',
            background: '#f8f9fa',
            text: '#292F36',
            header: '#ffffff'
        },
        pastel: {
            primary: '#A5D8FF',
            secondary: '#B388EB',
            accent: '#FFD6E0',
            background: '#f8f9fa',
            text: '#5E503F',
            header: '#ffffff'
        },
        custom: {
            primary: '#' + Math.floor(Math.random()*16777215).toString(16),
            secondary: '#' + Math.floor(Math.random()*16777215).toString(16),
            accent: '#' + Math.floor(Math.random()*16777215).toString(16),
            background: '#f8f9fa',
            text: '#2b2d42',
            header: '#ffffff'
        }
    };
    
    return palettes[scheme] || palettes.light;
}

// Section builder based on keywords
function buildSections(description) {
    const sections = [];
    
    // Always include hero section
    sections.push({
        type: 'hero',
        title: 'Welcome to Our Website',
        content: 'This is the main showcase area of your site'
    });
    
    // Add sections based on keywords
    if (description.includes('about') || description.includes('story')) {
        sections.push({
            type: 'about',
            title: 'About Us',
            content: 'Learn more about who we are and what we do'
        });
    }
    
    if (description.includes('service') || description.includes('offer')) {
        sections.push({
            type: 'services',
            title: 'Our Services',
            items: [
                'Professional Service 1',
                'Quality Service 2',
                'Premium Service 3'
            ]
        });
    }
    
    if (description.includes('gallery') || description.includes('photo')) {
        sections.push({
            type: 'gallery',
            title: 'Gallery',
            images: 6
        });
    }
    
    if (description.includes('contact') || description.includes('reach')) {
        sections.push({
            type: 'contact',
            title: 'Contact Us',
            content: 'Get in touch with our team'
        });
    }
    
    if (description.includes('blog') || description.includes('news')) {
        sections.push({
            type: 'blog',
            title: 'Latest News',
            posts: [
                {title: 'Recent Update', excerpt: 'Summary of our latest news'},
                {title: 'Industry Insights', excerpt: 'Thoughts on current trends'}
            ]
        });
    }
    
    return sections;
}

// CSS generator
function generateCSS(template, colors) {
    // Base styles
    let css = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: ${colors.text};
        background-color: ${colors.background};
    }
    
    a {
        text-decoration: none;
        color: ${colors.primary};
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    /* Header styles */
    header {
        background-color: ${colors.header};
        padding: 20px 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    /* Navigation styles */
    nav {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        background-color: ${colors.secondary};
    }
    
    nav a {
        color: white;
        margin: 0 15px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    nav a:hover {
        color: ${colors.accent};
    }
    
    /* Section styles */
    section {
        padding: 60px 0;
    }
    
    section h2 {
        font-size: 2.5rem;
        margin-bottom: 30px;
        color: ${colors.primary};
        text-align: center;
    }
    `;
    
    // Template-specific styles
    if (template === 'minimalist') {
        css += `
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        h1, h2, h3 {
            font-weight: 300;
        }
        
        section {
            padding: 40px 0;
        }
        `;
    } else if (template === 'modern') {
        css += `
        body {
            font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3 {
            font-weight: 600;
        }
        
        section {
            padding: 80px 0;
        }
        `;
    } else if (template === 'creative') {
        css += `
        body {
            font-family: 'Montserrat', sans-serif;
        }
        
        h1, h2, h3 {
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        `;
    }
    
    return css;
}

// Component generators
function generateHeader(name, type, colors) {
    return `
    <header>
        <div class="container">
            <h1 style="color: ${colors.primary}">${name}</h1>
            <p>${type.charAt(0).toUpperCase() + type.slice(1)} Website</p>
        </div>
    </header>
    `;
}

function generateNavigation(sections) {
    return `
    <nav>
        ${sections.map(section => 
            `<a href="#${section.type}">${section.title}</a>`
        ).join('')}
    </nav>
    `;
}

function generateSection(section, colors) {
    switch(section.type) {
        case 'hero':
            return `
            <section id="hero" style="background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); color: white; text-align: center; padding: 100px 20px;">
                <div class="container">
                    <h1>${section.title}</h1>
                    <p>${section.content}</p>
                    <button style="background: ${colors.accent}; color: white; border: none; padding: 12px 30px; margin-top: 20px; border-radius: 30px; font-weight: bold; cursor: pointer;">
                        Learn More
                    </button>
                </div>
            </section>
            `;
        
        case 'about':
            return `
            <section id="about">
                <div class="container">
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                </div>
            </section>
            `;
            
        case 'services':
            return `
            <section id="services">
                <div class="container">
                    <h2>${section.title}</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 40px;">
                        ${section.items.map(item => `
                            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                                <h3 style="color: ${colors.primary}">${item}</h3>
                                <p style="margin-top: 15px;">Detailed description of this service would go here.</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            `;
            
        case 'gallery':
            return `
            <section id="gallery">
                <div class="container">
                    <h2>${section.title}</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 40px;">
                        ${Array.from({length: section.images}, (_, i) => `
                            <div style="background: #eee; height: 200px; display: flex; align-items: center; justify-content: center; color: #777;">
                                Image ${i+1}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
            `;
            
        case 'contact':
            return `
            <section id="contact" style="background: #f5f5f5;">
                <div class="container">
                    <h2>${section.title}</h2>
                    <form style="max-width: 600px; margin: 40px auto;">
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px;">Name</label>
                            <input type="text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px;">Email</label>
                            <input type="email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px;">Message</label>
                            <textarea style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 150px;"></textarea>
                        </div>
                        <button type="submit" style="background: ${colors.primary}; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer;">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            `;
            
        case 'blog':
            return `
            <section id="blog">
                <div class="container">
                    <h2>${section.title}</h2>
                    <div style="display: grid; gap: 40px; margin-top: 40px;">
                        ${section.posts.map(post => `
                            <article style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                                <h3 style="color: ${colors.primary}">${post.title}</h3>
                                <p style="margin: 15px 0;">${post.excerpt}</p>
                                <a href="#" style="color: ${colors.secondary}">Read more →</a>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
            `;
            
        default:
            return `
            <section id="${section.type}">
                <div class="container">
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                </div>
            </section>
            `;
    }
}

function generateFooter(name) {
    return `
    <footer style="background: #333; color: white; text-align: center; padding: 30px 0;">
        <div class="container">
            <p>© ${new Date().getFullYear()} ${name}. All rights reserved.</p>
        </div>
    </footer>
    `;
}

function generateJSInteractions(template) {
    if (template === 'creative') {
        return `
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('mouseover', () => {
                link.style.transform = 'scale(1.1)';
                link.style.transition = 'all 0.3s ease';
            });
            
            link.addEventListener('mouseout', () => {
                link.style.transform = 'scale(1)';
            });
        });
        `;
    } else if (template === 'modern') {
        return `
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        `;
    }
    
    return `
    // Basic interactivity
    console.log('Website loaded successfully');
    `;
}
