function SoundManager() {
  this.audioContext = null;
  this.enabled = true;
  
  try {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    this.enabled = false;
  }
}

SoundManager.prototype.resumeContext = function() {
  if (this.audioContext && this.audioContext.state === 'suspended') {
    this.audioContext.resume();
  }
};

SoundManager.prototype.playMove = function() {
  if (!this.enabled || !this.audioContext) return;
  this.resumeContext();
  
  var osc = this.audioContext.createOscillator();
  var gain = this.audioContext.createGain();
  
  osc.connect(gain);
  gain.connect(this.audioContext.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, this.audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, this.audioContext.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
  
  osc.start(this.audioContext.currentTime);
  osc.stop(this.audioContext.currentTime + 0.08);
};

SoundManager.prototype.playMerge = function(value) {
  if (!this.enabled || !this.audioContext) return;
  this.resumeContext();
  
  var baseFreq = 300 + Math.log2(value) * 80;
  
  var osc1 = this.audioContext.createOscillator();
  var osc2 = this.audioContext.createOscillator();
  var gain = this.audioContext.createGain();
  
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(this.audioContext.destination);
  
  osc1.type = 'sine';
  osc2.type = 'triangle';
  
  osc1.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, this.audioContext.currentTime + 0.15);
  
  osc2.frequency.setValueAtTime(baseFreq * 1.5, this.audioContext.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2, this.audioContext.currentTime + 0.15);
  
  gain.gain.setValueAtTime(0.12, this.audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
  
  osc1.start(this.audioContext.currentTime);
  osc2.start(this.audioContext.currentTime);
  osc1.stop(this.audioContext.currentTime + 0.2);
  osc2.stop(this.audioContext.currentTime + 0.2);
};

SoundManager.prototype.playNewTile = function() {
  if (!this.enabled || !this.audioContext) return;
  this.resumeContext();
  
  var osc = this.audioContext.createOscillator();
  var gain = this.audioContext.createGain();
  
  osc.connect(gain);
  gain.connect(this.audioContext.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
  
  osc.start(this.audioContext.currentTime);
  osc.stop(this.audioContext.currentTime + 0.05);
};

SoundManager.prototype.playWin = function() {
  if (!this.enabled || !this.audioContext) return;
  this.resumeContext();
  
  var notes = [523.25, 659.25, 783.99, 1046.50];
  var self = this;
  
  notes.forEach(function(freq, i) {
    var osc = self.audioContext.createOscillator();
    var gain = self.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(self.audioContext.destination);
    
    osc.type = 'sine';
    var startTime = self.audioContext.currentTime + i * 0.12;
    
    osc.frequency.setValueAtTime(freq, startTime);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
    
    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
};

SoundManager.prototype.playGameOver = function() {
  if (!this.enabled || !this.audioContext) return;
  this.resumeContext();
  
  var notes = [440, 370, 311, 261];
  var self = this;
  
  notes.forEach(function(freq, i) {
    var osc = self.audioContext.createOscillator();
    var gain = self.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(self.audioContext.destination);
    
    osc.type = 'sawtooth';
    var startTime = self.audioContext.currentTime + i * 0.2;
    
    osc.frequency.setValueAtTime(freq, startTime);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
    
    osc.start(startTime);
    osc.stop(startTime + 0.3);
  });
};
