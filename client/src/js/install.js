const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {});

// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener('click', async () => {});

// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {});


window.addEventListener('beforeinstallprompt', (event) => {
    console.log('before-install-prompt')
  
      // Store the triggered events
      window.deferredPrompt = event;
  
      // Remove the hidden class from the button.
      butInstall.classList.toggle('hidden', false);
    });
  
  butInstall.addEventListener('click', async () => {
    console.log('install-button-click')
    
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
     return;
    }
  
    // Show prompt
    promptEvent.prompt();
    
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
  });
  
  window.addEventListener('appinstalled', (event) => {
    console.log('install-event')
  
    // Clear prompt
    window.deferredPrompt = null;
  }); 
  
