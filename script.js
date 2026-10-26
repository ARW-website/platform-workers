
const tvGrid = document.getElementById('tv-grid');
const tvColumn = document.querySelector('.tv-column');

/*
  Add your image pairs here.

  Each pair:
  base  = image visible by default
  hover = image revealed on hover
*/
const tvImages = [
    {
        base: 'tv-base.png',
        hover: 'tv-01-hover.png'
    },
    {
        base: 'tv-base.png',
        hover: 'tv-02-hover.png'
    },
    {
        base: 'tv-base.png',
        hover: 'tv-03-hover.png'
    }
];

const TV_COLUMNS = 3;
const TV_ASPECT_RATIO = 16 / 12;

let previousCount = 0;

function calculateTVCount() {
    const columnWidth = tvColumn.clientWidth;
    const columnHeight = tvColumn.clientHeight;

    if (!columnWidth || !columnHeight) return 0;

    // Three TVs per row, each with a 16:9 ratio
    const tvWidth = columnWidth / TV_COLUMNS;
    const tvHeight = tvWidth / TV_ASPECT_RATIO;

    // Add one extra row so the bottom remains filled
    const rows = Math.ceil(columnHeight / tvHeight) + 1;

    return rows * TV_COLUMNS;
}

function createTV(imagePair, index) {
    const tv = document.createElement('div');
    tv.className = 'tv';

    const baseImage = document.createElement('img');
    baseImage.className = 'tv-base';
    baseImage.src = imagePair.base;
    baseImage.alt = '';
    baseImage.loading = index < 6 ? 'eager' : 'lazy';
    baseImage.draggable = false;

    const hoverImage = document.createElement('img');
    hoverImage.className = 'tv-overlay';
    hoverImage.src = imagePair.hover;
    hoverImage.alt = '';
    hoverImage.loading = index < 6 ? 'eager' : 'lazy';
    hoverImage.draggable = false;

    tv.append(baseImage, hoverImage);

    return tv;
}

function renderTVs() {
    const requiredCount = calculateTVCount();

    if (!requiredCount || requiredCount === previousCount) return;

    previousCount = requiredCount;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < requiredCount; i++) {
        const imagePair = tvImages[i % tvImages.length];
        fragment.appendChild(createTV(imagePair, i));
    }

    tvGrid.replaceChildren(fragment);
}

// Recalculate after the page has loaded
function initializeTVs() {
    renderTVs();
}

window.addEventListener('load', initializeTVs);

// Recalculate when the viewport or layout changes
const resizeObserver = new ResizeObserver(() => {
    renderTVs();
});

resizeObserver.observe(tvColumn);

window.addEventListener('resize', renderTVs);
