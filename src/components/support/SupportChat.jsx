import React, { useState } from 'react';

const SupportChat = () => {
  const [chatLoaded, setChatLoaded] = useState(false);
  
  const loadChatScripts = () => {
    if (chatLoaded) return;
    
    // First, load jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'http://chat.dev.inretia.com/js/min/jquery.min.js';
    jqueryScript.async = true;
    
    // Then load the main script
    jqueryScript.onload = () => {
      const mainScript = document.createElement('script');
      mainScript.id = 'sbinit';
      mainScript.src = 'http://chat.dev.inretia.com/js/main.js';
      mainScript.async = true;
      document.body.appendChild(mainScript);
      setChatLoaded(true);
    };
    
    document.body.appendChild(jqueryScript);
  };
  
  // Load chat scripts when component is mounted
  React.useEffect(() => {
    loadChatScripts();
    
    // Cleanup function
    return () => {
      // Remove the scripts when component unmounts
      const jqueryScript = document.querySelector('script[src="http://chat.dev.inretia.com/js/min/jquery.min.js"]');
      const mainScript = document.getElementById('sbinit');
      
      if (jqueryScript) jqueryScript.remove();
      if (mainScript) mainScript.remove();
      
      // Remove any chat widgets or elements added by the script
      const chatElements = document.querySelectorAll('[id^="sb-"]');
      chatElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600 mb-4">
          {chatLoaded 
            ? "Our support team is ready to assist you. Please type your question below."
            : "Our support chat is loading. If it doesn't appear automatically, please refresh the page."}
        </p>
        <div id="support-chat-placeholder" className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
          {!chatLoaded && <p className="text-gray-500">Chat widget will appear here</p>}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
