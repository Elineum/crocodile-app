export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  alreadyExist: (data: any) => void;
}

export interface ClientToServerEvents {
  sendMessage: (data: any) => void;
  signUp: (data: any) => void;
  signIn: (data: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
