const coords = { x: 0, y: 0 };
const cursors = document.querySelectorAll(".cursor");
const scale = 0;

// Define cursor colors
const colors = [
  "#4fc3f7", "#48b8ed", "#41ade3", "#3aa2d9", "#3397cf",
  "#2c8cc5", "#2581bb", "#1e76b1", "#176ba7", "#10609d",
  "#095593", "#034a89", "#003f7f", "#003475", "#00296b",
  "#001e61", "#001357", "#00084d", "#000043", "#000039",
  "#00002f", "#000025"
];


// Initialize cursor styles
cursors.forEach(function (cursor, index) {
  cursor.x = 0;
  cursor.y = 0;
  cursor.style.backgroundColor = colors[index % colors.length];
});

// Update cursor coordinates on mouse move
document.addEventListener("mousemove", function(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

// Mouse leave event handler
document.addEventListener('mouseleave', function(e) {
  console.log('Mouse left viewport');
  if (e.target === document.body) {
    cursors.forEach(cursor => {
      cursor.style.transform = `scale(${scale})`;
      scale = 0;
    });
  }
});

// Mouse enter event handler
document.addEventListener('mouseenter', function(e) {
  console.log('Mouse entered viewport');
  if (e.target === document.body) {
    cursors.forEach(cursor => {
      cursor.style.transform = `scale(${(cursors.length - index) / cursors.length})`;
    });
  }
});

// Animation loop to update cursor positions and scaling
function animatecursors() {
  let x = coords.x;
  let y = coords.y;

  cursors.forEach(function (cursor, index) {
    // Position the cursor
    cursor.style.left = `${x - 12}px`; // Adjusting based on cursor width
    cursor.style.top = `${y - 12}px`; // Adjusting based on cursor height

    // Scale the cursor based on its index
    cursor.style.transform = `scale(${(cursors.length - index) / cursors.length})`;

    cursor.x = x;
    cursor.y = y;

    const nextcursor = cursors[index + 1] || cursors[0];
    x += (nextcursor.x - x) * 0.3;
    y += (nextcursor.y - y) * 0.3;
  });

  requestAnimationFrame(animatecursors);
}

animatecursors();