
export default class Logger {

  private static instance: Logger;
  private context: string = "GLOBAL";

  private constructor() {}
  private format(level: LogLevel, message: string): string {
    const date = new Date().toUTCString();
    return `[${date}] [${this.context}] [${level.toUpperCase()}] -> ${message}`;
  }

  static generate(context: string) {
    return Logger.getInstance().withContext(context);
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  withContext(context: string) {
    const child = Object.create(this);
    child.context = context;
    return child;
  }

  debug(msg: string) { console.debug(this.format("debug", msg)); }
  info(msg: string)  { console.info(this.format("info", msg)); }
  warn(msg: string)  { console.warn(this.format("warn", msg)); }
  error(msg: string) { console.error(this.format("error", msg)); }

}
