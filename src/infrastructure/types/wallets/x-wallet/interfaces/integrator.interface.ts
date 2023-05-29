export interface Integrator {
  isKadena: boolean;
  request: <Req, Res>(request: Req) => Promise<Res>;
  on: (event: string, callback: (data: any) => void) => void;
}
