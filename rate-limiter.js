class RateLimiter {
    constructor(limit, interval) {
      this.limit = limit;
      this.interval = interval;
      this.timestamps = [];
    }
  
    allowRequest() {
      const now = Date.now();
  
      // Clean old requests
      this.timestamps = this.timestamps.filter(ts => now - ts < this.interval);
  
      if (this.timestamps.length < this.limit) {
        this.timestamps.push(now);
        return true;
      }
      return false;
    }
  
    updateRate(limit, interval) {
      this.limit = limit;
      this.interval = interval;
    }
  }
  
  let limiter = new RateLimiter(3, 5000);
  
  function updateLimiter() {
    const limit = parseInt(document.getElementById('limit').value, 10);
    const interval = parseInt(document.getElementById('interval').value, 10);
    limiter.updateRate(limit, interval);
    logMessage(`Rate updated: ${limit} reqs / ${interval}ms`, 'allowed');
  }
  
  function sendRequest() {
    const allowed = limiter.allowRequest();
    const now = new Date().toLocaleTimeString();
    logMessage(`${now} → ${allowed ? 'Allowed ✅' : 'Blocked ❌'}`, allowed ? 'allowed' : 'blocked');
  }
  
  function logMessage(msg, className) {
    const log = document.getElementById('log');
    const line = document.createElement('div');
    line.className = className;
    line.textContent = msg;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }
  