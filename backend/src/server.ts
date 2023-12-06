import { Socket } from "net";

type TCPRListener = (data: string) => void;

export default class Server {
  readonly address: string;
  readonly port: number;
  readonly rconPassword: string;
  reconnectTime: number;

  private socket = new Socket();
  private listeners: TCPRListener[] = [];

  static readonly servers: Server[] = [];

  constructor(
    address: string,
    port: number,
    rconPassword: string,
    reconnectTime = 30
  ) {
    this.address = address;
    this.port = port;
    this.rconPassword = rconPassword;
    this.reconnectTime = reconnectTime * 1000;

    this.init();

    Server.servers.push(this);
    console.log(`Added server ${address}:${port}`);
  }

  private init(): void {
    this.connect();

    this.socket.on("end", () => {
      console.log(
        `Connection ended with ${this.address}:${this.port}. Attempting to reconnect.`
      );
      this.scheduleReconnect();
    });

    this.socket.on("timeout", () => {
      console.log(
        `Connection timed out with ${this.address}:${this.port}. Attempting to reconnect.`
      );
      this.scheduleReconnect();
    });

    this.socket.on("error", (err) => {
      console.log(`${err}. Attempting to reconnect.`);
      this.scheduleReconnect();
    });

    this.socket.on("data", (buffer: Buffer) => {
      const data = buffer
        .toString()
        .replace(/^\[\d+:\d+:\d+\]/, "")
        .trim();
      for (const listener of this.listeners) {
        listener(data);
      }
    });
  }

  onTCPR(listener: TCPRListener): void {
    this.listeners.push(listener);
  }

  sendTCPR(data: string): void {
    this.socket.write(`${data}\n`);
  }

  private connect(): void {
    this.socket = new Socket();
    this.socket.connect({ host: this.address, port: this.port }, () => {
      this.socket.write(`${this.rconPassword}\n`);
      console.log(`Connected to ${this.address}:${this.port}`);
    });
  }

  private scheduleReconnect(): void {
    setTimeout(this.init.bind(this), this.reconnectTime);
  }
}
