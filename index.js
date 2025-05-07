// Wait for the DOM to load before running script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Metaverse environment loaded and ready!');
  console.log('Use WASD keys to move and mouse to look around');
  
  // Simple camera movement
  const camera = document.querySelector('[camera]');
  const presentationText = document.querySelector('#presentation-text');
  
  // Basic text following camera
  if (camera && presentationText) {
    // Update text position continuously
    function updateTextPosition() {
      const cameraRig = document.querySelector('#camera-rig');
      if (cameraRig) {
        const cameraPos = cameraRig.getAttribute('position');
        presentationText.setAttribute('position', {
          x: cameraPos.x,
          y: 2.1, 
          z: cameraPos.z - 4
        });
      }
      
      requestAnimationFrame(updateTextPosition);
    }
    
    // Start update loop after 2 seconds to ensure everything is loaded
    setTimeout(function() {
      updateTextPosition();
    }, 2000);
  }
  
  // Add simple firelight flicker effect
  const campfire = document.querySelector('#campfire');
  if (campfire) {
    const fireLight = campfire.querySelector('a-entity[light]');
    if (fireLight) {
      // Simple intensity variation
      setInterval(function() {
        const randomIntensity = 1.2 + (Math.random() * 0.5);
        fireLight.setAttribute('light', 'intensity', randomIntensity);
      }, 200);
    }
  }
  
  // Handle VR mode button
  document.querySelector('a-scene').addEventListener('enter-vr', function() {
    console.log('Entered VR mode');
    // Adjust text position in VR mode
    if (presentationText) {
      presentationText.setAttribute('position', '0 1.6 -2');
    }
  });
  
  document.querySelector('a-scene').addEventListener('exit-vr', function() {
    console.log('Exited VR mode');
    // Reset text position when exiting VR
    if (presentationText) {
      presentationText.setAttribute('position', '0 2.1 -4');
    }
  });
});
