const { createCanvas, loadImage } = require('canvas');
const opentype = require('opentype.js');
const path = require('path');


// Path to the new Cyber Security template
const templatePath = path.join(__dirname, 'assets', 'final-certificate-check.jpg');

// Path to the custom font
const fontPath = path.join(__dirname, 'fonts', 'GreatVibes-Regular.ttf');

// Helper to load font via promise
let fontPromise = null;
function loadFont() {
    if (fontPromise) return fontPromise;
    fontPromise = new Promise((resolve, reject) => {
        opentype.load(fontPath, (err, font) => {
            if (err) reject(err);
            else resolve(font);
        });
    });
    return fontPromise;
}

async function generateCertificate(name, date = new Date().toLocaleDateString(), studentId = 'N/A') {
    // Format name: First letter Caps, rest small (Title Case for each word)
    const formattedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    name = formattedName;

    try {
        const [template, font] = await Promise.all([
            loadImage(templatePath),
            loadFont()
        ]);

        const width = template.width;
        const height = template.height;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Draw the background template
        ctx.drawImage(template, 0, 0, width, height);

        // --- NEW: Programmatic Background Enhancements ---

        // 1. Subtle Radial Glow behind where the name will be
        const glowX = width / 2;
        const glowY = height * 0.58;
        const glowGradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.4);
        glowGradient.addColorStop(0, 'rgba(34, 211, 238, 0.15)'); // Subtle Cyan Glow
        glowGradient.addColorStop(0.5, 'rgba(163, 230, 53, 0.05)'); // Fading to Lime
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);

        // 2. High-Fidelity Wavy Mesh (Silk-like waves)
        const drawOrganicWave = (opacityMultiplier) => {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.01 * opacityMultiplier})`;
            ctx.lineWidth = 0.5;

            // Randomize start and end points slightly
            const startY = height * (0.3 + Math.random() * 0.4);
            const endY = height * (0.3 + Math.random() * 0.4);

            ctx.moveTo(0, startY);

            // Generate multiple control points for a complex, organic flow
            const cp1x = width * 0.25;
            const cp1y = height * (Math.random() * 0.8);
            const cp2x = width * 0.5;
            const cp2y = height * (Math.random() * 0.8);
            const cp3x = width * 0.75;
            const cp3y = height * (Math.random() * 0.8);

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width, endY);
            ctx.stroke();
        };

        // Draw a dense mesh of overlapping organic curves
        for (let i = 0; i < 40; i++) {
            drawOrganicWave(Math.random() * 5);
        }

        // 3. Subtle Technical Connections (Small nodes/dots)
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        // --- END: Background Enhancements ---


        // Styling for the Student Name
        const fontSize = 150; // Increased for better prominence as requested

        // Calculate text width to center it
        const textWidth = font.getAdvanceWidth(name, fontSize);
        const textX = (width - textWidth) / 2;

        // Vertical alignment adjustment
        const textY = (height * 0.58) + (fontSize * 0.35);

        // Create a vibrant linear gradient (Teal to Lime Green)
        const gradient = ctx.createLinearGradient(textX, 0, textX + textWidth, 0);
        gradient.addColorStop(0, '#0395B2'); // Teal Blue
        gradient.addColorStop(1, '#A3D861'); // Lime Green

        // Draw the text as a path
        const textPath = font.getPath(name, textX, textY, fontSize);

        // Apply gradient and enhancement effects
        ctx.fillStyle = gradient;

        // Add a subtle outer glow/shadow to make it pop against the dark background
        ctx.shadowColor = 'rgba(3, 149, 178, 0.3)'; // Subtle teal glow
        ctx.shadowBlur = 10;

        // IMPORTANT: opentype.js Path objects often have a default 'black' fill. 
        textPath.fill = gradient;
        textPath.draw(ctx);

        // Add a very thin stroke to thicken the script font slightly for better legibility
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Reset shadow for subsequent drawings
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        return canvas.toBuffer('image/png');
    } catch (err) {
        console.error('Failed to load certificate template:', err);
        // Fallback placeholder if image is missing
        const width = 2000;
        const height = 1414;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0a0a0a'; // Dark background for fallback
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '60px serif';
        ctx.textAlign = 'center';
        ctx.fillText('TEMPLATE MISSING - CONTACT ADMIN', width / 2, 500);
        ctx.fillText(name, width / 2, 700);
        return canvas.toBuffer('image/png');
    }
}


module.exports = { generateCertificate };
