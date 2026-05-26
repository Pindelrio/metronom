export type BeatCallback = (beatIndex: number) => void;

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_SEC = 0.1;

export class MetronomeScheduler {
  private bpm: number = 100;
  private beatsPerMeasure: number = 4;
  private pendingBeatsPerMeasure: number | null = null;
  private beatIndex: number = 0;
  private nextBeatTime: number = 0;
  private timerHandle: ReturnType<typeof setInterval> | null = null;
  private onBeat: BeatCallback | null = null;
  private startWallTime: number = 0;
  private startBeatTime: number = 0;

  start(bpm: number, beatsPerMeasure: number, onBeat: BeatCallback): void {
    this.stop();
    this.bpm = bpm;
    this.beatsPerMeasure = beatsPerMeasure;
    this.pendingBeatsPerMeasure = null;
    this.onBeat = onBeat;
    this.beatIndex = 0;

    const now = Date.now() / 1000;
    this.startWallTime = now;
    this.startBeatTime = now;
    this.nextBeatTime = now;

    this.timerHandle = setInterval(() => this.tick(), LOOKAHEAD_MS);
    this.tick();
  }

  stop(): void {
    if (this.timerHandle !== null) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
    this.onBeat = null;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  setBeatsPerMeasure(beats: number): void {
    if (this.timerHandle !== null) {
      this.pendingBeatsPerMeasure = beats;
    } else {
      this.beatsPerMeasure = beats;
      this.beatIndex = 0;
    }
  }

  isRunning(): boolean {
    return this.timerHandle !== null;
  }

  private tick(): void {
    const now = Date.now() / 1000;
    const beatDuration = 60 / this.bpm;

    // If nextBeatTime fell far behind (JS throttled in background), skip
    // missed beats to avoid scheduling a burst on foreground resume.
    if (this.nextBeatTime < now - SCHEDULE_AHEAD_SEC) {
      const missedBeats = Math.floor((now - SCHEDULE_AHEAD_SEC - this.nextBeatTime) / beatDuration) + 1;
      this.beatIndex = (this.beatIndex + missedBeats) % this.beatsPerMeasure;
      this.nextBeatTime += missedBeats * beatDuration;
    }

    while (this.nextBeatTime < now + SCHEDULE_AHEAD_SEC) {
      const delay = Math.max(0, this.nextBeatTime - now);
      const beatIdx = this.beatIndex;
      const cb = this.onBeat;

      if (cb) {
        setTimeout(() => cb(beatIdx), delay * 1000);
      }

      this.beatIndex = (this.beatIndex + 1) % this.beatsPerMeasure;
      this.nextBeatTime += beatDuration;

      if (this.beatIndex === 0 && this.pendingBeatsPerMeasure !== null) {
        this.beatsPerMeasure = this.pendingBeatsPerMeasure;
        this.pendingBeatsPerMeasure = null;
      }
    }
  }
}
