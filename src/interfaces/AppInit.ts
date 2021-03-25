export default interface AppInit {
  PORT: string | undefined;
  controllers: any[];
  middlewares: any[];
}
