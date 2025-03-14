import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Terminal, Send, Download, Copy, Trash2, Play } from 'lucide-react';

const AppShell = () => {
  const { projectId, appId } = useParams();
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', content: `Connected to ${appId} shell.` },
    { type: 'system', content: 'Type commands and press Enter to execute.' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'command', content: 'ls -la' },
    { type: 'output', content: 'total 24\ndrwxr-xr-x  5 app app 4096 Sep 15 12:34 .\ndrwxr-xr-x  3 app app 4096 Sep 15 12:34 ..\n-rw-r--r--  1 app app  492 Sep 15 12:34 .env\ndrwxr-xr-x  8 app app 4096 Sep 15 12:34 node_modules\n-rw-r--r--  1 app app  731 Sep 15 12:34 package.json\ndrwxr-xr-x  2 app app 4096 Sep 15 12:34 public\ndrwxr-xr-x  3 app app 4096 Sep 15 12:34 src' },
    { type: 'command', content: 'cat package.json' },
    { type: 'output', content: '{\n  "name": "example-app",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "express": "^4.17.1",\n    "react": "^17.0.2",\n    "react-dom": "^17.0.2"\n  },\n  "scripts": {\n    "start": "node server.js",\n    "build": "react-scripts build",\n    "test": "react-scripts test"\n  }\n}' },
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedCommands, setSavedCommands] = useState([
    { name: 'List Files', command: 'ls -la' },
    { name: 'Check Node Version', command: 'node -v' },
    { name: 'Check Process Status', command: 'ps aux' },
    { name: 'View Environment', command: 'printenv' },
  ]);
  
  const terminalRef = useRef(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    // Add command to output
    setOutput([...output, { type: 'command', content: command }]);
    
    // Simulate command execution
    setTimeout(() => {
      let response;
      
      if (command === 'clear') {
        setOutput([{ type: 'system', content: `Connected to ${appId} shell.` }]);
        setCommand('');
        return;
      } else if (command === 'help') {
        response = 'Available commands:\n- ls: List files\n- cat [file]: View file contents\n- cd [dir]: Change directory\n- pwd: Print working directory\n- clear: Clear terminal\n- exit: Close shell session';
      } else if (command.startsWith('ls')) {
        response = 'total 24\ndrwxr-xr-x  5 app app 4096 Sep 15 12:34 .\ndrwxr-xr-x  3 app app 4096 Sep 15 12:34 ..\n-rw-r--r--  1 app app  492 Sep 15 12:34 .env\ndrwxr-xr-x  8 app app 4096 Sep 15 12:34 node_modules\n-rw-r--r--  1 app app  731 Sep 15 12:34 package.json\ndrwxr-xr-x  2 app app 4096 Sep 15 12:34 public\ndrwxr-xr-x  3 app app 4096 Sep 15 12:34 src';
      } else if (command.startsWith('cat')) {
        if (command.includes('package.json')) {
          response = '{\n  "name": "example-app",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "express": "^4.17.1",\n    "react": "^17.0.2",\n    "react-dom": "^17.0.2"\n  },\n  "scripts": {\n    "start": "node server.js",\n    "build": "react-scripts build",\n    "test": "react-scripts test"\n  }\n}';
        } else if (command.includes('.env')) {
          response = 'NODE_ENV=production\nPORT=8080\nDATABASE_URL=postgres://user:pass@host:5432/db\nAPI_KEY=sk_test_51HZ9J2EzKb';
        } else {
          response = `cat: ${command.split(' ')[1]}: No such file or directory`;
        }
      } else if (command === 'pwd') {
        response = '/app';
      } else if (command.startsWith('cd')) {
        response = ''; // cd doesn't produce output
      } else if (command === 'node -v') {
        response = 'v14.17.0';
      } else if (command === 'ps aux') {
        response = 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\napp         1  0.0  0.1  18244  3204 ?        Ss   12:34   0:00 /bin/bash\napp        20  0.0  0.5 1021944 10416 ?      Sl   12:34   0:00 node server.js\napp        35  0.0  0.0   4628   812 ?        R+   12:35   0:00 ps aux';
      } else if (command === 'printenv') {
        response = 'NODE_ENV=production\nPORT=8080\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nHOME=/app\nTERM=xterm\nDATABASE_URL=postgres://user:pass@host:5432/db\nAPI_KEY=sk_test_51HZ9J2EzKb';
      } else {
        response = `sh: ${command}: command not found`;
      }
      
      setOutput(prev => [...prev, { type: 'output', content: response }]);
    }, 300);
    
    // Add to history
    setHistory([command, ...history]);
    setHistoryIndex(-1);
    setCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const saveCommand = () => {
    if (!command.trim()) return;
    const name = prompt('Enter a name for this command:');
    if (name) {
      setSavedCommands([...savedCommands, { name, command }]);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast notification here
  };

  const downloadOutput = () => {
    const text = output.map(line => {
      if (line.type === 'command') {
        return `$ ${line.content}`;
      } else {
        return line.content;
      }
    }).join('\n\n');
    
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${appId}-shell-output.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearTerminal = () => {
    setOutput([{ type: 'system', content: `Connected to ${appId} shell.` }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shell Commands</h1>
        <div className="flex space-x-2">
          <button 
            onClick={downloadOutput}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download Output
          </button>
          <button 
            onClick={clearTerminal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md flex items-center"
          >
            <Trash2 size={16} className="mr-2" />
            Clear Terminal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-gray-900 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <Terminal size={16} className="text-gray-400 mr-2" />
                <span className="text-gray-200 font-medium">{appId} Shell</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div 
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto font-mono text-sm text-gray-300"
            >
              {output.map((line, index) => (
                <div key={index} className="mb-2">
                  {line.type === 'command' && (
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">$</span>
                      <span>{line.content}</span>
                    </div>
                  )}
                  {line.type === 'output' && (
                    <div className="pl-4 whitespace-pre-wrap">{line.content}</div>
                  )}
                  {line.type === 'system' && (
                    <div className="text-gray-500 italic">{line.content}</div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommandSubmit} className="bg-gray-800 p-2 flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-gray-200 focus:outline-none font-mono"
                placeholder="Type command..."
                autoFocus
              />
              <button 
                type="button"
                onClick={saveCommand}
                className="p-2 text-gray-400 hover:text-gray-200"
                title="Save command"
              >
                <Copy size={16} />
              </button>
              <button 
                type="submit"
                className="p-2 text-gray-400 hover:text-gray-200"
                title="Run command"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Saved Commands</h2>
          <div className="space-y-3">
            {savedCommands.map((cmd, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-sm">{cmd.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{cmd.command}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCommand(cmd.command)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Use command"
                  >
                    <Play size={14} />
                  </button>
                  <button 
                    onClick={() => copyToClipboard(cmd.command)}
                    className="p-1 text-gray-600 hover:text-gray-800"
                    title="Copy command"
                  >
                    <Copy size={14} />
                  </button>
                  <button 
                    onClick={() => setSavedCommands(savedCommands.filter((_, i) => i !== index))}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete command"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            {savedCommands.length === 0 && (
              <p className="text-sm text-gray-500 italic">No saved commands yet. Save frequently used commands for quick access.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Common Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">View Logs</p>
            <p className="text-sm font-mono text-gray-600 mt-1">tail -f logs/app.log</p>
            <button 
              onClick={() => setCommand('tail -f logs/app.log')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">Check Disk Space</p>
            <p className="text-sm font-mono text-gray-600 mt-1">df -h</p>
            <button 
              onClick={() => setCommand('df -h')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">List Running Processes</p>
            <p className="text-sm font-mono text-gray-600 mt-1">ps aux</p>
            <button 
              onClick={() => setCommand('ps aux')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">Check Memory Usage</p>
            <p className="text-sm font-mono text-gray-600 mt-1">free -m</p>
            <button 
              onClick={() => setCommand('free -m')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">View Environment Variables</p>
            <p className="text-sm font-mono text-gray-600 mt-1">printenv</p>
            <button 
              onClick={() => setCommand('printenv')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="font-medium">Restart Application</p>
            <p className="text-sm font-mono text-gray-600 mt-1">npm restart</p>
            <button 
              onClick={() => setCommand('npm restart')}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Use Command
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
