import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Terminal, Copy, Download, X } from 'lucide-react';

const ProjectShell = () => {
  const { projectId } = useParams();
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: `Connected to ${projectId} server.` },
    { type: 'system', content: 'Type your commands below. Type "help" for available commands.' },
  ]);
  const terminalRef = useRef(null);
  
  // Mock command execution
  const executeCommand = (cmd) => {
    setHistory([...history, { type: 'command', content: `$ ${cmd}` }]);
    
    // Simple mock responses
    let response;
    if (cmd === 'ls') {
      response = 'app.js  node_modules  package.json  public  README.md  src';
    } else if (cmd === 'pwd') {
      response = `/home/user/${projectId}`;
    } else if (cmd === 'ps') {
      response = 'PID   USER     TIME  COMMAND\n1     root     0:00  node app.js\n20    root     0:00  nginx\n35    root     0:00  postgres';
    } else if (cmd === 'help') {
      response = 'Available commands: ls, pwd, ps, clear, help';
    } else if (cmd === 'clear') {
      setHistory([
        { type: 'system', content: `Connected to ${projectId} server.` },
        { type: 'system', content: 'Type your commands below. Type "help" for available commands.' },
      ]);
      setCommand('');
      return;
    } else {
      response = `Command not found: ${cmd}`;
    }
    
    setHistory(prev => [...prev, { type: 'response', content: response }]);
    setCommand('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command.trim());
    }
  };
  
  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  const copyTerminalContent = () => {
    const content = history
      .map(item => item.content)
      .join('\n');
    navigator.clipboard.writeText(content);
    // You would typically show a notification here
  };
  
  const downloadTerminalContent = () => {
    const content = history
      .map(item => item.content)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectId}-terminal-log.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const clearTerminal = () => {
    setHistory([
      { type: 'system', content: `Connected to ${projectId} server.` },
      { type: 'system', content: 'Type your commands below. Type "help" for available commands.' },
    ]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shell: {projectId}</h1>
        <div className="flex space-x-2">
          <button 
            onClick={copyTerminalContent}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            title="Copy terminal content"
          >
            <Copy size={18} />
          </button>
          <button 
            onClick={downloadTerminalContent}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            title="Download terminal log"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={clearTerminal}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            title="Clear terminal"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="bg-black rounded-lg shadow overflow-hidden">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Terminal className="text-gray-400 mr-2" size={18} />
            <span className="text-gray-200 font-medium">Terminal</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm text-gray-300 bg-gray-900"
        >
          {history.map((item, index) => (
            <div 
              key={index} 
              className={`mb-1 ${
                item.type === 'system' 
                  ? 'text-blue-400' 
                  : item.type === 'command' 
                    ? 'text-green-400' 
                    : 'text-gray-300'
              }`}
            >
              {item.content}
            </div>
          ))}
          
          <form onSubmit={handleSubmit} className="mt-2 flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-300"
              autoFocus
            />
          </form>
        </div>
      </div>
      
      {/* Common Commands */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Common Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">File Operations</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                ls          # List files
                cd [dir]    # Change directory
                pwd         # Print working directory
                cat [file]  # Display file contents
                mkdir [dir] # Create directory
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">System Information</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                ps          # List processes
                top         # Process activity
                df -h       # Disk usage
                free -m     # Memory usage
                uptime      # System uptime
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Docker Commands</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                docker ps             # List containers
                docker images         # List images
                docker logs [container] # View logs
                docker exec -it [container] bash # Shell
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Network Commands</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                ping [host]  # Test connectivity
                netstat -tuln # Open ports
                curl [url]   # HTTP request
                wget [url]   # Download file
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShell;
