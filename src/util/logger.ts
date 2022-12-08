export class Logger {
  isLogging = true;

  log(message: any, ...optionalParams: any[]): void {
    if (this.isLogging) {
      console.log(message, ...optionalParams);
    }
  }
}
