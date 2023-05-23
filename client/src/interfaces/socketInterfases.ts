export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  login: (data: any) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  somevent: () => void;
}
