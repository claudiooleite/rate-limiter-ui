class RateLimiter {
    constructor(limit, interval) {
      this.limit = limit; // max requests
      this.interval = interval; // in ms
      this.timestamps = [];
    }

    allowRequest() {
      const now = Date.now();
      this.timestamps = this.timestamps.filter(ts => now - ts < this.interval); // Clean old requests
      if (this.timestamps.length < this.limit) { // If under the limit, allow
        this.timestamps.push(now);
        return true;
        }
      return false; // If over the limit, block
    }

    updateRate(limit, interval) { // Update the rate limit and interval
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
      // Add a timestamp to the message
    line.className = className;
    line.textContent = msg;
    log.appendChild(line);
        // Scroll to the bottom of the log
    log.scrollTop = log.scrollHeight;
}