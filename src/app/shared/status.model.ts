export class StatusModel {
  timestamp: number;
  text: string;
  tags: string[];   // profile uids
  postedBy: string; // profile uid

  constructor() {
    this.timestamp = new Date().getTime();
  }
}
